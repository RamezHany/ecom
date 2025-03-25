import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import ProductCarousel from "@/components/product-carousel"
import CategoryGrid from "@/components/category-grid"
import PromoBanner from "@/components/promo-banner"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Search */}
      <div className="relative mb-8 overflow-hidden rounded-lg bg-gradient-to-r from-green-800 to-green-600 p-8 text-white">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold">Professional Electrical Supplies</h1>
          <p className="mb-6 text-lg">Quality products for electricians and contractors</p>
          <div className="relative">
            <Input type="text" placeholder="Search for products..." className="h-12 bg-white pl-4 pr-12 text-black" />
            <Button
              size="icon"
              className="absolute right-0 top-0 h-12 w-12 rounded-l-none bg-green-600 hover:bg-green-700"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
          alt="Electrical supplies background"
          fill
          className="absolute inset-0 object-cover opacity-20"
        />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10"></div>
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10"></div>
      </div>

      {/* Featured Categories */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
        <CategoryGrid />
      </section>

      {/* Promotional Banner */}
      <section className="mb-12">
        <PromoBanner
          title="Professional Electrician Discount"
          description="Register your business account for special pricing"
          buttonText="Learn More"
          buttonLink="/business-accounts"
        />
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products?featured=true" className="text-green-600 hover:underline">
            View All
          </Link>
        </div>
        <ProductCarousel category="featured" />
      </section>

      {/* New Arrivals */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link href="/products?new=true" className="text-green-600 hover:underline">
            View All
          </Link>
        </div>
        <ProductCarousel category="new" />
      </section>

      {/* Best Sellers */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link href="/products?bestsellers=true" className="text-green-600 hover:underline">
            View All
          </Link>
        </div>
        <ProductCarousel category="bestsellers" />
      </section>

      {/* Trust Badges */}
      <section className="mb-12 rounded-lg border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 rounded-full bg-green-50 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Same-day shipping on orders before 2PM</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 rounded-full bg-green-50 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">Quality Guarantee</h3>
            <p className="text-sm text-muted-foreground">All products meet or exceed industry standards</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 rounded-full bg-green-50 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">Multiple payment options with encryption</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 rounded-full bg-green-50 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Technical assistance whenever you need it</p>
          </div>
        </div>
      </section>
    </div>
  )
}

