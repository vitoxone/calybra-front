export type Store = "sodimac" | "easy" | "construmart" | "chilemat" | "imperial"

export interface StorePrice {
  store: Store
  storeName: string
  pricePerUnit: number
  availability: "available" | "limited" | "out-of-stock"
}

export function getStorePricesForProject(basePricePerM2: number): StorePrice[] {
  // Generate varied prices for each store (±10% variation)
  const variation = 0.1

  return [
    {
      store: "sodimac",
      storeName: "Sodimac",
      pricePerUnit: Math.round(basePricePerM2 * (1 + Math.random() * variation * 2 - variation)),
      availability: "available",
    },
    {
      store: "easy",
      storeName: "Easy",
      pricePerUnit: Math.round(basePricePerM2 * (1 + Math.random() * variation * 2 - variation)),
      availability: "available",
    },
    {
      store: "construmart",
      storeName: "Construmart",
      pricePerUnit: Math.round(basePricePerM2 * (1 + Math.random() * variation * 2 - variation)),
      availability: "available",
    },
    {
      store: "chilemat",
      storeName: "ChileMat",
      pricePerUnit: Math.round(basePricePerM2 * (1 + Math.random() * variation * 2 - variation)),
      availability: "available",
    },
    {
      store: "imperial",
      storeName: "Imperial",
      pricePerUnit: Math.round(basePricePerM2 * (1 + Math.random() * variation * 2 - variation)),
      availability: "available",
    },
  ].sort((a, b) => a.pricePerUnit - b.pricePerUnit) // Sort by price, cheapest first
}

export function getBestStore(storePrices: StorePrice[]): Store {
  const available = storePrices.filter((sp) => sp.availability === "available")
  return available.length > 0 ? available[0].store : storePrices[0].store
}
