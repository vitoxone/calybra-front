import { Card } from "@/components/ui/card"
import { Compass, Settings, ShoppingCart } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: Compass,
      title: "Explora soluciones",
      description:
        "Navega por categorías de tabiquería, lozas, pavimentos, electricidad y sanitarias. Encuentra la solución perfecta para tu proyecto.",
      color: "primary",
    },
    {
      icon: Settings,
      title: "Ajusta parámetros",
      description: "Define cantidad, región y compara precios entre distintas tiendas de construcción en tiempo real.",
      color: "accent",
    },
    {
      icon: ShoppingCart,
      title: "Agrega a tu proyecto",
      description: "Organiza múltiples soluciones en proyectos y exporta especificaciones técnicas completas.",
      color: "secondary",
    },
  ]

  return (
    <section id="como-funciona" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
            Proceso simple
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Cómo usar Calybra</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tres pasos simples para obtener tu cotización profesional
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <Card
                key={idx}
                className="bg-card border-border hover:shadow-xl transition-all hover:-translate-y-1 relative"
              >
                <div className="p-8 space-y-4">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {idx + 1}
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 space-y-3">
          <p className="text-muted-foreground">Comienza explorando las soluciones disponibles</p>
          <p className="text-sm text-muted-foreground">
            Haz clic en <strong className="text-primary">Soluciones</strong> en el menú superior para comenzar
          </p>
        </div>
      </div>
      {/* </CHANGE> */}
    </section>
  )
}
