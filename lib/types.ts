export interface Product {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  salePrice?: number
  onSale: boolean
  category: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  featured?: boolean
  isNew?: boolean
  isBestseller?: boolean
  specifications?: { name: string; value: string }[]
  reviews?: {
    author: string
    rating: number
    date: string
    content: string
  }[]
}

