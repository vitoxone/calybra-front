"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { SOLUTIONS, SOLUTION_TYPES, FIRE_RATINGS, USAGES, type ConstructiveSolution } from "@/lib/solutions-data"

interface SolutionsListProps {
  onSelectSolution: (solution: ConstructiveSolution) => void
  selectedId?: string
}

export default function SolutionsList({ onSelectSolution, selectedId }: SolutionsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [fireFilter, setFireFilter] = useState<string>("all")
  const [usageFilter, setUsageFilter] = useState<string>("all")

  const filteredSolutions = SOLUTIONS.filter((sol) => {
    const matchesSearch = sol.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || sol.type === typeFilter
    const matchesFire = fireFilter === "all" || sol.fireRating === fireFilter
    const matchesUsage = usageFilter === "all" || sol.usage === usageFilter

    return matchesSearch && matchesType && matchesFire && matchesUsage
  })

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Soluciones constructivas disponibles</h2>

        <Input
          placeholder="Buscar solución…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de elemento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {SOLUTION_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={fireFilter} onValueChange={setFireFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Requisito de fuego" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {FIRE_RATINGS.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={usageFilter} onValueChange={setUsageFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Uso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {USAGES.map((usage) => (
                <SelectItem key={usage} value={usage}>
                  {usage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {filteredSolutions.map((solution) => (
          <Card
            key={solution.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selectedId === solution.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSelectSolution(solution)}
          >
            <h3 className="font-semibold text-sm text-foreground mb-2">{solution.name}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="secondary" className="text-xs">
                {solution.type}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {solution.fireRating}
              </Badge>
              <Badge variant="outline" className="text-xs">
                m²
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{solution.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
