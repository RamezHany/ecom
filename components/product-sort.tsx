"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"

export default function ProductSort() {
  const [sortOption, setSortOption] = useState("featured")

  const handleSortChange = (value: string) => {
    setSortOption(value)
    // In a real app, this would trigger a re-sort of the products
  }

  return (
    <div className="flex items-center">
      <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
      <Select value={sortOption} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

