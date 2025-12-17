"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"
import type { Project } from "@/lib/projects-data"

interface ProjectDetailProps {
  project: Project | null
  onQuantityChange?: (quantity: number) => void
}

const REGIONS = [
  { id: "rm", name: "Región Metropolitana" },
  { id: "valparaiso", name: "Valparaíso" },
  { id: "ohiggins", name: "O'Higgins" },
  { id: "maule", name: "Maule" },
  { id: "biobio", name: "Biobío" },
  { id: "arica", name: "Arica y Parinacota" },
  { id: "tarapaca", name: "Tarapacá" },
  { id: "antofagasta", name: "Antofagasta" },
  { id: "atacama", name: "Atacama" },
  { id: "coquimbo", name: "Coquimbo" },
  { id: "losrios", name: "Los Ríos" },
  { id: "loslagos", name: "Los Lagos" },
  { id: "aysen", name: "Aysén" },
  { id: "magallanes", name: "Magallanes" },
]

export default function ProjectDetail({ project, onQuantityChange }: ProjectDetailProps) {
  const [quantity, setQuantity] = useState<number>(1)
  const [region, setRegion] = useState<string>("rm")

  if (!project) {
    return (
      <Card className="p-6 h-full flex items-center justify-center text-muted-foreground">
        Selecciona un proyecto para ver detalles
      </Card>
    )
  }

  const handleQuantityChange = (value: string) => {
    const num = Number.parseFloat(value) || 0
    setQuantity(num)
    onQuantityChange?.(num)
  }

  const total = project.costPerM2.total * quantity

  return (
    <Card className="p-6 h-full flex flex-col overflow-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-3">{project.name}</h2>

        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3 className="text-base font-bold text-green-800">Normativas aplicadas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.regulations.map((reg, index) => (
              <Badge key={index} className="bg-green-600 text-white hover:bg-green-700 text-sm py-1 px-3">
                {reg}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Unidad: {project.unit}</Badge>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="quantity" className="mb-2 block">
            Cantidad del proyecto
          </Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            placeholder={`Ej: 50 ${project.unit}`}
          />
        </div>
        <div>
          <Label htmlFor="region" className="mb-2 block">
            Ubicación (Región)
          </Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Selecciona región" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button className="w-full bg-primary hover:bg-primary/90">Calcular APU y Totales</Button>
        </div>
      </div>

      <Tabs defaultValue="description" className="flex-1">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="description" className="text-xs md:text-sm">
            Descripción
          </TabsTrigger>
          <TabsTrigger value="solution" className="text-xs md:text-sm">
            Solución
          </TabsTrigger>
          <TabsTrigger value="materials" className="text-xs md:text-sm">
            Materiales
          </TabsTrigger>
          <TabsTrigger value="regulations" className="text-xs md:text-sm">
            Normativa
          </TabsTrigger>
          <TabsTrigger value="apu" className="text-xs md:text-sm">
            APU
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="text-sm">
          <div className="space-y-3">
            <p className="text-foreground">{project.description}</p>
            <p className="text-sm text-muted-foreground">
              <strong>Especificación técnica:</strong> {project.technicalSpec}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="solution" className="text-sm">
          <p className="text-foreground">{project.constructiveSolution}</p>
        </TabsContent>

        <TabsContent value="materials" className="text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Ítem</th>
                  <th className="text-left py-2 px-2">Unidad</th>
                  <th className="text-right py-2 px-2">Cantidad</th>
                  <th className="text-left py-2 px-2">Observación</th>
                </tr>
              </thead>
              <tbody>
                {project.materials.map((material, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-2">{material.item}</td>
                    <td className="py-2 px-2">{material.unit}</td>
                    <td className="text-right py-2 px-2">{material.quantity}</td>
                    <td className="py-2 px-2 text-muted-foreground">{material.observation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="regulations" className="text-sm">
          <ul className="space-y-2">
            {project.regulations.map((reg, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-foreground">{reg}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="apu" className="text-sm">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-muted">
              <p className="text-muted-foreground mb-1">Materiales</p>
              <p className="text-xl font-bold text-primary">${project.costPerM2.materials.toLocaleString("es-CL")}</p>
              <p className="text-xs text-muted-foreground mt-1">por {project.unit}</p>
            </Card>
            <Card className="p-4 bg-muted">
              <p className="text-muted-foreground mb-1">Mano de obra</p>
              <p className="text-xl font-bold text-primary">${project.costPerM2.labor.toLocaleString("es-CL")}</p>
              <p className="text-xs text-muted-foreground mt-1">por {project.unit}</p>
            </Card>
            <Card className="p-4 bg-muted">
              <p className="text-muted-foreground mb-1">Equipos</p>
              <p className="text-xl font-bold text-primary">${project.costPerM2.equipment.toLocaleString("es-CL")}</p>
              <p className="text-xs text-muted-foreground mt-1">por {project.unit}</p>
            </Card>
            <Card className="p-4 bg-primary/10 border-2 border-primary">
              <p className="text-muted-foreground mb-1">Total unitario</p>
              <p className="text-xl font-bold text-primary">${project.costPerM2.total.toLocaleString("es-CL")}</p>
              <p className="text-xs text-muted-foreground mt-1">por {project.unit}</p>
            </Card>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Valores simulados – solo referenciales para la demo.</p>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
