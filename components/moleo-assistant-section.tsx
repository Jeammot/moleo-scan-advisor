import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MOLEO_PRODUCTS, ProductRecommendation } from '@/app/data/products';
import { SYSTEM_PROMPT } from '@/app/lib/systemprompt';

// Types
type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  product?: ProductRecommendation | null;
  emotion?: 'stress' | 'fatigue' | 'focus' | 'general';
}

interface ChatConfig {
  assistantName: string;
  colors: {
    background: string;
    bubbleUser: string;
    bubbleAssistant: string;
    text: string;
    cta: string;
    border: string;
  };
  errorMessage: string;
  reassuranceMessages: string[];
  suggestedQuestions: string[];
}

// Constants
const DEFAULT_CONFIG: ChatConfig = {
  assistantName: 'Moleone',
  colors: {
    background: '#000000',
    bubbleUser: '#1C1C1E',
    bubbleAssistant: '#0F1115',
    text: '#E6E6E6',
    cta: 'from-green-400 to-blue-500',
    border: 'rgba(255,255,255,0.08)'
  },
  errorMessage: "I'm having trouble connecting to our wellness assistant right now. Please try again later or email your question to moleo.one@gmail.com.",
  reassuranceMessages: [
    "Formulated by experts in wellness",
    "100% plant-based and cruelty-free",
    "Trusted by thousands of clients worldwide",
    "Clinically-backed ingredients",
    "Made in small batches for quality"
  ],
  suggestedQuestions: [
    "I feel tired no matter how much I sleep",
    "What helps with gas and bloating after eating?",
    "I feel anxious for no reason",
    "Should I be worried about my cholesterol?",
    "I struggle with focus"
  ]
};

const INITIAL_MESSAGE: Message = {
  id: 'welcome-message',
  content: `Hello, I'm ${DEFAULT_CONFIG.assistantName}, your premium ONS advisor. Feel free to ask me anything about supplements.`,
  role: 'assistant',
  timestamp: new Date(),
  product: null,
  emotion: 'general'
};

const getSuggestedQuestions = (lastMessage?: string): string[] => {
  if (!lastMessage) return DEFAULT_CONFIG.suggestedQuestions;

  const lowerMsg = lastMessage.toLowerCase();
  
  if (lowerMsg.includes('stress') || lowerMsg.includes('anxious')) {
    return [
      "What triggers your stress most often?",
      "Do you have trouble sleeping due to stress?",
      "How does stress affect your daily life?",
      "Have you tried other stress solutions?"
    ];
  } else if (lowerMsg.includes('tired') || lowerMsg.includes('fatigue')) {
    return [
      "What time of day are you most tired?",
      "Do you wake up feeling refreshed?",
      "How many hours do you sleep per night?",
      "Does caffeine help your energy levels?"
    ];
  } else if (lowerMsg.includes('focus') || lowerMsg.includes('concentrate')) {
    return [
      "Do you work long hours on screens?",
      "When do you notice focus issues most?",
      "Have you tried any focus supplements?",
      "Does your diet affect your mental clarity?"
    ];
  }

  return DEFAULT_CONFIG.suggestedQuestions;
};

const getEmotionalResponse = (message: string): Message['emotion'] => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('stress') || lowerMsg.includes('anxious')) return 'stress';
  if (lowerMsg.includes('tired') || lowerMsg.includes('fatigue')) return 'fatigue';
  if (lowerMsg.includes('focus') || lowerMsg.includes('concentrate')) return 'focus';
  return 'general';
};

const PRODUCT_CTA: { [key: string]: string } = {
  'ENERGY': 'Boost my energy',
  'FOCUS': 'Sharpen my mind',
  'SLEEP': 'Improve my sleep rhythm',
  'CALM': 'Ease my stress',
  'DIGEST': 'Feel lighter, digest better',
  'INTIMA': 'Protect my intimate balance',
  'CYCLE': 'Support my cycle',
  'SKIN': 'Reveal my glow',
  'HAIR': 'Strengthen my hair',
  'BONES': 'Reinforce my structure',
  'HEART': 'Care for my heart',
  'VISION': 'Protect my vision',
  'IRON': 'Restore my vitality',
  'VITAMIN D': 'Get my sunshine dose',
  'VITAMIN B12': 'Recharge my system',
  'MAGNESIUM': 'Relax my body',
  'IODINE': 'Balance my metabolism',
  'LIBIDO': 'Ignite my desire'
};

const getProductCTAText = (productName?: string): string => {
  return PRODUCT_CTA[productName?.toUpperCase() || ''] || 'View product';
};

const getProductTagline = (productName: string): string => {
  const product = MOLEO_PRODUCTS.find(p => p.name === productName);
  return product?.tagline || 'Premium wellness solution';
};

