"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Check, TrendingDown } from "lucide-react"
import type { StorePrice, Store } from "@/lib/store-prices"

interface StoreSelectorProps {
  storePrices: StorePrice[]
  selectedStore: Store
  onSelectStore: (store: Store) => void
  quantity: number
}

export default function StoreSelector({ storePrices, selectedStore, onSelectStore, quantity }: StoreSelectorProps) {
  const cheapestStore = storePrices[0].store

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-semibold">Comparar precios de tiendas</Label>
        <Badge variant="outline" className="text-xs">
          <TrendingDown className="h-3 w-3 mr-1" />
          Precio total para {quantity} m²
        </Badge>
      </div>
      <RadioGroup value={selectedStore} onValueChange={(value) => onSelectStore(value as Store)}>
        <div className="space-y-2">
          {storePrices.map((storePrice) => {
            const isCheapest = storePrice.store === cheapestStore
            const totalPrice = storePrice.pricePerUnit * quantity

            return (
              <div
                key={storePrice.store}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedStore === storePrice.store
                    ? "border-primary bg-primary/5"
                    : isCheapest
                      ? "border-green-500/50 bg-green-50"
                      : "border-border hover:border-primary/30"
                }`}
                onClick={() => onSelectStore(storePrice.store)}
              >
                <RadioGroupItem value={storePrice.store} id={storePrice.store} />
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={storePrice.store} className="font-medium cursor-pointer">
                      {storePrice.storeName}
                    </Label>
                    {isCheapest && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Más conveniente
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">${totalPrice.toLocaleString("es-CL")}</div>
                    <div className="text-xs text-muted-foreground">
                      ${storePrice.pricePerUnit.toLocaleString("es-CL")}/m²
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </RadioGroup>
    </div>
  )
}
