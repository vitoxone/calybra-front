import { Card } from "@/components/ui/card"
import { FileText, Package, BarChart3, Clock, Shield, Zap, FileDown, MapPin, Layers } from "lucide-react"

export default function FeaturesGrid() {
  const features = [
    {
      icon: Layers,
      title: "Biblioteca de soluciones",
      description: "Soluciones por tipología listas para ajustar y reutilizar entre proyectos.",
    },
    {
      icon: Package,
      title: "Cubicación + materiales (BOM)",
      description: "Listado completo con cantidades, unidades y observaciones por partida.",
    },
    {
      icon: Shield,
      title: "Checklist normativo",
      description: "Requisitos por solución (térmico, acústico, fuego, etc.) con trazabilidad.",
    },
    {
      icon: MapPin,
      title: "Costos por zona",
      description: "Presupuesto referencial por región y comparación por proveedor.",
    },
    {
      icon: BarChart3,
      title: "Comparar alternativas",
      description: "Evalúa opciones equivalentes para decidir mejor en costo y desempeño.",
    },
    {
      icon: FileDown,
      title: "Exportables",
      description: "Entrega en PDF/Excel para compartir con cliente, oficina u obra.",
    },
    {
      icon: FileText,
      title: "Fichas técnicas",
      description: "Descripción, especificación y pasos de ejecución en un mismo lugar.",
    },
    {
      icon: Clock,
      title: "Ahorro de tiempo",
      description: "Reduce horas de planillas y correcciones a minutos con un flujo guiado.",
    },
    {
      icon: Zap,
      title: "Asistente (IA)",
      description: "Ayuda a elegir y ajustar soluciones, manteniendo coherencia en la documentación.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent-foreground rounded-full text-sm font-medium mb-2">
            Características
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Todo lo que necesitas para cotizar profesionalmente
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas potentes diseñadas para profesionales de la construcción
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card
                key={idx}
                className="p-6 bg-card border-border hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
      {/* </CHANGE> */}
    </section>
  )
}
