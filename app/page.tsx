'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

export default function MoleoPage() {
  const [mounted, setMounted] = useState(false);
  const [isHealthCheck] = useState(() => {
    return typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('healthcheck=1');
  });

  useEffect(() => {
  if (isHealthCheck) return;

  setMounted(true);

  // 🔁 Envoi immédiat du message "moleo-ready"
  try {
    window.parent.postMessage({
      type: 'moleo-ready',
      status: 'complete'
    }, '*');
  } catch (error) {
    console.error('Error sending ready message immediately:', error);
  }

  // ✅ Écoute des messages entrants
  const handleMessage = (event: MessageEvent) => {
    try {
      if (typeof event.data === 'object' && event.data) {
        switch (event.data.type) {
          case 'moleo-resize':
            // à implémenter si nécessaire
            break;
          case 'moleo-close':
            // à implémenter si nécessaire
            break;
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  };

  // ✅ Fallback classique au chargement (backup)
  const handleLoadComplete = () => {
    try {
      window.parent.postMessage({
        type: 'moleo-ready',
        status: 'complete'
      }, '*');
    } catch (error) {
      console.error('Error sending ready message on load:', error);
    }
  };

  window.addEventListener('message', handleMessage);
  window.addEventListener('load', handleLoadComplete);

  return () => {
    window.removeEventListener('message', handleMessage);
    window.removeEventListener('load', handleLoadComplete);
  };
}, [isHealthCheck]);

  if (isHealthCheck) {
    return (
      <div style={{
        color: 'white',
        background: 'black',
        padding: '2rem',
        textAlign: 'center',
        fontSize: '1.2rem'
      }}>
        Moleo is healthy ✅
      </div>
    );
  }

  const AnimatedLoader = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="relative size-40 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 size-16 -mt-8 -ml-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 size-8 -mt-4 -ml-4 rounded-full bg-white/80 animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 size-8 -mb-4 -mr-4 rounded-full bg-white/60 animate-bounce delay-100"></div>
      </div>
      <h2 className="text-2xl font-light text-center mb-2 text-white/90">Preparing Your Supplement Assistant</h2>
      <p className="text-white/60 text-center max-w-md px-4">
        Loading personalized recommendation engine...
      </p>
      <div className="mt-8 w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 animate-progress"></div>
      </div>
    </div>
  );

  const AssistantFallback = () => (
    <div className="text-white p-8 text-center">Assistant is currently unavailable</div>
  );

  const MoleoAssistantSection = dynamic(
    () => import('@/components/moleo-assistant-section')
      .then(mod => mod.default || mod)
      .catch(() => AssistantFallback),
    {
      loading: () => <AnimatedLoader />,
      ssr: false,
    }
  );

  return (
    <main className="min-h-screen bg-black isolate">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -left-1/3 w-full aspect-square bg-gradient-to-br from-green-500/5 to-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-2/3 aspect-square bg-gradient-to-br from-blue-600/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative z-10">
          {mounted && <MoleoAssistantSection />}
        </div>
      </div>
    </main>
  );
}