import { fetchCategories, fetchSingleProduct } from '@/action/fetch';
import ListingForm from '@/components/backendcomponents/listingform';
import React from 'react'

export default async function page({params}:{params:Promise<{slug:string}>}) {
    const {slug} = await params
    console.log(slug);
    const singleFetchedProduct = await fetchSingleProduct(slug)
        const fetchedCategories = await fetchCategories() || []
    
    console.log(singleFetchedProduct);
  return (
    <div>
        <ListingForm receivedSingleProductFromFetch={singleFetchedProduct} receivedCategoriesFromFetch={fetchedCategories}/>
    </div>
  )
}
