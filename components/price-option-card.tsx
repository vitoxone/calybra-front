import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PriceOptionCardProps {
  option: {
    name: string
    materials: string
    labor: string
    total: string
    highlighted?: boolean
  }
}

export function PriceOptionCard({ option }: PriceOptionCardProps) {
  return (
    <Card
      className={`border-2 transition-all ${
        option.highlighted ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      }`}
    >
      <div className="p-6 space-y-4">
        <h4 className="font-semibold text-lg text-foreground">Opción {option.name}</h4>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Costo materiales:</span>
            <span className="font-semibold text-foreground">{option.materials}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mano de obra:</span>
            <span className="font-semibold text-foreground">{option.labor}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-foreground">Total estimado:</span>
            <span className="font-bold text-lg text-primary">{option.total}</span>
          </div>
          <Button variant="outline" className="w-full text-sm bg-transparent">
            Ver detalle
          </Button>
        </div>
      </div>
    </Card>
  )
}
