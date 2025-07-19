import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { z } from 'zod';
import SYSTEM_PROMPT from '@/app/lib/systemprompt';
import { MOLEO_PRODUCTS, type ProductRecommendation } from '@/app/data/products';

const RequestSchema = z.object({
  message: z.string().min(1).max(1000),
  systemPrompt: z.string().min(10).optional().default(SYSTEM_PROMPT),
  history: z.array(z.object({ role: z.string(), content: z.string() })).optional()
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 20000,
  maxRetries: 3,
});

// Nouvelle fonction helper pour extraire le JSON de manière robuste
function extractProductJSON(content: string): string | null {
  // 1. Cherche le dernier bloc potentiellement JSON
  const jsonBlocks = content.match(/{[\s\S]*?}/g) || [];
  if (jsonBlocks.length === 0) return null;

  // 2. Teste chaque bloc du plus récent au plus ancien
  for (let i = jsonBlocks.length - 1; i >= 0; i--) {
    const block = jsonBlocks[i].trim();
    try {
      // Vérifie si c'est un produit valide avant même de parser
      if (block.includes('"id"') && block.includes('"name"') && block.includes('"description"')) {
        const parsed = JSON.parse(block);
        if (parsed?.id && MOLEO_PRODUCTS.some(p => p.id === parsed.id)) {
          return block;
        }
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });

    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { message, systemPrompt: userPrompt, history } = validation.data;
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: userPrompt.length > 50 ? userPrompt : SYSTEM_PROMPT },
      ...(history?.map(h => ({ role: h.role as 'user' | 'assistant' | 'system', content: h.content })) ?? []),
      { role: 'user', content: message },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 600,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    const content = response.choices[0]?.message?.content || '';
    console.log("🧠 GPT RAW RESPONSE:\n", content);

    // Nouvelle logique d'extraction robuste
    let text = content;
    let product: ProductRecommendation | null = null;

    const jsonString = extractProductJSON(content);
    if (jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        const match = MOLEO_PRODUCTS.find(p => p.id === parsed.id);
        if (match) {
          product = { 
            ...match,
            // Surcharge avec les données du JSON si elles existent
            description: parsed.description || match.description,
            price: match.price,
            scientificNote: parsed.scientificNote || match.scientificNote
          };
          // Nettoie le texte pour retirer le JSON
          text = content.replace(jsonString, '').trim();
        }
      } catch (err) {
        console.warn('❌ JSON parsing failed:', err);
      }
    }

    return NextResponse.json({
      text: text.trim(),
      product,
      usage: response.usage,
      model: response.model,
    });
  } catch (error) {
    console.error('❌ API ERROR:', error);
    return NextResponse.json(
      {
        text: "Our wellness assistant is currently unavailable. For immediate help, please email moleo.one@gmail.com.",
        product: null,
        error: error instanceof Error ? error.message : 'Internal Server Error',
        code: (error as any)?.code || 'UNKNOWN_ERROR'
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        }
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
