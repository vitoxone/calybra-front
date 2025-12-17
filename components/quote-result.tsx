"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceOptionCard } from "@/components/price-option-card"
import { MaterialsTable } from "@/components/materials-table"
import { TechnicalSpecs } from "@/components/technical-specs"
import { getMaterialsByQuantity } from "@/lib/normative-data"

interface QuoteResultProps {
  data: any
}

export default function QuoteResult({ data }: QuoteResultProps) {
  const [activeTab, setActiveTab] = useState("ficha")

  const mockMaterials = getMaterialsByQuantity(Number.parseInt(data.quantity) || 20, data.quality)

  const priceOptions = [
    {
      name: "Económica",
      materials: "$350,000",
      labor: "$180,000",
      total: "$530,000",
    },
    {
      name: "Estándar",
      materials: "$450,000",
      labor: "$250,000",
      total: "$700,000",
      highlighted: true,
    },
    {
      name: "Premium",
      materials: "$580,000",
      labor: "$320,000",
      total: "$900,000",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border border-border">
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground">Resultado de la cotización</h3>

          <p className="text-muted-foreground text-sm">{data.description}</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {data.quality && <Badge variant="secondary">{data.quality}</Badge>}
            {data.quantity && <Badge variant="secondary">{data.quantity} m²</Badge>}
            {data.region && <Badge variant="secondary">{data.region}</Badge>}
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Card className="bg-white border border-border">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              <TabsTrigger value="ficha">Ficha técnica</TabsTrigger>
              <TabsTrigger value="normativa">Normativa</TabsTrigger>
              <TabsTrigger value="materiales">Materiales</TabsTrigger>
              <TabsTrigger value="precios">Precios</TabsTrigger>
            </TabsList>

            {/* Ficha Técnica Tab */}
            <TabsContent value="ficha" className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground font-semibold mb-3">
                  Tabique estructural de madera (solución técnica ED17)
                </p>
                <p className="text-foreground text-sm mb-4">
                  Tabique interior de madera estructurado con montantes 2x3", revestido con volcanita en ambas caras y
                  aislación con lana mineral 50-75mm. Cumple con exigencias térmicas, acústicas y de seguridad contra
                  incendio según zona térmica y requisitos locales. Sistema constructivo tradicional, económico, durable
                  y de fácil instalación.
                </p>
                <ul className="space-y-2 list-disc list-inside text-foreground text-sm mt-4">
                  <li>
                    <strong>Uso:</strong> División interior de espacios en viviendas y edificios comerciales
                  </li>
                  <li>
                    <strong>Unidad de medida:</strong> m²
                  </li>
                  <li>
                    <strong>Alcance:</strong> Incluye estructura de madera, aislación térmica y acústica, revestimiento
                    doble cara con volcanita, fijaciones y sellado de uniones
                  </li>
                  <li>
                    <strong>Acabado:</strong> Volcanita sin tratamiento superficial (debe ser terminada con pintura o
                    papel mural)
                  </li>
                  <li>
                    <strong>Rendimiento estimado:</strong> 10–14 m²/día según equipo y dificultad
                  </li>
                </ul>
              </div>

              {/* Rendimiento */}
              <div className="border-t border-border pt-4 mt-4">
                <h4 className="font-semibold text-foreground mb-3 text-sm">Rendimiento y Mano de Obra</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Equipo sugerido</p>
                    <p className="font-semibold text-foreground text-sm">2 carpinteros + 1 ayudante</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Rendimiento estimado</p>
                    <p className="font-semibold text-foreground text-sm">10–14 m²/día</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Tiempo para {data.quantity} m²</p>
                    <p className="font-semibold text-foreground text-sm">
                      {Math.ceil((Number.parseInt(data.quantity) || 20) / 12)} días
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Normativa Tab */}
            <TabsContent value="normativa" className="space-y-4">
              <TechnicalSpecs data={data} />
            </TabsContent>

            {/* Materiales Tab */}
            <TabsContent value="materiales">
              <MaterialsTable materials={mockMaterials} />
            </TabsContent>

            {/* Precios Tab */}
            <TabsContent value="precios" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {priceOptions.map((option) => (
                  <PriceOptionCard key={option.name} option={option} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Valores referenciales, calculados a partir de proveedores de materiales de construcción (demo).
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}
