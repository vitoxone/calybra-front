"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import Image from "next/image"
import { getUserProjects } from "@/lib/user-projects-data"

interface DashboardNavbarProps {
  currentSection: "inicio" | "soluciones" | "mis-proyectos" | "otros-proyectos" | "acerca"
  onNavClick?: (section: "inicio" | "soluciones" | "mis-proyectos" | "otros-proyectos" | "acerca") => void
  onLogout?: () => void
  basketCount?: number
}

export default function DashboardNavbar({ currentSection, onNavClick, onLogout }: DashboardNavbarProps) {
  const [projectsCount, setProjectsCount] = useState(0)

  useEffect(() => {
    const updateProjectsCount = () => {
      const projects = getUserProjects()
      setProjectsCount(projects.length)
    }

    updateProjectsCount()
    window.addEventListener("userProjectsUpdated", updateProjectsCount)

    return () => {
      window.removeEventListener("userProjectsUpdated", updateProjectsCount)
    }
  }, [])

  const handleNavClick = (section: "inicio" | "soluciones" | "mis-proyectos" | "otros-proyectos" | "acerca") => {
    onNavClick?.(section)
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/calybra-logo.png" alt="Calybra Logo" width={120} height={40} className="h-10 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={currentSection === "soluciones" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavClick("soluciones")}
            className="text-sm"
          >
            Soluciones
          </Button>
          <Button
            variant={currentSection === "mis-proyectos" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavClick("mis-proyectos")}
            className="text-sm relative"
          >
            Mis Proyectos
            {projectsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                {projectsCount}
              </Badge>
            )}
          </Button>
          <Button
            variant={currentSection === "otros-proyectos" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavClick("otros-proyectos")}
            className="text-sm"
          >
            Otros proyectos
          </Button>
          <Button
            variant={currentSection === "acerca" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleNavClick("acerca")}
            className="text-sm"
          >
            Acerca de
          </Button>
          <div className="flex gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={onLogout}>
              Salir
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
