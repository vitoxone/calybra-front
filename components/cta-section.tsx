import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 border-0 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />

          <div className="relative p-8 md:p-12 lg:p-16 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-primary-foreground rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Comienza hoy mismo</span>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance">
                ¿Listo para revolucionar tus cotizaciones?
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 text-balance">
                Únete a miles de profesionales que ya están ahorrando tiempo y generando cotizaciones precisas con
                Calybra
              </p>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all group"
              >
                Comenzar gratis
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-primary-foreground hover:bg-white/10 bg-transparent backdrop-blur-sm"
              >
                Agendar demo
              </Button>
            </div> */}

            <p className="text-sm text-primary-foreground/70">
              Sin tarjeta de crédito requerida • Cancela cuando quieras • Soporte en español
            </p>
          </div>
        </Card>
      </div>
      {/* </CHANGE> */}
    </section>
  )
}