// Components
const LoadingDots = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex space-x-2"
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-gray-500"
        animate={{ y: [0, -5, 0] }}
        transition={{ 
          repeat: Infinity,
          duration: 0.8,
          delay: i * 0.2
        }}
      />
    ))}
  </motion.div>
);

const MessageBubble = ({ 
  message
}: { 
  message: Message; 
}) => {
  let emotionalStyle = '';
  if (message.role === 'assistant') {
    switch(message.emotion) {
      case 'stress':
        emotionalStyle = 'border-l-4 border-blue-400/50 pl-3';
        break;
      case 'fatigue':
        emotionalStyle = 'border-l-4 border-amber-400/50 pl-3';
        break;
      case 'focus':
        emotionalStyle = 'border-l-4 border-emerald-400/50 pl-3';
        break;
      default:
        emotionalStyle = 'border-l-4 border-gray-500/50 pl-3';
    }
  }

  const isWelcomeMessage = message.id === 'welcome-message';

  return (
    <motion.div
      initial={{ opacity: 0, y: message.role === 'user' ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-xl p-4 ${
          message.role === 'user' 
            ? 'text-white' 
            : 'text-white'
        } ${emotionalStyle} ${isWelcomeMessage ? 'text-xl sm:text-2xl font-semibold' : ''}`}
        style={{
          backgroundColor: message.role === 'user' 
            ? DEFAULT_CONFIG.colors.bubbleUser 
            : DEFAULT_CONFIG.colors.bubbleAssistant,
          color: DEFAULT_CONFIG.colors.text
        }}
      >
        <div className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
      </div>
    </motion.div>
  );
};
const ProductCard = ({ 
  product,
  emotion,
  onCTAClick
}: { 
  product: ProductRecommendation;
  emotion?: string;
  onCTAClick?: () => void;
}) => {
  const [imageError, setImageError] = useState(false);
const productUrl = product.productUrl && !product.productUrl.match(/\.(png|jpg|jpeg|webp)$/i)
  ? product.productUrl.startsWith('http') 
    ? product.productUrl 
    : `https://${product.productUrl}`
  : `https://moleo.io/products/${product.id.replace('prod_', '').toLowerCase()}`;
  
  const [showFollowUp, setShowFollowUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFollowUp(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    if (onCTAClick) onCTAClick();
    setShowFollowUp(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl p-6 max-w-[80%] ml-[20%] mt-2 shadow-lg border"
      style={{
        backgroundColor: DEFAULT_CONFIG.colors.bubbleAssistant,
        borderColor: DEFAULT_CONFIG.colors.border
      }}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 relative"
          style={{
            background: `linear-gradient(to bottom right, ${DEFAULT_CONFIG.colors.bubbleUser}, ${DEFAULT_CONFIG.colors.bubbleAssistant})`
          }}
        >
          {product.imageUrl && !imageError ? (
  <div className="relative w-full h-full">
    <Image
  src={product.imageUrl}
  alt={product.name}
  fill
  className="object-cover"
  onError={() => setImageError(true)}
  sizes="(max-width: 768px) 100vw, 128px"
/>
  </div>
) : (
  <div className="w-full h-full flex items-center justify-center">
    <span className="text-xs text-gray-400">Product image</span>
  </div>
)}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-white text-xl mb-1">{product.name}</h3>
          <p className="text-blue-400 text-sm font-light mb-3">
            {getProductTagline(product.name)}
          </p>
          <p className="text-sm text-gray-300 mb-4">
            <span className="font-medium text-white">Key benefit: </span>
            {product.description}
          </p>
          
          {product.scientificNote && (
            <div className="rounded-lg p-3 mb-4"
              style={{
                backgroundColor: DEFAULT_CONFIG.colors.bubbleUser
              }}
            >
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-1">Why this works</h4>
              <p className="text-xs text-gray-300">{product.scientificNote}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-white text-lg">{product.price}</span>
            <div className="flex flex-col items-end">
              <a
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r ${DEFAULT_CONFIG.colors.cta} hover:opacity-90 text-white px-5 py-2.5 rounded-lg text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-md`}
                aria-label={`Get ${product.name}`}
                onClick={handleCTAClick}
              >
                {getProductCTAText(product.name)}
              </a>
              <p className="text-xs text-gray-500 mt-2 text-right">
                {DEFAULT_CONFIG.reassuranceMessages[
                  Math.floor(Math.random() * DEFAULT_CONFIG.reassuranceMessages.length)
                ]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showFollowUp && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t"
          style={{
            borderTopColor: DEFAULT_CONFIG.colors.border
          }}
        >
          <p className="text-sm text-gray-400">
            {"Let me know if you'd like more details about "}{product.name}{" — it's a favorite among our clients."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const SuggestedQuestions = ({ 
  lastMessage,
  onQuestionSelect 
}: { 
  lastMessage?: string;
  onQuestionSelect: (question: string) => void;
}) => {
  const questions = getSuggestedQuestions(lastMessage);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.5 }} 
      className="pt-4"
    >
      <h3 className="text-sm text-gray-400 mb-3">You might want to ask:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {questions.map((question, i) => (
          <motion.button
            key={`suggested-${question}-${i}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onQuestionSelect(question)}
            className="text-left p-3 rounded-lg border text-sm transition-all duration-200"
            style={{
              backgroundColor: DEFAULT_CONFIG.colors.bubbleUser,
              borderColor: DEFAULT_CONFIG.colors.border,
              color: DEFAULT_CONFIG.colors.text
            }}
            aria-label={`Select suggested question: ${question}`}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default function MoleoAssistantSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [lastCTAClick, setLastCTAClick] = useState<number>(0);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
    }
  }, [messages.length]);

  // Enhanced auto-scroll with mobile consideration
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    };

    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Mobile keyboard handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && inputRef.current === document.activeElement) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
          });
        }, 300);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleQuestionSelect = useCallback((question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  }, []);

  const handleCTAClick = useCallback(() => {
    setLastCTAClick(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
      product: null,
      emotion: getEmotionalResponse(inputValue)
    };

    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .slice(-3)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/moleo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          systemPrompt: SYSTEM_PROMPT,
          history: conversationHistory
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      
      const assistantMessage: Message = {
  id: messages.length === 0 ? 'welcome-message' : Date.now().toString(),
        content: data.text || "Thank you for sharing. Here's what I recommend:",
        role: 'assistant',
        timestamp: new Date(),
        product: data.product || null,
        emotion: getEmotionalResponse(inputValue)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: DEFAULT_CONFIG.errorMessage,
        role: 'assistant',
        timestamp: new Date(),
        product: null
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const lastUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0]?.content;

  return (
    <section 
      className="py-12 px-4 sm:px-8 max-w-4xl mx-auto rounded-xl shadow-2xl border"
      style={{
        backgroundColor: DEFAULT_CONFIG.colors.background,
        borderColor: DEFAULT_CONFIG.colors.border
      }}
      aria-label="Premium Wellness Advisor Chat"
    >
      <div className="space-y-6">
        <header className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-light mb-2 text-white"
          >
            Moleo Wellness Advisor
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            Personalized premium supplement recommendations
          </motion.p>
        </header>

        <div 
          ref={chatContainerRef}
          className="rounded-xl p-6 h-[500px] overflow-y-auto border"
          style={{
            backgroundColor: DEFAULT_CONFIG.colors.bubbleAssistant,
            borderColor: DEFAULT_CONFIG.colors.border
          }}
        >
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <MessageBubble message={message} />
                  {message.product && (
                    <ProductCard 
                      product={message.product} 
                      emotion={message.emotion}
                      onCTAClick={handleCTAClick}
                    />
                  )}
                </div>
              ))}

              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex justify-start"
                >
                  <div 
                    className="rounded-xl p-4 max-w-[80%] border"
                    style={{
                      backgroundColor: DEFAULT_CONFIG.colors.bubbleAssistant,
                      borderColor: DEFAULT_CONFIG.colors.border
                    }}
                  >
                    <LoadingDots />
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && (
                <SuggestedQuestions 
                  lastMessage={lastUserMessage}
                  onQuestionSelect={handleQuestionSelect} 
                />
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex">
          <motion.input
            ref={inputRef}
            whileFocus={{ borderColor: "#3b82f6" }}
            id="chat-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your health goals or challenges..."
            className="flex-1 text-white rounded-l-xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 border-r-0"
            style={{
              backgroundColor: DEFAULT_CONFIG.colors.bubbleUser,
              borderColor: DEFAULT_CONFIG.colors.border
            }}
            aria-label="Ask about premium wellness solutions"
            disabled={isLoading}
            autoFocus
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`bg-gradient-to-r ${DEFAULT_CONFIG.colors.cta} hover:opacity-90 text-white py-3.5 px-6 rounded-r-xl transition-all duration-300 disabled:opacity-50 shadow-md border-l-0`}
            style={{
              borderColor: DEFAULT_CONFIG.colors.border
            }}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>
            ) : (
              'Send'
            )}
          </motion.button>
        </form>

        <footer className="mt-6 text-center text-gray-500 text-xs">
          <p>Powered by Moleo</p>
        </footer>
      </div>
    </section>
  );
}
