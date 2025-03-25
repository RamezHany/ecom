"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Menu, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const categories = [
  { name: "Wiring & Cables", href: "/products?category=wiring" },
  { name: "Switches & Outlets", href: "/products?category=switches" },
  { name: "Lighting", href: "/products?category=lighting" },
  { name: "Circuit Breakers", href: "/products?category=breakers" },
  { name: "Tools", href: "/products?category=tools" },
  { name: "Safety Equipment", href: "/products?category=safety" },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className={`sticky top-0 z-40 w-full bg-white transition-shadow ${isScrolled ? "shadow-md" : ""}`}>
      {/* Top Bar */}
      <div className="border-b bg-green-700 text-white">
        <div className="container mx-auto flex h-10 items-center justify-between px-4">
          <p className="text-sm">Free shipping on orders over $50</p>
          <div className="flex items-center space-x-4">
            <Link href="/support" className="text-sm hover:text-green-200">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="grid gap-6 py-6">
                <div className="flex items-center justify-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image
                      src="/images/asly-logo.png"
                      alt="Asly Logo"
                      width={120}
                      height={60}
                      className="h-12 w-auto"
                    />
                  </Link>
                </div>
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="flex-1"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700">
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  <div className="grid gap-1">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === "/" ? "bg-green-50 text-green-600" : "hover:bg-muted"
                        }`}
                      >
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/products"
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === "/products" ? "bg-green-50 text-green-600" : "hover:bg-muted"
                        }`}
                      >
                        All Products
                      </Link>
                    </SheetClose>
                    <div className="py-2">
                      <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Categories</p>
                      {categories.map((category) => (
                        <SheetClose key={category.href} asChild>
                          <Link
                            href={category.href}
                            className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            {category.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  {user ? (
                    <div className="grid gap-2">
                      <SheetClose asChild>
                        <Link href="/account" className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted">
                          <User className="mr-2 h-4 w-4" />
                          My Account
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <button
                          onClick={logout}
                          className="flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </button>
                      </SheetClose>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <SheetClose asChild>
                        <Link href="/auth/login">
                          <Button className="w-full bg-green-600 hover:bg-green-700">Sign In</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/auth/register">
                          <Button variant="outline" className="w-full">
                            Create Account
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/asly-logo.png"
              alt="Asly Logo"
              width={140}
              height={70}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden max-w-md flex-1 md:mx-8 md:flex">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none bg-green-600 hover:bg-green-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Desktop Nav */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex">
                    <User className="mr-2 h-5 w-5" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link href="/auth/login">
                  <User className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            )}

            <Button asChild variant="ghost" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2 hidden md:inline">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t bg-gray-100">
        <div className="container mx-auto hidden px-4 md:block">
          <nav className="flex items-center space-x-6">
            <Link
              href="/products"
              className={`py-3 text-sm font-medium hover:text-green-600 ${
                pathname === "/products" ? "text-green-600" : ""
              }`}
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className={`py-3 text-sm font-medium hover:text-green-600 ${
                  pathname === category.href ? "text-green-600" : ""
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

