import React from 'react'
import PropertyCard from './card'
import { Product } from '@prisma/client'

export default function CarouselCardSection({receivedProductsFromFetch}:{receivedProductsFromFetch:Product[]}) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-6 gap-2'>
        {
            receivedProductsFromFetch.map((product, index)=>{
                return (
                    <PropertyCard key={index} product={product}/>
                )
            })
        }
    </div>
  )
}
