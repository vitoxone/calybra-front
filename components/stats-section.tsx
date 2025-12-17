import { Card } from "@/components/ui/card"

export default function StatsSection() {
  const stats = [
    {
      value: "10,000+",
      label: "Cotizaciones generadas",
      description: "Proyectos completados exitosamente",
    },
    {
      value: "5",
      label: "Tiendas comparadas",
      description: "Sodimac, Easy, Construmart y más",
    },
    {
      value: "98%",
      label: "Precisión",
      description: "En análisis de precios y materiales",
    },
    {
      value: "80%",
      label: "Tiempo ahorrado",
      description: "Comparado con métodos tradicionales",
    },
  ]

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-6 bg-card border-border text-center hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* </CHANGE> */}
    </section>
  )
}
