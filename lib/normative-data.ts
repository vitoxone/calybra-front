export const technicalDatabase = {
  tabique_madera: {
    wood_f30: {
      nombre: "Tabique estructural de madera F-30",
      codigo_ed17: "A.2.3.15",
      descripcion:
        "Tabique interior de madera con resistencia al fuego F-30, cumple OGUC y soluciones técnicas del MINVU",
      normativas: [
        "ED17-2025 (Listado Oficial de Comportamiento al Fuego)",
        "NCh 1914 (Comportamiento al fuego de elementos y componentes de edificios)",
        "NCh 430 (Cálculo de estructuras de madera)",
        "NCh 1198 (Cargas y acciones)",
        "OGUC Art. 4.3.2 a 4.3.7 (Seguridad contra el fuego)",
      ],
      composicion: {
        estructura: 'Montantes y soleras de madera 2x3" tratada (structural grade)',
        revestimiento: "Volcanita 10mm (ambas caras, fijada con tornillos cada 20cm)",
        aislacion_termica: "Lana mineral 50mm (conductividad máxima 0.045 W/mK)",
        aislacion_acustica: "Lana mineral 50mm + cámara de aire 50mm",
        separacion_montantes: "40cm o 60cm según carga",
        tratamiento_madera: "Tratamiento fungicida e insecticida (NCh 819)",
      },
      zona_termica_aplicable: {
        RM: { u_requerida: 0.6, espesor_aislacion: "50mm" },
        Valparaiso: { u_requerida: 0.6, espesor_aislacion: "50mm" },
        OHiggins: { u_requerida: 0.55, espesor_aislacion: "60mm" },
        Maule: { u_requerida: 0.55, espesor_aislacion: "60mm" },
        Biobio: { u_requerida: 0.5, espesor_aislacion: "70mm" },
      },
      cumplimiento_acustico: "≥ 45 dB (NCh 352 para viviendas)",
      humedad_exigencias:
        "Barrera de vapor requerida lado interior. Protección con pintura latex en zonas húmedas (baños, cocinas). Ventilación mínima 5 cm²/m² de superficie de envolvente.",
      advertencias: [
        "Requiere supervisión profesional de especialista en estructuras",
        "Ensaye de comportamiento al fuego obligatorio para F-30",
        "Certificación DOM requerida en zonas sísmicas (NCh 433)",
        "Requiere certificado de tratamiento de madera",
      ],
    },
    wood_f60: {
      nombre: "Tabique estructural de madera F-60",
      codigo_ed17: "A.2.3.30",
      descripcion:
        "Tabique interior de madera con resistencia al fuego F-60, cumple con separaciones entre unidades habitacionales",
      normativas: [
        "ED17-2025",
        "NCh 1914",
        "NCh 430",
        "NCh 3690 (Comportamiento al fuego de estructuras de madera)",
        "OGUC Art. 5.3 (Separaciones entre unidades)",
      ],
      composicion: {
        estructura: 'Montantes y soleras de madera 2x3" tratada, separación máx 40cm',
        revestimiento: "Volcanita 15mm (ambas caras, fijada cada 15cm)",
        aislacion_termica: "Lana mineral 75mm (conductividad 0.040 W/mK)",
        aislacion_acustica: "Lana mineral 75mm + cámara de aire 50mm (≥ 50 dB)",
        barrera_fuego: "Barrera cortafuegos en cámara de aire (opcional pero recomendado)",
      },
      zona_termica_aplicable: {
        RM: { u_requerida: 0.6, espesor_aislacion: "75mm" },
        OHiggins: { u_requerida: 0.55, espesor_aislacion: "75mm" },
        Maule: { u_requerida: 0.55, espesor_aislacion: "85mm" },
        Biobio: { u_requerida: 0.5, espesor_aislacion: "100mm" },
      },
      advertencias: [
        "Ensaye de fuego obligatorio para F-60",
        "Certificación DOM requerida (Art. 5.3 OGUC)",
        "Informe de especialista requerido",
        "Distancia mínima a muros colindantes: 5cm según OGUC Art. 5.8",
      ],
    },
  },
}

export function getTechnicalData(type: string, fireRating: string) {
  const key = `${type}_${fireRating.toLowerCase().replace("-", "_")}`
  return technicalDatabase[type as keyof typeof technicalDatabase]?.[
    key as keyof (typeof technicalDatabase)["tabique_madera"]
  ]
}

export function getMaterialsByQuantity(baseQuantity: number, quality: "Económica" | "Estándar" | "Premium") {
  const qualityMultiplier = {
    Económica: 0.85,
    Estándar: 1.0,
    Premium: 1.15,
  }

  const multiplier = qualityMultiplier[quality]

  return [
    {
      item: 'Madera 2x3" estructural tratada',
      unit: "m",
      quantity: Math.round(50 * (baseQuantity / 20) * multiplier),
      notes: "Montantes (40cm) y soleras",
    },
    {
      item: "Volcanita 10-15mm",
      unit: "m²",
      quantity: Math.round(22 * (baseQuantity / 20) * multiplier),
      notes: "Revestimiento doble cara",
    },
    {
      item: "Lana mineral 50-75mm",
      unit: "m²",
      quantity: Math.round(20 * (baseQuantity / 20) * multiplier),
      notes: "Aislación térmica y acústica",
    },
    {
      item: 'Tornillos 1.5"',
      unit: "kg",
      quantity: Math.round(2.5 * (baseQuantity / 20) * multiplier),
      notes: "Fijación general",
    },
    {
      item: "Cinta de papel para drywall",
      unit: "m",
      quantity: Math.round(35 * (baseQuantity / 20) * multiplier),
      notes: "Sellado de uniones",
    },
  ]
}
