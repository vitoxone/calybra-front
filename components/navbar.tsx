"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Navbar({ onLogin }: { onLogin?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        {/* <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          <span className="font-bold text-xl text-foreground">Calybra</span>
        </Link> */}
        <div className="flex items-center gap-3">
            <Image src="/images/calybra-logo.png" alt="Calybra Logo" width={240} height={80} className="h-10 w-auto" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#como-funciona"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Cómo funciona
          </Link>
          <Link href="#precios" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Precios
          </Link>
          <button
            type="button"
            onClick={() => onLogin?.()}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Ingresar
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-2 bg-transparent"
            onClick={() => onLogin?.()}
          >
            Ingresar
          </Button>
          {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
            Probar demo
          </Button> */}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="#como-funciona"
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cómo funciona
            </Link>
            <Link
              href="#precios"
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <button
              type="button"
              className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                setMobileMenuOpen(false)
                onLogin?.()
              }}
            >
              Ingresar
            </button>
          </div>
        </div>
      )}
      {/* </CHANGE> */}
    </nav>
  )
}
