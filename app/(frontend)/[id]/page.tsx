import { fetchSingleCategory } from '@/action/fetch';
import { FrontViewCard } from '@/components/frontviewcard';
import React from 'react'

export default async function page({params}:{params:Promise<{id:string}>}) {
    const {id} = await params
  
    const singleFetchedCategory = await fetchSingleCategory(id)
  return (
    <div className='grid grid-cols-2 md:grid-cols-6 gap-2 px-12 py-4'>
        {
          singleFetchedCategory?.products.map((prod)=>{
            return(
              <FrontViewCard key={prod.id} productsDataFromFetch={prod}/>
            )
          })
        }
    </div>
  )
}
