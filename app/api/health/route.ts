// app/api/health/route.ts
import { NextResponse } from 'next/server';

// Configuration CORS optimisée pour Shopify
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://moleo.io',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Shopify-Origin, X-Requested-With, Cache-Control',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
  'Vary': 'Origin, Accept-Encoding'
};

// Handler OPTIONS (préflight) - Strictement nécessaire pour Shopify
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

// Handler GET - Healthcheck simple et efficace
export async function GET() {
  try {
    return new NextResponse(
      JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      }),
      {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 'error', message: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Configuration Edge Runtime obligatoire
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
