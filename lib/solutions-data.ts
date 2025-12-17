export interface Material {
  name: string
  unit: string
  quantityPerM2: number
  observations: string
}

export interface Layer {
  name: string
  thickness: string
  role: string
  order: number
}

export interface ConstructiveSolution {
  id: string
  name: string
  type: "Tabique" | "Muro" | "Cielo" | "Piso" | "Cubierta"
  fireRating: string
  usage: "Interior" | "Exterior" | "Baño" | "Cocina" | "Medianero"
  description: string
  technicalDescription: string
  normatives: string[]
  layers: Layer[]
  materials: Material[]
  costPerM2: {
    materials: number
    labor: number
    total: number
  }
}

export const SOLUTIONS: ConstructiveSolution[] = [
  {
    id: "sol-001",
    name: "Tabique interior madera F-30 con aislación",
    type: "Tabique",
    fireRating: "F-30",
    usage: "Interior",
    description: "Estructura de madera 2x3, lana mineral 60 mm, doble placa de yeso",
    technicalDescription:
      "Sistema de tabique interior de madera estructurado con montantes 2x3 a 40 cm de separación. Incluye aislación térmica y acústica con lana mineral de 60 mm. Revestido en ambas caras con placa de yeso estándar de 15 mm. Cumple requisito F-30 según ED17-2025.",
    normatives: ["ED17-2025", "NCh 2361", "Reglamento Térmico", "MINVU"],
    layers: [
      {
        name: "Placa de yeso estándar",
        thickness: "15 mm",
        role: "Revestimiento interior",
        order: 1,
      },
      {
        name: "Estructura de madera 2x3",
        thickness: "-",
        role: "Estructura",
        order: 2,
      },
      {
        name: "Lana mineral",
        thickness: "60 mm",
        role: "Aislación térmico-acústica",
        order: 3,
      },
      {
        name: "Placa de yeso estándar",
        thickness: "15 mm",
        role: "Revestimiento exterior",
        order: 4,
      },
    ],
    materials: [
      {
        name: "Placa yeso estándar 15mm",
        unit: "m²",
        quantityPerM2: 2.1,
        observations: "Ambas caras, incluye pérdidas",
      },
      {
        name: "Madera 2x3 estructural",
        unit: "m",
        quantityPerM2: 2.5,
        observations: "Montantes y soleras",
      },
      {
        name: "Lana mineral 60mm",
        unit: "m²",
        quantityPerM2: 1.05,
        observations: "Aislación incluida en cavidad",
      },
      {
        name: "Tornillos placa yeso",
        unit: "unidad",
        quantityPerM2: 36,
        observations: "Fijación placas",
      },
      {
        name: "Pasta malla y adhesivos",
        unit: "kg",
        quantityPerM2: 1.5,
        observations: "Terminación de juntas",
      },
    ],
    costPerM2: {
      materials: 45500,
      labor: 28000,
      total: 73500,
    },
  },
  {
    id: "sol-002",
    name: "Tabique metálico interior F-60 doble placa",
    type: "Tabique",
    fireRating: "F-60",
    usage: "Interior",
    description: "Estructura de acero galvanizado, aislación, doble placa RF",
    technicalDescription:
      "Sistema de tabique con estructura de acero galvanizado UF 75. Aislación con lana mineral 100 mm. Doble placa de yeso resistente al fuego (RF) de 15 mm a cada lado. Cumple requisito F-60.",
    normatives: ["ED17-2025", "NCh 2361", "Reglamento Térmico", "MINVU"],
    layers: [
      {
        name: "Placa yeso RF 15mm",
        thickness: "15 mm",
        role: "Revestimiento RF interior",
        order: 1,
      },
      {
        name: "Estructura acero galvanizado UF 75",
        thickness: "-",
        role: "Estructura",
        order: 2,
      },
      {
        name: "Lana mineral",
        thickness: "100 mm",
        role: "Aislación y resistencia fuego",
        order: 3,
      },
      {
        name: "Placa yeso RF 15mm",
        thickness: "15 mm",
        role: "Revestimiento RF exterior",
        order: 4,
      },
    ],
    materials: [
      {
        name: "Placa yeso RF 15mm",
        unit: "m²",
        quantityPerM2: 2.1,
        observations: "Ambas caras",
      },
      {
        name: "Perfiles acero UF 75 galvanizado",
        unit: "m",
        quantityPerM2: 2.8,
        observations: "Verticales y horizontales",
      },
      {
        name: "Lana mineral 100mm",
        unit: "m²",
        quantityPerM2: 1.05,
        observations: "Aislación reforzada",
      },
      {
        name: "Tornillos placa yeso RF",
        unit: "unidad",
        quantityPerM2: 40,
        observations: "Fijación placas RF",
      },
      {
        name: "Cinta y pasta para RF",
        unit: "kg",
        quantityPerM2: 2.0,
        observations: "Terminación especial RF",
      },
    ],
    costPerM2: {
      materials: 67800,
      labor: 35000,
      total: 102800,
    },
  },
  {
    id: "sol-003",
    name: "Muro perimetral con EIFS",
    type: "Muro",
    fireRating: "Sin requisito",
    usage: "Exterior",
    description: "Aislación exterior, sistema EIFS, terminación estética",
    technicalDescription:
      "Sistema de aislación térmica exterior (EIFS) sobre muro de hormigón. Incluye poliestireno expandido 100 mm, adhesivo, malla de refuerzo y revestimiento decorativo. Mejora eficiencia energética.",
    normatives: ["Reglamento Térmico", "NCh 853", "MINVU"],
    layers: [
      {
        name: "Revestimiento decorativo",
        thickness: "5-10 mm",
        role: "Acabado final",
        order: 1,
      },
      {
        name: "Malla de refuerzo armada",
        thickness: "-",
        role: "Armadura",
        order: 2,
      },
      {
        name: "Poliestireno expandido",
        thickness: "100 mm",
        role: "Aislación térmica",
        order: 3,
      },
      {
        name: "Muro base hormigón",
        thickness: "variable",
        role: "Estructura",
        order: 4,
      },
    ],
    materials: [
      {
        name: "Poliestireno expandido 100mm",
        unit: "m²",
        quantityPerM2: 1.05,
        observations: "Aislación principal",
      },
      {
        name: "Adhesivo especializado",
        unit: "kg",
        quantityPerM2: 3.5,
        observations: "Fijación poliestireno",
      },
      {
        name: "Malla de vidrio armada",
        unit: "m²",
        quantityPerM2: 1.1,
        observations: "Refuerzo del sistema",
      },
      {
        name: "Revestimiento EIFS",
        unit: "kg",
        quantityPerM2: 5.0,
        observations: "Acabado mineral",
      },
    ],
    costPerM2: {
      materials: 38200,
      labor: 32000,
      total: 70200,
    },
  },
]

export const SOLUTION_TYPES = ["Tabique", "Muro", "Cielo", "Piso", "Cubierta"]
export const FIRE_RATINGS = ["Sin requisito", "F-15", "F-30", "F-60", "F-90"]
export const USAGES = ["Interior", "Exterior", "Baño", "Cocina", "Medianero"]
