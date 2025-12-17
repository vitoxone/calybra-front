import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ConstructiveSolution } from "@/lib/solutions-data"

interface ProjectSummaryProps {
  solution: ConstructiveSolution | null
  quantity: number
}

export default function ProjectSummary({ solution, quantity }: ProjectSummaryProps) {
  if (!solution) return null

  const total = solution.costPerM2.total * quantity

  return (
    <Card className="p-6 border-2 border-primary/20 bg-primary/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-foreground mb-4">Resumen del proyecto</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Solución seleccionada: </span>
              <span className="font-medium text-foreground">{solution.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Cantidad: </span>
              <span className="font-medium text-foreground">{quantity} m²</span>
            </div>
            <div>
              <span className="text-muted-foreground">Costo unitario estimado: </span>
              <span className="font-medium text-foreground">
                ${solution.costPerM2.total.toLocaleString("es-CL")} / m²
              </span>
            </div>
            <div className="pt-2 border-t">
              <span className="text-muted-foreground">Costo total estimado: </span>
              <span className="font-bold text-primary text-lg">${total.toLocaleString("es-CL")}</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-3">
          <Button variant="outline" className="w-full bg-transparent">
            Exportar PDF
          </Button>
          <Button className="w-full bg-primary hover:bg-primary/90">Agregar al proyecto</Button>
        </div>
      </div>
    </Card>
  )
}
