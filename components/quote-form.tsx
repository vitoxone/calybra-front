"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface QuoteFormProps {
  onSubmit: (data: any) => void
}

export default function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("20")
  const [quality, setQuality] = useState("Estándar")
  const [region, setRegion] = useState("O'Higgins")
  const [useRealPrices, setUseRealPrices] = useState(true)
  const [fireResistance, setFireResistance] = useState("F-30")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      description,
      quantity,
      quality,
      region,
      useRealPrices,
      fireResistance,
    })
  }

  return (
    <Card className="w-full lg:max-w-md mx-auto bg-white border border-border shadow-lg">
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Generar cotización</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Main textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Describe la partida que quieres cotizar</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: tabique de madera de 20 m² con requisito F-30 en la Región de O'Higgins"
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
              required
            />
          </div>

          {/* Advanced fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Cantidad (m²)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="20"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Calidad</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Económica</option>
                <option>Estándar</option>
                <option>Premium</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Fuego (F-XX)</label>
              <select
                value={fireResistance}
                onChange={(e) => setFireResistance(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>F-15</option>
                <option>F-30</option>
                <option>F-60</option>
                <option>F-90</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Región</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>RM</option>
                <option>Valparaíso</option>
                <option>O'Higgins</option>
                <option>Maule</option>
                <option>Biobío</option>
                <option>Otra</option>
              </select>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useRealPrices"
              checked={useRealPrices}
              onChange={(e) => setUseRealPrices(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="useRealPrices" className="text-sm text-foreground cursor-pointer">
              Usar valores referenciales con precios reales (demo)
            </label>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            disabled={!description.trim()}
          >
            <Sparkles className="w-4 h-4" />
            Generar cotización con IA
          </Button>

          {/* Hint text */}
          <p className="text-xs text-muted-foreground text-center pt-2">
            Datos referenciales según normativa ED17-2025 y regulaciones MINVU.
          </p>
        </form>
      </div>
    </Card>
  )
}
