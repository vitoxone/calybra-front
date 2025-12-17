import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Layers, FileDown, MapPin, Scale, ShieldCheck, History, Users } from "lucide-react"

export default function AboutView() {
  const items = [
    {
      icon: Layers,
      title: "Biblioteca de soluciones",
      description: "Soluciones constructivas por tipología, listas para ajustar (dimensiones, unidad, etc.).",
    },
    {
      icon: Scale,
      title: "Cubicación + lista de materiales",
      description: "Cantidad y unidades claras (BOM) con observaciones y rendimientos por partida.",
    },
    {
      icon: ShieldCheck,
      title: "Checklist normativo",
      description: "Requisitos por tipología (térmico, acústico, fuego, etc.) para trabajar con trazabilidad.",
    },
    {
      icon: MapPin,
      title: "Costos por zona",
      description: "Presupuesto referencial por región y comparación de precios por proveedor.",
    },
    {
      icon: FileDown,
      title: "Exportables",
      description: "Salida en PDF/Excel para compartir con cliente, equipo u obra.",
    },
    {
      icon: History,
      title: "Proyectos y versiones",
      description: "Guardar proyectos, reutilizar soluciones y mantener historial de cambios.",
    },
    {
      icon: Users,
      title: "Trabajo en equipo",
      description: "Planes multiusuario (en roadmap) con roles y colaboración.",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Acerca de Calybra</h1>
          <Badge variant="outline">Maqueta</Badge>
        </div>
        <p className="text-muted-foreground">
          Calybra es una plataforma para estandarizar y acelerar la especificación y cotización de soluciones
          constructivas. Esta maqueta muestra las funciones principales que estamos construyendo.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">
            En la sección <strong>Soluciones</strong> puedes ver materiales, normativa, APU y presupuesto.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it, idx) => {
          const Icon = it.icon
          return (
            <Card key={idx} className="p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">{it.title}</p>
                <p className="text-sm text-muted-foreground">{it.description}</p>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-5">
        <p className="font-semibold mb-2">Cómo se usa (rápido)</p>
        <ol className="list-decimal ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Entra a <strong>Soluciones</strong>, elige una categoría y selecciona una solución.</li>
          <li>Define cantidad y región para ver el presupuesto referencial.</li>
          <li>Revisa pestañas: descripción, solución, materiales, normativa y APU.</li>
          <li>Exporta o agrega la solución a un proyecto para seguir trabajando.</li>
        </ol>
      </Card>
    </div>
  )
}
