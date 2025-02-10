import { fetchProducts } from '@/action/fetch'
import CarouselCardSection from '@/components/backendcomponents/carouselcardsection'
import React from 'react'

export default async function page() {
    const fetchedProducts = await fetchProducts() || []
  return (
    <div className='p-4'>
        <CarouselCardSection receivedProductsFromFetch={fetchedProducts}/>
    </div>
  )
}
