import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image src="/images/asly-logo.png" alt="Asly Logo" width={120} height={60} className="h-12 w-auto" />
            </Link>
            <p className="mb-4 text-muted-foreground">
              Your trusted source for quality electrical supplies. We provide professional-grade products for
              electricians and contractors.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-green-600">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-green-600">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-green-600">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=wiring" className="text-muted-foreground hover:text-green-600">
                  Wiring & Cables
                </Link>
              </li>
              <li>
                <Link href="/products?category=switches" className="text-muted-foreground hover:text-green-600">
                  Switches & Outlets
                </Link>
              </li>
              <li>
                <Link href="/products?category=lighting" className="text-muted-foreground hover:text-green-600">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/products?category=breakers" className="text-muted-foreground hover:text-green-600">
                  Circuit Breakers
                </Link>
              </li>
              <li>
                <Link href="/products?category=tools" className="text-muted-foreground hover:text-green-600">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/products?category=safety" className="text-muted-foreground hover:text-green-600">
                  Safety Equipment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-green-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-green-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-muted-foreground">123 Electrical Avenue, Circuit City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-muted-foreground">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-muted-foreground">support@asly.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Asly Electrical Supplies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

