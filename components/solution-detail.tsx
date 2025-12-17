"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ConstructiveSolution } from "@/lib/solutions-data"

interface SolutionDetailProps {
  solution: ConstructiveSolution
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export default function SolutionDetail({ solution, quantity, onQuantityChange }: SolutionDetailProps) {
  const [showTotals, setShowTotals] = useState(false)

  const totalMaterials = solution.costPerM2.materials * quantity
  const totalLabor = solution.costPerM2.labor * quantity
  const grandTotal = solution.costPerM2.total * quantity

  const handleQuantityChange = (value: string) => {
    const num = Number(value) || 0
    onQuantityChange(num)
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <Card className="p-6 border-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-3">{solution.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>Tipo: {solution.type}</Badge>
            <Badge variant="destructive">{solution.fireRating}</Badge>
            <Badge variant="outline">m²</Badge>
            <Badge>{solution.usage}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Solución pre-cargada aprobada según normativa MINVU (referencial).
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Cantidad a proyectar (m²)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                placeholder="Ej: 35"
                className="flex-1"
              />
              <Button onClick={() => setShowTotals(true)} className="bg-primary hover:bg-primary/90">
                Calcular APU y totales
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="technical" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technical">Ficha técnica</TabsTrigger>
          <TabsTrigger value="layers">Capas</TabsTrigger>
          <TabsTrigger value="materials">Materiales</TabsTrigger>
          <TabsTrigger value="apu">APU y totales</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="technical" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Descripción técnica</h3>
              <p className="text-sm text-muted-foreground mb-4">{solution.technicalDescription}</p>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Normativas aplicables</h4>
                <ul className="space-y-1">
                  {solution.normatives.map((norm) => (
                    <li key={norm} className="text-sm text-muted-foreground">
                      • {norm}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="layers" className="space-y-3">
            {solution.layers.map((layer) => (
              <Card key={layer.order} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{layer.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{layer.role}</p>
                  </div>
                  <Badge variant="outline">{layer.thickness}</Badge>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="materials">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Material</th>
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Unidad</th>
                    <th className="text-right py-3 px-3 font-semibold text-foreground">Cantidad /m²</th>
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solution.materials.map((material, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-3 text-muted-foreground">{material.name}</td>
                      <td className="py-3 px-3 text-muted-foreground">{material.unit}</td>
                      <td className="py-3 px-3 text-right font-medium text-foreground">
                        {material.quantityPerM2.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-xs text-muted-foreground">{material.observations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="apu" className="space-y-4">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h3 className="font-semibold text-foreground mb-3">APU unitario (por m²)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Costo materiales:</span>
                  <span className="font-medium text-foreground">
                    ${solution.costPerM2.materials.toLocaleString("es-CL")} / m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Costo mano de obra:</span>
                  <span className="font-medium text-foreground">
                    ${solution.costPerM2.labor.toLocaleString("es-CL")} / m²
                  </span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>Costo total:</span>
                  <span className="text-primary">${solution.costPerM2.total.toLocaleString("es-CL")} / m²</span>
                </div>
              </div>
            </Card>

            {showTotals && (
              <Card className="p-4 bg-accent/5 border-accent/20">
                <h3 className="font-semibold text-foreground mb-3">Totales para {quantity} m²</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total materiales estimado:</span>
                    <span className="font-medium text-foreground">${totalMaterials.toLocaleString("es-CL")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total mano de obra estimado:</span>
                    <span className="font-medium text-foreground">${totalLabor.toLocaleString("es-CL")}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-lg">
                    <span>Total general:</span>
                    <span className="text-primary">${grandTotal.toLocaleString("es-CL")}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Valores referenciales. Los precios reales pueden variar según región, proveedor y fecha.
                </p>
              </Card>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
