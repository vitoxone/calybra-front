"use client"
import { Button } from "@/components/ui/button"
import { CATEGORIES } from "@/lib/projects-data"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CategoriesSidebarProps {
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string) => void
}

export default function CategoriesSidebar({ selectedCategoryId, onSelectCategory }: CategoriesSidebarProps) {
  return (
    <div className="w-full lg:w-80">
      <h2 className="text-lg font-semibold mb-4 px-2">Categorías de proyectos</h2>
      <ScrollArea className="h-[calc(100vh-200px)] rounded-lg border">
        <div className="p-3 space-y-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategoryId === category.id ? "default" : "outline"}
              className={`w-full justify-start gap-3 h-auto py-3 px-4 transition-all ${
                selectedCategoryId === category.id
                  ? "ring-2 ring-primary ring-offset-2 shadow-md scale-[1.02]"
                  : "hover:bg-accent"
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="text-left">{category.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
