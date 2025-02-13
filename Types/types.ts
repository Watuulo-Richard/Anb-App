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

  export type RegisterInputTypes = {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    profileImage: string;
  };

  export type LoginInputTypes = {
    email: string;
    password: string;
  };

  export type PayloadTypes = {
    userId: string
    email: string
    phone: string
    image: string
    expiresAt: Date
  };