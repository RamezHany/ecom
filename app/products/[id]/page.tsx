"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import ProductCarousel from "@/components/product-carousel"
import { mockProducts } from "@/lib/mock-data"
import { toast } from "@/components/ui/use-toast"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Find product by ID from mock data
  const product = mockProducts.find((p) => p.id === params.id) || mockProducts[0]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    })
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number.parseInt(e.target.value))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 text-sm breadcrumbs">
        <ul className="flex gap-2 text-muted-foreground">
          <li>
            <Link href="/">Home</Link> /
          </li>
          <li>
            <Link href="/products">Products</Link> /
          </li>
          <li>
            <Link href={`/products?category=${product.category}`}>{product.category}</Link> /
          </li>
          <li className="font-medium text-foreground">{product.name}</li>
        </ul>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <div className="mb-4 overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`min-w-[80px] overflow-hidden rounded border p-1 ${
                  selectedImage === index ? "border-green-600" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="h-auto w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2">
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
            <span className="font-medium">Professional Grade</span> - Designed for electricians and contractors
          </div>

          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          <div className="mb-6">
            {product.onSale ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-green-600">${product.salePrice.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">SALE</span>
              </div>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Technical Specifications Highlight */}
          <div className="mb-6 rounded-lg border bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold">Technical Specifications</h3>
            <div className="grid grid-cols-2 gap-2">
              {product.specifications?.slice(0, 4).map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{spec.name}:</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mb-6 text-muted-foreground">{product.description}</p>

          <div className="mb-6 grid gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="rounded-md border border-input bg-background px-3 py-1"
                  disabled={!product.inStock}
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <Truck className="h-5 w-5 text-green-600" />
              <div className="text-sm">
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div className="text-sm">
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-muted-foreground">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <RotateCcw className="h-5 w-5 text-green-600" />
              <div className="text-sm">
                <p className="font-medium">30 Day Returns</p>
                <p className="text-muted-foreground">Hassle-free returns</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="specifications">
            <TabsList className="w-full">
              <TabsTrigger value="specifications" className="flex-1">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="description" className="flex-1">
                Full Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="mt-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b py-2">
                    <span className="font-medium">{spec.name}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none">
                <p>{product.fullDescription || product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {product.reviews?.map((review, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
        <ProductCarousel category={product.category} exclude={product.id} />
      </section>
    </div>
  )
}

