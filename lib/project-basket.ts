export interface ProjectBasketItem {
  id: string
  projectId: string
  projectName: string
  quantity: number
  unit: string
  costPerUnit: number
  totalCost: number
  addedAt: Date
}

export const addToBasket = (item: Omit<ProjectBasketItem, "id" | "addedAt">): ProjectBasketItem[] => {
  const basket = getBasket()
  const newItem: ProjectBasketItem = {
    ...item,
    id: `${item.projectId}-${Date.now()}`,
    addedAt: new Date(),
  }
  basket.push(newItem)
  localStorage.setItem("calybra-basket", JSON.stringify(basket))
  return basket
}

export const getBasket = (): ProjectBasketItem[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("calybra-basket")
  return stored ? JSON.parse(stored) : []
}

export const removeFromBasket = (id: string): ProjectBasketItem[] => {
  const basket = getBasket().filter((item) => item.id !== id)
  localStorage.setItem("calybra-basket", JSON.stringify(basket))
  return basket
}

export const clearBasket = (): void => {
  localStorage.removeItem("calybra-basket")
}
