"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      <div className="absolute left-0 top-0 z-10 flex flex-col gap-1 p-2">
        {product.onSale && (
          <Badge variant="destructive" className="px-2 py-1">
            SALE
          </Badge>
        )}
        {product.isNew && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            NEW
          </Badge>
        )}
        {product.isBestseller && (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            BESTSELLER
          </Badge>
        )}
      </div>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-1 text-sm font-medium text-muted-foreground capitalize">{product.category}</h3>
          <h2 className="mb-2 line-clamp-2 min-h-[2.5rem] text-base font-semibold">{product.name}</h2>

          {/* Technical specs summary - Added for electricians */}
          <div className="mb-2 rounded-md bg-gray-50 p-2 text-xs">
            {product.specifications &&
              product.specifications.slice(0, 2).map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{spec.name}:</span>
                  <span>{spec.value}</span>
                </div>
              ))}
          </div>

          <div className="mb-2 flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="mb-4 flex items-center">
            {product.onSale ? (
              <>
                <span className="text-lg font-bold text-green-600">${product.salePrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </Link>
    </div>
  )
}

