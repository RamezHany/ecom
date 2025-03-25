import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HardHat } from "lucide-react"

interface PromoBannerProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export default function PromoBanner({ title, description, buttonText, buttonLink }: PromoBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-800 to-green-600 p-6 text-white shadow-md">
      <div className="relative z-10 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center">
          <div className="mr-4 hidden rounded-full bg-white/20 p-3 md:block">
            <HardHat className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-bold">{title}</h3>
            <p className="text-green-100">{description}</p>
          </div>
        </div>
        <Button asChild className="bg-white text-green-700 hover:bg-green-50">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10"></div>
    </div>
  )
}

