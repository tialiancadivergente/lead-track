import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Analytics } from "@vercel/analytics/react"
import GoogleTagManager from "@/app/components/GoogleTagManager"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "O Resgate dos Otimistas - Diagnóstico de Dependência Emocional",
    description:
      "Faça seu diagnóstico de dependência emocional gratuito e descubra como aumentar seu nível de permissão.",
  }

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
        {/* <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-icon.svg" type="image/svg+xml" />
        </head> */}
      <body className={inter.className}>
        <GoogleTagManager />
        {children}
        <Analytics />
      </body>
    </html>
  )
} 