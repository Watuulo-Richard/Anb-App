"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

export function CategoryNav({receivedCategoriesFromFetch}:{receivedCategoriesFromFetch?:Category[]}) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
    }
  }

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      checkScroll()
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [scrollContainerRef]) // Added scrollContainerRef to dependencies

  return (
    <div className="relative border-b">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <div className="relative flex-1">
            {canScrollLeft && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10 h-full rounded-none bg-gradient-to-r from-background to-background/50"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {receivedCategoriesFromFetch?.map((category) => (
                <button
                  key={category.categoryTitle}
                  onClick={() => setActiveCategory(category.categoryTitle)}
                  className={cn(
                    "group flex min-w-fit flex-col items-center gap-2 border-b-2 border-transparent pb-2 transition-all",
                    activeCategory === category.categoryTitle && "border-neutral-950",
                  )}
                >
                    <Link href={`/${category.id}`}>
                        <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                            <div className="w-8">
                                <Image className="w-full object-contain" src={category.categoryIcon} alt={category.categoryTitle} width={500} height={300}/>
                            </div>
                        </span>
                        <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-950">
                            {category.categoryTitle}
                        </span>
                    </Link>
                </button>
              ))}
            </div>

            {canScrollRight && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 z-10 h-full rounded-none bg-gradient-to-l from-background to-background/50"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="ml-6 flex items-center gap-4 border-l pl-6">
            <Button variant="outline" className="gap-2">
              <Settings2 className="h-4 w-4" />
              Filters
            </Button>
            <div className="hidden items-center gap-2 lg:flex">
              <span className="text-sm">Display total before taxes</span>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

