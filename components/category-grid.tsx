import Link from "next/link"
import Image from "next/image"
import { Zap, Lightbulb, ToggleLeft, Wrench, Shield, Cable } from "lucide-react"

const categories = [
  {
    name: "Wiring & Cables",
    icon: <Cable className="h-10 w-10 text-green-600" />,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop",
    href: "/products?category=wiring",
    description: "Romex, THHN, UF, MC cables",
  },
  {
    name: "Switches & Outlets",
    icon: <ToggleLeft className="h-10 w-10 text-green-600" />,
    image: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2070&auto=format&fit=crop",
    href: "/products?category=switches",
    description: "GFCI, toggle, smart switches",
  },
  {
    name: "Lighting",
    icon: <Lightbulb className="h-10 w-10 text-green-600" />,
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2074&auto=format&fit=crop",
    href: "/products?category=lighting",
    description: "LED, recessed, fixtures",
  },
  {
    name: "Circuit Breakers",
    icon: <Zap className="h-10 w-10 text-green-600" />,
    image: "https://images.unsplash.com/photo-1652474616995-a5eb4c2f3751?q=80&w=1974&auto=format&fit=crop",
    href: "/products?category=breakers",
    description: "AFCI, GFCI, standard breakers",
  },
  {
    name: "Tools",
    icon: <Wrench className="h-10 w-10 text-green-600" />,
    image: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?q=80&w=2070&auto=format&fit=crop",
    href: "/products?category=tools",
    description: "Testers, strippers, pliers",
  },
  {
    name: "Safety Equipment",
    icon: <Shield className="h-10 w-10 text-green-600" />,
    image: "https://images.unsplash.com/photo-1618090584176-7132b9911657?q=80&w=1974&auto=format&fit=crop",
    href: "/products?category=safety",
    description: "Gloves, glasses, lockout/tagout",
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="group relative flex flex-col items-center overflow-hidden rounded-lg border bg-white transition-all hover:border-green-200 hover:shadow-md"
        >
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/20"></div>
          </div>
          <div className="flex flex-1 flex-col items-center p-4">
            <div className="mb-2 rounded-full bg-green-50 p-2">{category.icon}</div>
            <h3 className="mb-1 text-center font-medium">{category.name}</h3>
            <p className="text-center text-xs text-muted-foreground">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

