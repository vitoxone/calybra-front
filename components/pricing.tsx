import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Gratis",
      subtitle: "Demo",
      price: "$0",
      description: "Prueba la herramienta",
      features: ["5 cotizaciones por mes", "Precios referenciales", "Análisis básico", "Acceso a categorías básicas"],
      cta: "Comenzar gratis",
    },
    {
      name: "Profesional",
      subtitle: "Más popular",
      price: "$29.990",
      period: "/mes",
      description: "Para profesionales y equipos",
      features: [
        "Cotizaciones ilimitadas",
        "Precios actualizados en tiempo real",
        "Análisis avanzado con IA",
        "Historial de cotizaciones",
        "Exportar a Excel y PDF",
        "Soporte prioritario",
      ],
      highlighted: true,
      cta: "Comenzar ahora",
    },
    {
      name: "Empresas",
      subtitle: "Personalizado",
      price: "Custom",
      description: "Solución personalizada",
      features: [
        "Todo lo de Profesional",
        "API integration",
        "Multi-usuario ilimitado",
        "Reportes personalizados",
        "Branding personalizado",
        "Soporte 24/7",
      ],
      cta: "Contactar ventas",
    },
  ]

  return (
    <section id="precios" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent-foreground rounded-full text-sm font-medium mb-2">
            Planes flexibles
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Planes de precios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que se adapte a tus necesidades. Sin compromisos a largo plazo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative overflow-hidden transition-all ${
                plan.highlighted
                  ? "border-2 border-primary shadow-2xl scale-105 md:scale-110 bg-card"
                  : "border border-border hover:border-primary/50 hover:shadow-lg bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {plan.subtitle}
                </div>
              )}

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  {!plan.highlighted && plan.subtitle && (
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{plan.subtitle}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-lg">{plan.period}</span>}
                  </div>
                </div>

                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                      : "border-2 border-border hover:bg-muted"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3 pt-4 border-t border-border">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center space-y-2">
          <p className="text-muted-foreground text-sm">
            Todos los planes incluyen actualizaciones gratuitas y acceso completo a nuevas funcionalidades
          </p>
          <p className="text-muted-foreground text-xs">
            ¿Tienes dudas?{" "}
            <a href="#" className="text-primary hover:underline">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
      {/* </CHANGE> */}
    </section>
  )
}
