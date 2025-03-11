import { Inter } from 'next/font/google'
import './globals.css'
import AssetPreloader from './components/AssetPreloader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meu App',
  description: 'Descrição do meu app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-icon.svg" type="image/svg+xml" />
        </head>
      <body className={inter.className}>
        <AssetPreloader>
          {children}
        </AssetPreloader>
      </body>
    </html>
  )
} 