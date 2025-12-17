interface Material {
  item: string
  unit: string
  quantity: number
  notes: string
}

interface MaterialsTableProps {
  materials: Material[]
}

export function MaterialsTable({ materials }: MaterialsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/30">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Ítem</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Unidad</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">Cantidad</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Observación</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, idx) => (
            <tr key={idx} className="border-b border-border hover:bg-muted/20 transition-colors">
              <td className="px-4 py-3 text-foreground">{material.item}</td>
              <td className="px-4 py-3 text-muted-foreground">{material.unit}</td>
              <td className="px-4 py-3 text-right font-semibold text-foreground">{material.quantity}</td>
              <td className="px-4 py-3 text-muted-foreground text-xs">{material.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
