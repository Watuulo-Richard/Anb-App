"use client"
import * as React from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Product } from "@prisma/client"

export function FrontViewCard({productsDataFromFetch}:{productsDataFromFetch:Product}) {
  const [currentImage, setCurrentImage] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFavorited, setIsFavorited] = React.useState(false)

  // Autoplay functionality
  React.useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % productsDataFromFetch.images.length)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [isHovered, productsDataFromFetch.images.length])

  return (
    <Card
      className="group relative overflow-hidden rounded-xl transition-shadow hover:shadow-lg max-w-[350px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel */}
      <div className="relative aspect-square overflow-hidden">
        {productsDataFromFetch.images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentImage ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Listing image ${index + 1}`}
              className="h-full w-full object-cover"
              width={500}
              height={300}
            />
          </div>
        ))}

        {/* Guest Favorite Badge */}
        {/* {isGuestFavorite && (
          <Badge className="absolute left-3 top-3 z-10 bg-white/90 text-black" variant="secondary">
            Guest favorite
          </Badge>
        )} */}

        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100",
            isFavorited && "text-red-500",
          )}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
        </Button>

        {/* Navigation Buttons */}
        <div
          className={cn(
            "absolute inset-x-3 top-1/2 z-10 flex -translate-y-1/2 justify-between opacity-0 transition-opacity",
            isHovered && "opacity-100",
          )}
        >
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/90"
            onClick={() => setCurrentImage((prev) => (prev - 1 + productsDataFromFetch.images.length) % productsDataFromFetch.images.length)}
          >
            ←
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/90"
            onClick={() => setCurrentImage((prev) => (prev + 1) % productsDataFromFetch.images.length)}
          >
            →
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1">
          {productsDataFromFetch.images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-white/80 transition-all",
                index === currentImage ? "w-4" : "opacity-60",
              )}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{productsDataFromFetch.location}</h3>
            <p className="text-sm text-muted-foreground">{productsDataFromFetch.title}</p>
            <p className="text-sm text-muted-foreground">{productsDataFromFetch.availability 
            ? new Date(productsDataFromFetch.availability).toLocaleDateString()
            : ''}</p>
          </div>
          <div className="flex items-center gap-1">
            <span>★</span>
            {/* <span>{productsDataFromFetch.}</span> */}
          </div>
        </div>
        <p className="mt-2">
          <span className="font-semibold">{productsDataFromFetch.price}</span>
          <span className="text-muted-foreground"> night</span>
        </p>
      </div>
    </Card>
  )
}

