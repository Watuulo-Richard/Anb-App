export type CategoryType = {
    categorySlug: string;
    categoryTitle: string;
    categoryIcon: string;
}

export interface ListingFormData {
    title: string
    location: string
    description: string
    amenities: { [key: string]: boolean }  
    images: string[]
    price: number
    maxGuests: number
    availability: Date
    categoryId: string
    slug: string
  }