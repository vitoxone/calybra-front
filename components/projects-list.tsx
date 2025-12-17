"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES, USER_PROJECTS } from "@/lib/projects-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star } from "lucide-react"
import type { Project } from "@/lib/projects-data"
import { useState, useEffect } from "react"

interface ProjectsListProps {
  categoryId: string | null
  selectedProjectId: string | null
  onSelectProject: (project: Project) => void
  showUserProjects?: boolean
}

export default function ProjectsList({
  categoryId,
  selectedProjectId,
  onSelectProject,
  showUserProjects = false,
}: ProjectsListProps) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!showUserProjects && categoryId) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    }
  }, [categoryId, showUserProjects])

  if (showUserProjects) {
    return (
      <Card className="p-0 h-full flex flex-col">
        <h2 className="text-lg font-semibold p-4 pb-0">Proyectos de otros usuarios</h2>
        <ScrollArea className="flex-1 rounded-lg">
          <div className="p-3 space-y-2">
            {USER_PROJECTS.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No hay proyectos disponibles</p>
            ) : (
              USER_PROJECTS.map((project) => (
                <Button
                  key={project.id}
                  variant={selectedProjectId === project.id ? "default" : "outline"}
                  className="w-full justify-start h-auto py-3 px-3 flex-col items-start"
                  onClick={() => onSelectProject(project as unknown as Project)}
                >
                  <div className="flex items-start justify-between w-full gap-2">
                    <span className="font-semibold text-left flex-1">{project.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{project.rating}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{project.author}</span>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.unit}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ${project.costPerM2.total.toLocaleString("es-CL")}
                    </Badge>
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    )
  }

  const category = CATEGORIES.find((c) => c.id === categoryId)
  const projects = category?.projects || []

  if (!categoryId || !category) {
    return (
      <Card className="p-6 h-full flex items-center justify-center text-muted-foreground">
        Selecciona una categoría para ver proyectos
      </Card>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-2xl">{category.icon}</span>
        <div>
          <h2 className="text-lg font-semibold">{category.name}</h2>
          <p className="text-xs text-muted-foreground">{projects.length} soluciones disponibles</p>
        </div>
      </div>
      <ScrollArea className="flex-1 rounded-lg border">
        {isLoading ? (
          <div className="p-6 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Cargando soluciones...</p>
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {projects.map((project, index) => (
              <Button
                key={project.id}
                variant={selectedProjectId === project.id ? "default" : "outline"}
                className="w-full justify-start h-auto py-3 px-3 flex-col items-start animate-in fade-in slide-in-from-left-2"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => onSelectProject(project)}
              >
                <span className="font-semibold text-left">{project.name}</span>
                <Badge variant="secondary" className="mt-2">
                  {project.unit}
                </Badge>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
