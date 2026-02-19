/**
 * GUÍA DE FICHAS TÉCNICAS - TEMPLATES Y EJEMPLOS
 * 
 * Este archivo contiene ejemplos de datos bien formateados para cada tipo de producto.
 * Usa estos como referencia al completar los campos.
 */

export const TEMPLATE_EXAMPLES = {
  // ============================================================================
  // LANCHAS (Embarcaciones de usos múltiples)
  // ============================================================================
  lancha: {
    name: "Lancha Pescadora W-267BA",
    description: "Embarcación polivalente de 26.7 pies con capacidad para 7 personas",
    specs: {
      "Información adicional": "Embarcación diseñada para pesca deportiva y uso recreativo. Casco en V profundo para mejor comportamiento en aguas picadas.",
      "SKU": "W-267BA",
      "Peso": "5,500 kg",
      "Eslora": "8.13 m",
      "Manga": "2.67 m",
      "Puntal": "1.34 m",
      "Espejo 1": "2.44 m",
      "Capacidad Máxima de Carga": "1,814 kg"
    },
    variantes: [
      { modelo: "W-267BA", precio: "$125,000 USD", nota: "Precio Incluye IVA" },
      { modelo: "W-267BA Plus", precio: "$145,000 USD", nota: "Incluye equipamiento de lujo" }
    ]
  },

  // ============================================================================
  // MOTORES (Motores fuera de borda y estacionarios)
  // ============================================================================
  motor: {
    name: "Motor Yamaha F300DETX",
    description: "Motor de 4 tiempos con 300 HP de potencia, sistema de inyección de combustible",
    specs: {
      "Información adicional": "Tecnología de inyección de combustible de alta presión. Sistema DFI avanzado para mejor eficiencia y rendimiento.",
      "SKU": "F300DETX",
      "Dimensiones": "2.03 × 0.95 × 1.13 m",
      "Peso": "269 kg - 276 kg (según transmisión)",
      "Uso": "Commercial",
      "Ficha Técnica": "F300DETX / FL300DETX / F300DETU / FL300DETU",
      "Transmisión": "De paso grande",
      "Tipo de motor": "4 tiempos, 6 cilindros High Output",
      "Cilindrada": "4,169 cc",
      "Potencia Máxima": "300 HP @5,500rpm",
      "Revoluciones Máximas por Minuto": "5,000 - 6,000",
      "Sistema de Combustible": "Inyección de combustible electrónica",
      "Consumo de Combustible": "105.0 L/H @5,500 rpm",
      "Tanque de Combustible": "N/A",
      "Aceite Lubricante": "Mobil-yamaha 15W-40",
      "Capacidad del depósito de Aceite (Motor)": "6.3 Lts.",
      "Capacidad del depósito de Aceite (Transmisión)": "1,480 Lts.",
      "Sistema de Encendido": "TCI",
      "Sistema de Arranque": "Eléctrico",
      "Sistema de Dirección": "Control Remoto",
      "Sistema de Inclinación": "Power Trim",
      "Sistema de Escape": "A través de propela",
      "Altura de Transmisión o Pata": "F300DETX Super largo 25\" / FL300 DETX Super largo 25\" / F300 DETU Ultra largo 30\" / FL300 DETU Ultra largo 30\""
    },
    variantes: [
      { modelo: "F300DETX", precio: "$41,231.04 USD", nota: "Standard 25\"" },
      { modelo: "FL300DETX", precio: "$42,500 USD", nota: "Long Shaft" }
    ]
  },

  // ============================================================================
  // ACEITES LUBRICANTES (Productos químicos)
  // ============================================================================
  aceite: {
    name: "Mobil-Yamaha 15W-40",
    description: "Aceite lubricante marinero premium para motores en agua salada",
    specs: {
      "Información adicional": "Aceite marinero especialmente formulado para motores de agua salada. Proporciona máxima protección contra corrosión y oxidación.",
      "SKU": "90790-BM206",
      "Peso": "13 kg",
      "Dimensiones": "0.34 × 0.23 × 0.27 m",
      "Precauciones": "Use el producto en las proporciones indicadas\nMantengase lejos del alcance de los niños\nEn caso de ingestión no induza vómito, consulte a su médico"
    },
    variantes: [
      { modelo: "Botella 1L", precio: "$15 USD", nota: "" },
      { modelo: "Caja 12 botellas", precio: "$160 USD", nota: "Precio por caja" }
    ]
  },

  // ============================================================================
  // MOTOS ACUÁTICAS (Jet Ski, Wave Runner, Sea-Doo)
  // ============================================================================
  motoAcuatica: {
    name: "Yamaha FX Cruiser HO 2026",
    description: "Moto acuática de alto rendimiento con motor YAMAHA de 4 tiempos",
    specs: {
      "Información adicional": "Diseñada para máximo confort y rendimiento. Tecnología RIDE avanzada con estabilidad superior. Ideal para cruceros y aventuras en agua.",
      "SKU": "FX1900A-C",
      "Peso": "380 kg",
      "Dimensiones": "3.58 × 1.27 × 1.23 m",
      "Pet Name": "FX-CRUISER HO 2026",
      "Motor YAMAHA": "4 tiempos, 4 cilindros, High Output",
      "Inyección de aire": "Aspiración natural",
      "Cilindrada": "1,898 cc",
      "Casco": "NanoXcel2",
      "Reversa": "Sistema RIDE",
      "Capacidad de Combustible": "70 litros",
      "Capacidad de Aceite": "4.3 Litros",
      "Almacenamiento": "168.30 Litros",
      "Pasajeros": "1 a 3 personas",
      "Color": "Pure White - Greenish Blue, Red - Pure White",
      "Sistema de audio": "Incluido por YAMAHA"
    },
    variantes: [
      { modelo: "FX-CRUISER HO", precio: "$68,500 USD", nota: "Edición 2026" },
      { modelo: "FX-CRUISER HO Sport", precio: "$72,000 USD", nota: "Con accesorios premium" }
    ]
  },

  // ============================================================================
  // REMOLQUES (Para transporte de lanchas)
  // ============================================================================
  remolque: {
    name: "Remolque para Lancha R18",
    description: "Remolque especializado para transportar embarcaciones de 18 pies",
    specs: {
      "Información adicional": "Remolque robusto con ruedas de gran capacidad. Diseñado para máxima estabilidad en carretera.",
      "SKU": "R18",
      "Peso": "850 kg (en seco)",
      "Eslora": "6.5 m",
      "Manga": "2.5 m",
      "Puntal": "1.8 m",
      "Espejo 1": "2.0 m",
      "Capacidad Máxima de Carga": "5,000 kg"
    },
    variantes: [
      { modelo: "R18 Básico", precio: "$8,500 USD", nota: "" },
      { modelo: "R18 Premium", precio: "$10,200 USD", nota: "Con frenos hidráulicos" }
    ]
  }
};

// ============================================================================
// NOTAS IMPORTANTES:
// ============================================================================
/*
1. LANCHAS:
   - Las dimensiones debe ir en formato: Eslora × Manga × Puntal (m)
   - El peso debe incluir unidad (kg)
   - Capacidad es generalmente en kg
   - Incluir siempre "Información adicional" con descripción del uso

2. MOTORES:
   - La potencia va en HP
   - Las revoluciones en RPM
   - Capacidades en Lts. (litros)
   - Especificar si es "de paso grande" o lo que corresponda
   - Incluir modelos alternativos en variantes

3. ACEITES:
   - Peso en kg
   - Dimensiones en formato: Ancho × Profundo × Altura (m)
   - Las precauciones DEBEN incluirse en el campo correspondiente
   - Siempre especificar el tipo de aceite (viscosidad, marca)

4. MOTOS ACUÁTICAS:
   - Incluir cilindrada en cc
   - Capacidades en Litros (sin "Lts.")
   - Pasajeros como rango: "1 a 3 personas"
   - Colores separados por comas
   - El sistema de audio usually incluye marca + marca del motor

5. REMOLQUES:
   - Similares a lanchas en formato
   - Incluir capacidad de carga en kg
   - Especificar tipo de transmisión si aplica
*/
