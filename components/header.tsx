import React from 'react'
import { CategoryNav } from './categorysection'
import { fetchCategories } from "@/action/fetch";
export default async function Header() {
    const fetchedCategories = await fetchCategories()
        console.log(fetchedCategories);
        return (
            <div className=''>
                <CategoryNav receivedCategoriesFromFetch = {fetchedCategories}/>
            </div>
        )
}
