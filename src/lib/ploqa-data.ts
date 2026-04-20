export type RiskLevel = "low" | "medium" | "high";
export type Dimension = "habitat" | "species" | "livelihood" | "soil" | "packaging";

export interface SpeciesInfo {
  name: string;
  sci: string;
  status: string;
  note: string;
}

export interface Product {
  id: number;
  name: string;
  x: number;
  y: number;
  commodities: string[];
  source_region: string;
  risk: Record<Dimension, RiskLevel>;
  dimension_details: Record<Dimension, string>;
  species: SpeciesInfo[];
  swap_id: number | null;
  overall: RiskLevel;
  reason: string;
}

export const DIMENSIONS: { key: Dimension; label: string; emoji: string }[] = [
  { key: "habitat", label: "Habitat", emoji: "🌿" },
  { key: "species", label: "Species", emoji: "🐝" },
  { key: "livelihood", label: "Livelihood", emoji: "👥" },
  { key: "soil", label: "Soil", emoji: "🌾" },
  { key: "packaging", label: "Packaging", emoji: "📦" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Nutella",
    x: 15, y: 62,
    commodities: ["Palm oil", "Cocoa", "Sugar", "Hazelnuts"],
    source_region: "Indonesia · Côte d'Ivoire · Turkey",
    risk: { habitat: "high", species: "high", livelihood: "medium", soil: "high", packaging: "high" },
    dimension_details: {
      habitat: "Palm oil linked to 4,200 ha commodity-driven deforestation in Indonesia (Trase 2013-2022)",
      species: "Sourcing regions overlap with habitat of Sumatran Orangutan (CR) and Sunda Pangolin (CR)",
      livelihood: "4 million Indonesian smallholders depend on palm oil income",
      soil: "Palm oil monoculture depletes soil nutrients over 25-year cycle",
      packaging: "Plastic jar — not recyclable in most Swedish municipalities",
    },
    species: [
      { name: "Sumatran Orangutan", sci: "Pongo abelii", status: "CR", note: "Fewer than 14,000 remaining in Sumatra" },
      { name: "Sunda Pangolin", sci: "Manis javanica", status: "CR", note: "Most trafficked mammal, habitat cleared for plantations" },
      { name: "Western Chimpanzee", sci: "Pan troglodytes verus", status: "CR", note: "80% decline in West African cocoa regions" },
    ],
    swap_id: 2,
    overall: "high",
    reason: "Contains palm oil from high-deforestation regions plus West African cocoa",
  },
  {
    id: 2,
    name: "Garant Hazelnut Spread",
    x: 15, y: 42,
    commodities: ["Hazelnuts", "Cocoa", "Sugar"],
    source_region: "Turkey · EU",
    risk: { habitat: "low", species: "low", livelihood: "low", soil: "low", packaging: "medium" },
    dimension_details: {
      habitat: "No palm oil. Hazelnut sourcing from established Turkish orchards",
      species: "Low overlap with threatened species habitat",
      livelihood: "Turkish hazelnut farming supports stable rural employment",
      soil: "Hazelnut orchards maintain soil structure better than monoculture crops",
      packaging: "Plastic jar — moderate recyclability",
    },
    species: [],
    swap_id: null,
    overall: "low",
    reason: "Palm-oil-free alternative with lower supply chain risk",
  },
  {
    id: 3,
    name: "Lindt Excellence 85%",
    x: 52, y: 28,
    commodities: ["Cocoa", "Cocoa butter", "Sugar"],
    source_region: "Ghana · Ecuador · Madagascar",
    risk: { habitat: "medium", species: "medium", livelihood: "medium", soil: "medium", packaging: "low" },
    dimension_details: {
      habitat: "Cocoa sourced through Lindt Farming Program with partial traceability",
      species: "Sourcing regions overlap with habitat of Pygmy Hippopotamus (EN)",
      livelihood: "Lindt sources from 90,000 farmers across partner programmes",
      soil: "Mixed practices — some agroforestry, some conventional",
      packaging: "Cardboard — recyclable",
    },
    species: [
      { name: "Pygmy Hippopotamus", sci: "Choeropsis liberiensis", status: "EN", note: "Forest-dependent, habitat fragmented by farming" },
    ],
    swap_id: 4,
    overall: "medium",
    reason: "Cocoa sourcing from regions with moderate deforestation pressure",
  },
  {
    id: 4,
    name: "Ekologisk Kakao",
    x: 32, y: 72,
    commodities: ["Cocoa"],
    source_region: "Dominican Republic · Peru",
    risk: { habitat: "low", species: "low", livelihood: "low", soil: "low", packaging: "low" },
    dimension_details: {
      habitat: "Organic certified — sourced from established agroforestry systems",
      species: "Low deforestation pressure in sourcing regions",
      livelihood: "Organic premium supports higher farmer income",
      soil: "Organic certification prohibits synthetic pesticides — soil health maintained",
      packaging: "Cardboard box — fully recyclable",
    },
    species: [],
    swap_id: null,
    overall: "low",
    reason: "Organic certified cocoa from low-risk agroforestry regions",
  },
  {
    id: 5,
    name: "Toffifee",
    x: 10, y: 28,
    commodities: ["Palm oil", "Cocoa", "Hazelnuts", "Sugar"],
    source_region: "Indonesia · Côte d'Ivoire · Turkey",
    risk: { habitat: "high", species: "high", livelihood: "medium", soil: "high", packaging: "high" },
    dimension_details: {
      habitat: "Contains palm oil from high-deforestation Indonesian regions",
      species: "Combined palm oil and cocoa sourcing overlaps with 3 critically endangered species",
      livelihood: "Complex multi-commodity supply chain across 3 continents",
      soil: "Palm oil monoculture and conventional cocoa both deplete soil",
      packaging: "Plastic tray — non-recyclable",
    },
    species: [
      { name: "Sumatran Orangutan", sci: "Pongo abelii", status: "CR", note: "Habitat overlaps with palm oil concessions" },
      { name: "Western Chimpanzee", sci: "Pan troglodytes verus", status: "CR", note: "Cocoa region population declined 80%" },
    ],
    swap_id: 2,
    overall: "high",
    reason: "Palm oil plus cocoa from two high-deforestation supply chains",
  },
  {
    id: 6,
    name: "Marabou Fin 70%",
    x: 28, y: 28,
    commodities: ["Cocoa", "Sugar", "Soy lecithin"],
    source_region: "Côte d'Ivoire · Ghana · Brazil",
    risk: { habitat: "high", species: "high", livelihood: "medium", soil: "medium", packaging: "medium" },
    dimension_details: {
      habitat: "Cocoa from West Africa linked to 2,400 ha/yr commodity-driven deforestation (Trase)",
      species: "Sourcing regions overlap with Western Chimpanzee (CR) habitat",
      livelihood: "Cocoa supports 600,000 smallholder families in Côte d'Ivoire",
      soil: "Soy lecithin from Brazil — moderate pesticide use in Cerrado region",
      packaging: "Paper wrapper with foil — partially recyclable",
    },
    species: [
      { name: "Western Chimpanzee", sci: "Pan troglodytes verus", status: "CR", note: "80% decline in cocoa-growing regions" },
      { name: "Maned Wolf", sci: "Chrysocyon brachyurus", status: "NT", note: "Cerrado habitat converted for soy at 1% per year" },
    ],
    swap_id: 4,
    overall: "high",
    reason: "West African cocoa and Brazilian soy in supply chain",
  },
  {
    id: 7,
    name: "Gevalia Mellanrost",
    x: 30, y: 15,
    commodities: ["Coffee"],
    source_region: "Brazil · Colombia · Ethiopia",
    risk: { habitat: "medium", species: "medium", livelihood: "medium", soil: "medium", packaging: "medium" },
    dimension_details: {
      habitat: "Conventional coffee — mixed sun-grown and shade-grown sourcing",
      species: "Coffee regions overlap with habitat of Ethiopian Wolf (EN)",
      livelihood: "Coffee supports 15 million farming families globally",
      soil: "Conventional farming uses moderate pesticide inputs",
      packaging: "Vacuum-sealed plastic and foil — not recyclable",
    },
    species: [
      { name: "Ethiopian Wolf", sci: "Canis simensis", status: "EN", note: "Fewer than 500 remaining in Ethiopian highlands" },
    ],
    swap_id: 8,
    overall: "medium",
    reason: "Conventional coffee sourcing with moderate biodiversity pressure",
  },
  {
    id: 8,
    name: "Löfbergs Organic",
    x: 75, y: 55,
    commodities: ["Coffee"],
    source_region: "Peru · Honduras · Ethiopia",
    risk: { habitat: "low", species: "low", livelihood: "low", soil: "low", packaging: "low" },
    dimension_details: {
      habitat: "Organic certified — shade-grown practices maintain forest canopy",
      species: "Shade-grown coffee supports 40+ bird species per hectare",
      livelihood: "Organic and Fairtrade premiums support higher farmer income",
      soil: "No synthetic pesticides — soil biology maintained",
      packaging: "Paper packaging — recyclable",
    },
    species: [],
    swap_id: null,
    overall: "low",
    reason: "Organic shade-grown coffee with Fairtrade certification",
  },
];

const SCORE: Record<RiskLevel, number> = { low: 0, medium: 1, high: 2 };

export function calcRisk(
  product: Product,
  active: Record<Dimension, boolean>,
): { level: RiskLevel; opacity: number; avg: number } {
  const activeKeys = (Object.keys(active) as Dimension[]).filter((k) => active[k]);
  if (activeKeys.length === 0) return { level: "low", opacity: 1, avg: 0 };
  const avg = activeKeys.reduce((s, k) => s + SCORE[product.risk[k]], 0) / activeKeys.length;
  if (avg < 0.7) return { level: "low", opacity: 1, avg };
  if (avg < 1.4) return { level: "medium", opacity: 0.65, avg };
  return { level: "high", opacity: 0.35, avg };
}

export const RISK_COLORS: Record<RiskLevel, { ring: string; bg: string; text: string }> = {
  low: { ring: "#2d6a2d", bg: "#e8f5e9", text: "#2d6a2d" },
  medium: { ring: "#e8a020", bg: "#fff8e1", text: "#8a5e0a" },
  high: { ring: "#d85a30", bg: "#fde8e0", text: "#a8431f" },
};
