import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

interface TechnicalSpecsProps {
  data: any
}

export function TechnicalSpecs({ data }: TechnicalSpecsProps) {
  const specs = [
    { label: "Resistencia al fuego", value: "F-30 / F-60", icon: "🔥" },
    { label: "Cumplimiento térmico", value: "U ≤ 0.6 W/m²K", icon: "❄️" },
    { label: "Aislación acústica", value: "≥ 45 dB", icon: "🔊" },
    { label: "Humedad", value: "Protección vapor + ventilación", icon: "💧" },
    { label: "Normativa aplicable", value: "ED17-2025 + OGUC", icon: "📋" },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {specs.map((spec, idx) => (
          <div key={idx} className="bg-muted/20 rounded-lg p-4 border border-border/30">
            <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
            <p className="font-semibold text-foreground text-sm">{spec.value}</p>
          </div>
        ))}
      </div>

      {/* Warnings */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 text-sm mb-2">Advertencias normativas</h4>
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>✓ Requiere informe de especialista en estructuras</li>
              <li>✓ Ensaye de comportamiento al fuego obligatorio</li>
              <li>✓ Certificación DOM en zonas sísmicas (NCh 433)</li>
              <li>✓ Certificado de tratamiento fungicida e insecticida (NCh 819)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Applicable standards */}
      <div>
        <h4 className="font-semibold text-foreground mb-3 text-sm">Normativas aplicadas</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">ED17-2025</Badge>
          <Badge variant="secondary">NCh 1914</Badge>
          <Badge variant="secondary">NCh 430</Badge>
          <Badge variant="secondary">NCh 1198</Badge>
          <Badge variant="secondary">NCh 352</Badge>
          <Badge variant="secondary">OGUC Art. 4.3</Badge>
        </div>
      </div>
    </div>
  )
}
