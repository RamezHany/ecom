"use client"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { toast } = useToast()

  const subtotal = cart.reduce(
    (total, item) => total + (item.product.onSale ? item.product.salePrice : item.product.price) * item.quantity,
    0,
  )

  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="hidden border-b p-4 sm:grid sm:grid-cols-6">
              <div className="col-span-3 font-medium">Product</div>
              <div className="col-span-1 text-center font-medium">Price</div>
              <div className="col-span-1 text-center font-medium">Quantity</div>
              <div className="col-span-1 text-right font-medium">Total</div>
            </div>

            {cart.map((item) => {
              const price = item.product.onSale ? item.product.salePrice : item.product.price
              const itemTotal = price * item.quantity

              return (
                <div key={item.product.id} className="grid grid-cols-1 border-b p-4 sm:grid-cols-6 sm:items-center">
                  <div className="col-span-3 flex items-center gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link href={`/products/${item.product.id}`} className="hover:text-green-600">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.product.category}</p>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="mt-1 flex items-center text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 mt-4 text-center sm:mt-0">
                    {item.product.onSale ? (
                      <div>
                        <span className="font-medium">${item.product.salePrice.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium">${item.product.price.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="col-span-1 mt-4 flex justify-center sm:mt-0">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-l border border-r-0 bg-muted hover:bg-muted/80"
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity} readOnly className="h-8 w-10 border text-center" />
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-r border border-l-0 bg-muted hover:bg-muted/80"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 mt-4 text-right font-medium sm:mt-0">${itemTotal.toFixed(2)}</div>
                </div>
              )
            })}

            <div className="flex justify-between p-4">
              <Button variant="outline" onClick={clearCart} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6 border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-4 text-center text-xs text-muted-foreground">Secure checkout powered by Stripe</div>
          </div>
        </div>
      </div>
    </div>
  )
}

