/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Heart, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

export default function PropertyCard({product}:{product:Product | null} ) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  return (
    <Card
      className="relative w-full max-w-[300px] overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Labels */}
      <div className="absolute left-3 top-3 z-10">
        <span className="rounded-full bg-white px-4 py-1 text-sm font-medium">Guest favorite</span>
      </div>

      <button
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 transition-transform hover:scale-110"
        aria-label="Add to favorites"
      >
        <Heart className="h-5 w-5" />
      </button>

      {/* Image Carousel */}
      <Carousel className="w-full">
        <CarouselContent>
          {product?.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Property view ${index + 1}`}
                  className="h-full w-full object-cover"
                  width={500}
                  height={300}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className={`transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <CarouselPrevious className="absolute left-2 top-[45%] z-10" />
          <CarouselNext className="absolute right-2 top-[45%] z-10" />
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {product?.images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                currentImageIndex === index ? "w-2 bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </Carousel>

      {/* Content */}
      <div className="space-y-1 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{product?.location}</h3>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
            >
                <Link href={`/dashboard/productsform/${product?.slug}`}>
                    <Edit2 className="h-4 w-4" />
                </Link>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
            {product?.availability 
            ? new Date(product?.availability).toLocaleDateString()
            : ''}
            {/* {product?.availability.toISOString()} */}
        </p>
        <p className="pt-1">
          <span className="font-semibold">USh{product?.price}</span>
          <span className="text-gray-600"> night</span>
        </p>
      </div>
    </Card>
  )
}

