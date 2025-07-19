import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Moleo AI Assistant',
  description: 'Get personalized supplement recommendations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
