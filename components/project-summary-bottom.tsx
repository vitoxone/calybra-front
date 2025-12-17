"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState, useMemo } from "react"
import type { Project } from "@/lib/projects-data"
import ProjectSelectorModal from "./project-selector-modal"
import { getUserProjects, addSolutionToProject } from "@/lib/user-projects-data"
import StoreSelector from "./store-selector"
import { getStorePricesForProject, getBestStore, type Store } from "@/lib/store-prices"

interface ProjectSummaryBottomProps {
  project: Project | null
  quantity: number
  onAddToProject?: () => void
}

export default function ProjectSummaryBottom({ project, quantity, onAddToProject }: ProjectSummaryBottomProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const storePrices = useMemo(() => {
    if (!project) return []
    return getStorePricesForProject(project.costPerM2.total)
  }, [project])

  const [selectedStore, setSelectedStore] = useState<Store>(() => {
    return storePrices.length > 0 ? getBestStore(storePrices) : "sodimac"
  })

  if (!project || !quantity) return null

  const selectedStorePrice = storePrices.find((sp) => sp.store === selectedStore)
  const total = selectedStorePrice ? selectedStorePrice.pricePerUnit * quantity : project.costPerM2.total * quantity

  const handleAddToProject = () => {
    setIsModalOpen(true)
  }

  const handleSelectProject = (projectId: string) => {
    addSolutionToProject(projectId, project, quantity)

    setIsAdded(true)
    onAddToProject?.()

    setTimeout(() => setIsAdded(false), 3000)
  }

  const userProjects = getUserProjects()

  return (
    <>
      <Card className="p-6 border-2 border-primary/20 bg-primary/5 space-y-6">
        <StoreSelector
          storePrices={storePrices}
          selectedStore={selectedStore}
          onSelectStore={setSelectedStore}
          quantity={quantity}
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t">
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Proyecto: </span>
              <span className="font-semibold text-foreground">{project.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Cantidad: </span>
              <span className="font-semibold text-foreground">
                {quantity} {project.unit}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Tienda seleccionada: </span>
              <span className="font-semibold text-foreground">
                {storePrices.find((sp) => sp.store === selectedStore)?.storeName}
              </span>
            </div>
            <div className="pt-2 border-t">
              <span className="text-muted-foreground">Costo total: </span>
              <span className="text-lg font-bold text-primary">${total.toLocaleString("es-CL")}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Exportar PDF
            </Button>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Exportar Excel
            </Button>
            <Button
              onClick={handleAddToProject}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Agregado
                </>
              ) : (
                "Agregar al proyecto"
              )}
            </Button>
          </div>
        </div>
      </Card>

      <ProjectSelectorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        projects={userProjects}
        onSelectProject={handleSelectProject}
      />
    </>
  )
}
