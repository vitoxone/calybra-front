import type { Project } from "./projects-data"

export interface UserProject {
  id: string
  name: string
  description: string
  createdAt: Date
  solutions: ProjectSolution[]
}

export interface ProjectSolution {
  id: string
  solution: Project
  quantity: number
  addedAt: Date
}

const initialProjects: UserProject[] = [
  {
    id: "casa-nueva",
    name: "Casa Nueva",
    description: "Proyecto de construcción de vivienda unifamiliar de 120m²",
    createdAt: new Date("2024-12-01"),
    solutions: [],
  },
  {
    id: "bodega-materiales",
    name: "Bodega Materiales",
    description: "Bodega industrial para almacenamiento de materiales de construcción",
    createdAt: new Date("2024-11-15"),
    solutions: [],
  },
  {
    id: "sede-social",
    name: "Sede Social Villa Lautaro",
    description: "Centro comunitario para actividades sociales y recreativas",
    createdAt: new Date("2024-10-20"),
    solutions: [],
  },
]

export const getUserProjects = (): UserProject[] => {
  if (typeof window === "undefined") return initialProjects

  const stored = localStorage.getItem("calybra-user-projects")
  if (!stored) {
    // Initialize with default projects
    localStorage.setItem("calybra-user-projects", JSON.stringify(initialProjects))
    return initialProjects
  }

  return JSON.parse(stored, (key, value) => {
    if (key === "createdAt" || key === "addedAt") {
      return new Date(value)
    }
    return value
  })
}

export const addSolutionToProject = (projectId: string, solution: Project, quantity: number): UserProject[] => {
  const projects = getUserProjects()
  const projectIndex = projects.findIndex((p) => p.id === projectId)

  if (projectIndex === -1) return projects

  const newSolution: ProjectSolution = {
    id: `${solution.id}-${Date.now()}`,
    solution,
    quantity,
    addedAt: new Date(),
  }

  projects[projectIndex].solutions.push(newSolution)
  localStorage.setItem("calybra-user-projects", JSON.stringify(projects))

  // Trigger update event
  window.dispatchEvent(new Event("userProjectsUpdated"))

  return projects
}

export const removeSolutionFromProject = (projectId: string, solutionId: string): UserProject[] => {
  const projects = getUserProjects()
  const projectIndex = projects.findIndex((p) => p.id === projectId)

  if (projectIndex === -1) return projects

  projects[projectIndex].solutions = projects[projectIndex].solutions.filter((s) => s.id !== solutionId)
  localStorage.setItem("calybra-user-projects", JSON.stringify(projects))

  window.dispatchEvent(new Event("userProjectsUpdated"))

  return projects
}

export const createNewProject = (name: string, description: string): UserProject[] => {
  const projects = getUserProjects()
  const newProject: UserProject = {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    description,
    createdAt: new Date(),
    solutions: [],
  }

  projects.push(newProject)
  localStorage.setItem("calybra-user-projects", JSON.stringify(projects))

  window.dispatchEvent(new Event("userProjectsUpdated"))

  return projects
}
