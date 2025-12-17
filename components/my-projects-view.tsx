"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder, FileText } from "lucide-react"
import type { UserProject } from "@/lib/user-projects-data"

interface MyProjectsViewProps {
  projects: UserProject[]
  onSelectProject: (project: UserProject) => void
  selectedProjectId: string | null
}

export default function MyProjectsView({ projects, onSelectProject, selectedProjectId }: MyProjectsViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Mis Proyectos</h2>
        <Badge variant="secondary" className="text-sm">
          {projects.length} {projects.length === 1 ? "proyecto" : "proyectos"}
        </Badge>
      </div>

      <ScrollArea className="h-[calc(100vh-240px)]">
        <div className="space-y-3 pr-4">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`p-4 cursor-pointer transition-all border-2 hover:border-primary/50 ${
                selectedProjectId === project.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                  : "border-border"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onSelectProject(project)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Folder className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {project.solutions.length} {project.solutions.length === 1 ? "solución" : "soluciones"}
                    </span>
                    <span>Creado: {project.createdAt.toLocaleDateString("es-CL")}</span>
                  </div>
                  {project.solutions.length > 0 && (
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground mb-2">Soluciones agregadas:</div>
                      <div className="space-y-1">
                        {project.solutions.slice(0, 3).map((sol) => (
                          <div key={sol.id} className="text-xs text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary/60" />
                            {sol.solution.name} ({sol.quantity} {sol.solution.unit})
                          </div>
                        ))}
                        {project.solutions.length > 3 && (
                          <div className="text-xs text-muted-foreground italic">
                            +{project.solutions.length - 3} más
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
