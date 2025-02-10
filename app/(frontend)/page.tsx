// import Image from "next/image";

import { fetchCategories } from "@/action/fetch";
import { CategoryNav } from "@/components/categorysection";
// import FrontViewCardSection from "@/components/frontviewcardsection";

export default async function page() {
  const fetchedCategories = await fetchCategories()
  // const fetchedProducts = await fetchProducts()
  return (
    <>
      {/* <NavBar /> */}
      <CategoryNav receivedCategoriesFromFetch = {fetchedCategories}/>
      {/* <FrontViewCardSection receivedProductsFromFetch = {fetchedProducts}/> */}
    </>
  );
}
