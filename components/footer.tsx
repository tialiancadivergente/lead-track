import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background/95 border-t border-gray-800 py-6 relative z-10 torn-paper-top">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/terms" className="text-foreground/70 text-sm hover:text-primary transition-colors">
              TERMOS DE USO
            </Link>
            <span className="text-foreground/50">|</span>
            <Link href="/privacy" className="text-foreground/70 text-sm hover:text-primary transition-colors">
              POLÍTICA DE PRIVACIDADE
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-foreground/70 text-xs">COPYRIGHT © O RESGATE DOS OTIMISTAS.</span>
            <Link href="/" className="text-primary">
              <span className="text-sm">ALIANÇA DIVERGENTE</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

