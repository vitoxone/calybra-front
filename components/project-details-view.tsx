"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Download, FileText } from "lucide-react"
import type { UserProject } from "@/lib/user-projects-data"
import { removeSolutionFromProject } from "@/lib/user-projects-data"

interface ProjectDetailsViewProps {
  project: UserProject | null
  onUpdate: () => void
}

export default function ProjectDetailsView({ project, onUpdate }: ProjectDetailsViewProps) {
  if (!project) {
    return (
      <Card className="p-8 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Selecciona un proyecto para ver sus detalles</p>
        </div>
      </Card>
    )
  }

  const handleRemoveSolution = (solutionId: string) => {
    removeSolutionFromProject(project.id, solutionId)
    onUpdate()
  }

  const totalCost = project.solutions.reduce((sum, sol) => {
    return sum + sol.solution.costPerM2.total * sol.quantity
  }, 0)

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="space-y-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{project.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Badge variant="secondary">
            {project.solutions.length} {project.solutions.length === 1 ? "solución" : "soluciones"}
          </Badge>
          <span className="text-muted-foreground">
            Creado: {project.createdAt.toLocaleDateString("es-CL", { dateStyle: "long" })}
          </span>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="text-sm text-muted-foreground">Costo total estimado</div>
          <div className="text-2xl font-bold text-primary">${totalCost.toLocaleString("es-CL")}</div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      <div className="border-t pt-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground mb-3">Soluciones del proyecto</h3>

        {project.solutions.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground py-8">
            <div>
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No hay soluciones agregadas</p>
              <p className="text-xs mt-1">Agrega soluciones desde el catálogo</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-3 pr-4">
              {project.solutions.map((sol, index) => (
                <Card key={sol.id} className="p-4 border-2" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-foreground">{sol.solution.name}</h4>
                      <p className="text-sm text-muted-foreground">{sol.solution.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          Cantidad: {sol.quantity} {sol.solution.unit}
                        </span>
                        <span>Costo: ${(sol.solution.costPerM2.total * sol.quantity).toLocaleString("es-CL")}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Agregado: {sol.addedAt.toLocaleDateString("es-CL")}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSolution(sol.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  )
}
