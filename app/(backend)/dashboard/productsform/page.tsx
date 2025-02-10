import { fetchCategories } from '@/action/fetch'
import ListingForm from '@/components/backendcomponents/listingform'
import React from 'react'

export default async function page() {
    const fetchedCategories = await fetchCategories() || []
    // const fetchedProducts = await fetchProducts() || []
    // console.log(fetchedProducts);
  return (
    <div>
        <ListingForm receivedCategoriesFromFetch={fetchedCategories}/>
    </div>
  )
}
