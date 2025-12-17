"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder, Check } from "lucide-react"
import type { UserProject } from "@/lib/user-projects-data"
import { useState } from "react"

interface ProjectSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projects: UserProject[]
  onSelectProject: (projectId: string) => void
}

export default function ProjectSelectorModal({
  open,
  onOpenChange,
  projects,
  onSelectProject,
}: ProjectSelectorModalProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const handleSelect = (projectId: string) => {
    setSelectedProjectId(projectId)
  }

  const handleConfirm = () => {
    if (selectedProjectId) {
      onSelectProject(selectedProjectId)
      onOpenChange(false)
      setSelectedProjectId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar a proyecto</DialogTitle>
          <DialogDescription>Selecciona el proyecto donde deseas agregar esta solución</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleSelect(project.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedProjectId === project.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Folder className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {project.solutions.length} {project.solutions.length === 1 ? "solución" : "soluciones"}
                      </div>
                    </div>
                  </div>
                  {selectedProjectId === project.id && <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedProjectId} className="bg-primary hover:bg-primary/90">
            Agregar a proyecto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
