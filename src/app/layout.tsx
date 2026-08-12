import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-приложение для роста контент-креатора',
  description: 'Персональная система рекомендаций для роста подписчиков и охватов',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
