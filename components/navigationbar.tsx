"use client"

import * as React from "react"
import Link from "next/link"
import { Globe, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function NavBar() {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [dates, setDates] = React.useState<{
    checkIn: Date | undefined
    checkOut: Date | undefined
  }>({
    checkIn: undefined,
    checkOut: undefined,
  })
  const [guests, setGuests] = React.useState({
    adults: 0,
    children: 0,
    infants: 0,
  })

  return (
    <nav className="border-b bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <svg className="h-8 w-auto text-[#FF385C]" fill="currentColor" viewBox="0 0 32 32">
              <path d="M16 0c2.709 0 4.907 2.198 4.907 4.907a4.907 4.907 0 01-4.907 4.907 4.907 4.907 0 01-4.907-4.907A4.907 4.907 0 0116 0zm0 9.814c2.709 0 4.907 2.198 4.907 4.907a4.907 4.907 0 01-4.907 4.907 4.907 4.907 0 01-4.907-4.907 4.907 4.907 0 014.907-4.907zm0 9.814c2.709 0 4.907 2.198 4.907 4.907A4.907 4.907 0 0116 32a4.907 4.907 0 01-4.907-4.907 4.907 4.907 0 014.907-4.907z" />
            </svg>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="font-semibold">
              Stays
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              Experiences
            </Button>
          </div>

          {/* Search Bar */}
          <div
            className={cn(
              "absolute left-1/2 top-[16%] -translate-x-1/2 -translate-y-1/2",
              "flex items-center rounded-full border shadow-sm",
              isSearchFocused && "shadow-lg ring-2 ring-primary",
            )}
          >
            {/* Where */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations"
                className="h-12 rounded-l-full border-0 bg-transparent pl-6 pr-4 text-sm focus:outline-none"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Check in */}
            <div className="border-l px-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-12 -mx-6 px-6">
                    <div className="text-left">
                      <div className="text-sm font-semibold">Check in</div>
                      <div className="text-sm text-muted-foreground">Add dates</div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dates.checkIn}
                    onSelect={(date) => setDates({ ...dates, checkIn: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check out */}
            <div className="border-l px-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-12 -mx-6 px-6">
                    <div className="text-left">
                      <div className="text-sm font-semibold">Check out</div>
                      <div className="text-sm text-muted-foreground">Add dates</div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dates.checkOut}
                    onSelect={(date) => setDates({ ...dates, checkOut: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Who */}
            <div className="border-l pl-6 pr-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-12 -mx-6 px-6">
                    <div className="text-left">
                      <div className="text-sm font-semibold">Who</div>
                      <div className="text-sm text-muted-foreground">Add guests</div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Adults</div>
                        <div className="text-sm text-muted-foreground">Ages 13 or above</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests({ ...guests, adults: Math.max(0, guests.adults - 1) })}
                        >
                          -
                        </Button>
                        <span>{guests.adults}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Children</div>
                        <div className="text-sm text-muted-foreground">Ages 2-12</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                        >
                          -
                        </Button>
                        <span>{guests.children}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests({ ...guests, children: guests.children + 1 })}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button size="icon" className="ml-2 rounded-full bg-[#FF385C] text-white hover:bg-[#FF385C]/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex hover:bg-muted rounded-full">
              Airbnb your home
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full hover:shadow-md transition-shadow duration-200">
              <Menu className="h-4 w-4 mr-2" />
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

