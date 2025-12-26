"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, CheckCircle2, TrendingUp, FileText } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Enhanced text content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Solución profesional en diseño y obra</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Cotiza partidas de construcción con{" "}
                <span className="text-primary relative">
                  precisión técnica
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-accent"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 7C50 3 150 3 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Genera especificaciones técnicas, listados de materiales y análisis de precios según normativas
                chilenas, comparando entre las principales tiendas del país.
              </p>
            </div>

            {/* Key benefits with icons */}
            <div className="space-y-3 max-w-xl mx-auto lg:mx-0">
              {[
                { icon: CheckCircle2, text: "Análisis técnico automático con IA" },
                { icon: FileText, text: "Materiales y rendimientos por partida" },
                { icon: TrendingUp, text: "Precios referenciales actualizados" },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Comenzar gratis
              </Button>
              <Button size="lg" variant="outline" className="border-2 bg-transparent">
                Ver demo
              </Button>
            </div> */}

            {/* Trust indicators */}
            <div className="pt-6 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>

          {/* Right side - Enhanced feature cards showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Feature Card 1 */}
              <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Fichas Técnicas Completas</h3>
                    <p className="text-sm text-muted-foreground">
                      Especificaciones detalladas con cumplimiento de normativas MINVU, OGUC y NCh
                    </p>
                  </div>
                </div>
              </Card>

              {/* Feature Card 2 */}
              <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold">Materiales</h3>
                  <p className="text-xs text-muted-foreground">Listado completo con cantidades precisas</p>
                </div>
              </Card>

              {/* Feature Card 3 */}
              <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold">Comparador</h3>
                  <p className="text-xs text-muted-foreground">Precios de múltiples tiendas</p>
                </div>
              </Card>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg rotate-12 hidden lg:block">
              IA Powered
            </div>
          </div>
        </div>
      </div>
      {/* </CHANGE> */}
    </section>
  )
}
