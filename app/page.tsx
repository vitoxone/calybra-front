"use client"

import { useState, useEffect } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import LandingPage from "@/components/landing-page"
import CategoriesSidebar from "@/components/categories-sidebar"
import ProjectsList from "@/components/projects-list"
import ProjectDetail from "@/components/project-detail"
import ProjectSummaryBottom from "@/components/project-summary-bottom"
import MyProjectsView from "@/components/my-projects-view"
import ProjectDetailsView from "@/components/project-details-view"
import AboutView from "@/components/about-view"
import type { Project } from "@/lib/projects-data"
import type { UserProject } from "@/lib/user-projects-data"
import { getUserProjects } from "@/lib/user-projects-data"

export default function Home() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [activeSection, setActiveSection] = useState<
    "inicio" | "soluciones" | "mis-proyectos" | "otros-proyectos" | "acerca"
  >("inicio")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("tabiqueria")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [basketCount, setBasketCount] = useState(0)

  const [userProjects, setUserProjects] = useState<UserProject[]>([])
  const [selectedUserProject, setSelectedUserProject] = useState<UserProject | null>(null)

  useEffect(() => {
    // Simple auth flag for the mockup (no credentials).
    // Keeps the UX consistent between refreshes.
    try {
      const stored = window.localStorage.getItem("calybra_authed")
      if (stored === "1") {
        setIsAuthed(true)
        setActiveSection("soluciones")
      }
    } catch {
      // ignore
    }

    const loadProjects = () => {
      const projects = getUserProjects()
      setUserProjects(projects)
    }

    loadProjects()
    window.addEventListener("userProjectsUpdated", loadProjects)

    return () => {
      window.removeEventListener("userProjectsUpdated", loadProjects)
    }
  }, [])

  const handleNavClick = (section: "inicio" | "soluciones" | "mis-proyectos" | "otros-proyectos" | "acerca") => {
    setActiveSection(section)
    setSelectedProject(null)
    setSelectedUserProject(null)
    setQuantity(1)
  }

  const handleLogin = () => {
    setIsAuthed(true)
    setActiveSection("soluciones")
    try {
      window.localStorage.setItem("calybra_authed", "1")
    } catch {
      // ignore
    }
  }

  const handleLogout = () => {
    setIsAuthed(false)
    setActiveSection("inicio")
    setSelectedProject(null)
    setSelectedUserProject(null)
    setQuantity(1)
    try {
      window.localStorage.removeItem("calybra_authed")
    } catch {
      // ignore
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setSelectedProject(null)
    setQuantity(1)
  }

  const handleAddToProject = () => {
    setBasketCount((prev) => prev + 1)
    window.dispatchEvent(new Event("basketUpdated"))
  }

  const handleSelectUserProject = (project: UserProject) => {
    setSelectedUserProject(project)
  }

  const handleUpdateProjects = () => {
    const projects = getUserProjects()
    setUserProjects(projects)
    // Update selected project if it exists
    if (selectedUserProject) {
      const updated = projects.find((p) => p.id === selectedUserProject.id)
      setSelectedUserProject(updated || null)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {!isAuthed ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <>
          <DashboardNavbar
            currentSection={activeSection}
            onNavClick={handleNavClick}
            onLogout={handleLogout}
            basketCount={basketCount}
          />

          <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
          {activeSection === "mis-proyectos" ? (
            <>
              <div className="w-full lg:w-80">
                <MyProjectsView
                  projects={userProjects}
                  onSelectProject={handleSelectUserProject}
                  selectedProjectId={selectedUserProject?.id || null}
                />
              </div>
              <div className="flex-1">
                <ProjectDetailsView project={selectedUserProject} onUpdate={handleUpdateProjects} />
              </div>
            </>
          ) : activeSection === "acerca" ? (
            <div className="w-full py-2">
              <AboutView />
            </div>
          ) : (
            <>
              {activeSection === "soluciones" || activeSection === "otros-proyectos" ? (
                <div className="w-full lg:w-72">
                  <CategoriesSidebar selectedCategoryId={selectedCategoryId} onSelectCategory={handleCategoryChange} />
                </div>
              ) : (
                <div className="w-full lg:w-72 text-muted-foreground">
                  <p className="text-sm">Acerca de Calybra - Solución en diseño y obra</p>
                </div>
              )}

              <div className="w-full lg:w-80 max-h-[600px] lg:max-h-[calc(100vh-180px)]">
                <ProjectsList
                  categoryId={selectedCategoryId}
                  selectedProjectId={selectedProject?.id || null}
                  onSelectProject={setSelectedProject}
                  showUserProjects={activeSection === "otros-proyectos"}
                />
              </div>

              <div className="flex-1 max-h-[600px] lg:max-h-[calc(100vh-180px)]">
                <ProjectDetail project={selectedProject} onQuantityChange={setQuantity} />
              </div>
            </>
          )}
          </div>

          {activeSection !== "mis-proyectos" && activeSection !== "inicio" && activeSection !== "acerca" && (
            <div className="p-4 md:p-6 max-w-7xl mx-auto">
              <ProjectSummaryBottom project={selectedProject} quantity={quantity} onAddToProject={handleAddToProject} />
            </div>
          )}
        </>
      )}
    </main>
  )
}
