"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"

// Define category-specific filters
const categoryFilters = {
  wiring: {
    types: [
      { id: "romex", name: "Romex" },
      { id: "thhn", name: "THHN" },
      { id: "uf", name: "UF Cable" },
      { id: "mc", name: "MC Cable" },
      { id: "ser", name: "SER Cable" },
    ],
    gauges: [
      { id: "14", name: "14 AWG" },
      { id: "12", name: "12 AWG" },
      { id: "10", name: "10 AWG" },
      { id: "8", name: "8 AWG" },
      { id: "6", name: "6 AWG" },
    ],
  },
  switches: {
    types: [
      { id: "toggle", name: "Toggle Switches" },
      { id: "rocker", name: "Rocker Switches" },
      { id: "dimmer", name: "Dimmers" },
      { id: "smart", name: "Smart Switches" },
      { id: "gfci", name: "GFCI Outlets" },
    ],
    ratings: [
      { id: "15a", name: "15 Amp" },
      { id: "20a", name: "20 Amp" },
      { id: "30a", name: "30 Amp" },
    ],
  },
  lighting: {
    types: [
      { id: "recessed", name: "Recessed" },
      { id: "track", name: "Track Lighting" },
      { id: "flood", name: "Flood Lights" },
      { id: "strip", name: "LED Strips" },
      { id: "fixtures", name: "Fixtures" },
    ],
    wattage: [
      { id: "low", name: "Under 10W" },
      { id: "medium", name: "10-30W" },
      { id: "high", name: "Over 30W" },
    ],
  },
  breakers: {
    types: [
      { id: "standard", name: "Standard" },
      { id: "gfci", name: "GFCI" },
      { id: "afci", name: "AFCI" },
      { id: "dual", name: "Dual Function" },
      { id: "main", name: "Main Breakers" },
    ],
    amperage: [
      { id: "15a", name: "15 Amp" },
      { id: "20a", name: "20 Amp" },
      { id: "30a", name: "30 Amp" },
      { id: "50a", name: "50 Amp" },
      { id: "100a", name: "100 Amp" },
    ],
  },
  tools: {
    types: [
      { id: "hand", name: "Hand Tools" },
      { id: "power", name: "Power Tools" },
      { id: "testers", name: "Testers & Meters" },
      { id: "strippers", name: "Wire Strippers" },
      { id: "crimpers", name: "Crimpers" },
    ],
    brands: [
      { id: "klein", name: "Klein Tools" },
      { id: "fluke", name: "Fluke" },
      { id: "milwaukee", name: "Milwaukee" },
      { id: "dewalt", name: "DeWalt" },
      { id: "greenlee", name: "Greenlee" },
    ],
  },
  safety: {
    types: [
      { id: "gloves", name: "Insulated Gloves" },
      { id: "glasses", name: "Safety Glasses" },
      { id: "helmets", name: "Hard Hats" },
      { id: "mats", name: "Insulating Mats" },
      { id: "lockout", name: "Lockout/Tagout" },
    ],
    ratings: [
      { id: "class00", name: "Class 00 (500V)" },
      { id: "class0", name: "Class 0 (1000V)" },
      { id: "class1", name: "Class 1 (7500V)" },
      { id: "class2", name: "Class 2 (17000V)" },
    ],
  },
}

const brands = [
  { id: "asly", name: "Asly" },
  { id: "electra", name: "Electra" },
  { id: "powertech", name: "PowerTech" },
  { id: "voltmaster", name: "VoltMaster" },
  { id: "circuitpro", name: "CircuitPro" },
]

interface ProductFiltersProps {
  category?: string | null
}

export default function ProductFilters({ category }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedSpecificFilters, setSelectedSpecificFilters] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [inStock, setInStock] = useState(false)

  // Get the appropriate filters based on category
  const getCategorySpecificFilters = () => {
    if (!category || !categoryFilters[category as keyof typeof categoryFilters]) {
      return { types: [], specificFilters: [] }
    }

    const categoryData = categoryFilters[category as keyof typeof categoryFilters]
    return {
      types: categoryData.types || [],
      specificFilters: Object.keys(categoryData)
        .filter((key) => key !== "types")
        .map((key) => {
          return {
            name: key.charAt(0).toUpperCase() + key.slice(1),
            options: categoryData[key as keyof typeof categoryData],
          }
        }),
    }
  }

  const { types, specificFilters } = getCategorySpecificFilters()

  const handleTypeChange = (typeId: string, checked: boolean) => {
    setSelectedTypes((prev) => (checked ? [...prev, typeId] : prev.filter((id) => id !== typeId)))
  }

  const handleSpecificFilterChange = (filterId: string, checked: boolean) => {
    setSelectedSpecificFilters((prev) => (checked ? [...prev, filterId] : prev.filter((id) => id !== filterId)))
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    setSelectedBrands((prev) => (checked ? [...prev, brandId] : prev.filter((id) => id !== brandId)))
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const applyFilters = () => {
    // In a real app, this would update the URL with all filter parameters
    // For this demo, we'll just simulate filtering
    console.log("Applied filters:", {
      priceRange,
      selectedTypes,
      selectedSpecificFilters,
      selectedBrands,
      inStock,
    })
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedTypes([])
    setSelectedSpecificFilters([])
    setSelectedBrands([])
    setInStock(false)
  }

  return (
    <div className="space-y-6 rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="h-8 text-sm text-muted-foreground hover:text-foreground"
        >
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "types", "brands", "availability"]}>
        {types.length > 0 && (
          <AccordionItem value="types">
            <AccordionTrigger>Types</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {types.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                    />
                    <Label htmlFor={`type-${type.id}`} className="text-sm font-normal">
                      {type.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {specificFilters.map((filter, index) => (
          <AccordionItem key={index} value={`specific-${index}`}>
            <AccordionTrigger>{filter.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${filter.name.toLowerCase()}-${option.id}`}
                      checked={selectedSpecificFilters.includes(option.id)}
                      onCheckedChange={(checked) => handleSpecificFilterChange(option.id, checked as boolean)}
                    />
                    <Label htmlFor={`${filter.name.toLowerCase()}-${option.id}`} className="text-sm font-normal">
                      {option.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStock}
                  onCheckedChange={(checked) => setInStock(checked as boolean)}
                />
                <Label htmlFor="in-stock" className="text-sm font-normal">
                  In Stock Only
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full bg-green-600 hover:bg-green-700">
        Apply Filters
      </Button>
    </div>
  )
}

