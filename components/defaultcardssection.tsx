import { Product } from '@prisma/client'
import React from 'react'
import { DefaultCard } from './defaultcard'

export default function DefaultCardsSection({receivedProductsFromFetch}:{receivedProductsFromFetch:Product[]}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
        {
            receivedProductsFromFetch.map((product, index)=>{
                return (
                    <div key={index} className="">
                        <DefaultCard key={product.id} receivedProductFromFetch = {product}/>
                    </div>
                )
            })
        }
    </div>
  )
}
