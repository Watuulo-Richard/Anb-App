import { fetchSingleCategory } from '@/action/fetch';
import { FrontViewCard } from '@/components/frontviewcard';
import React from 'react'

export default async function page({params}:{params:Promise<{id:string}>}) {
    const {id} = await params
    console.log(id);
    const singleFetchedCategory = await fetchSingleCategory(id)
    console.log(singleFetchedCategory?.products);
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
        {/* <FrontViewCardSection receivedCategoriesFromFetch = {singleFetchedCategory} /> */}
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
