// import Image from "next/image";

import { fetchCategories } from "@/action/fetch";
import { CategoryNav } from "@/components/categorysection";

export default async function page() {
  const fetchedCategories = await fetchCategories()
  return (
    <>
      {/* <NavBar /> */}
      <CategoryNav receivedCategoriesFromFetch = {fetchedCategories}/>
    </>
  );
}
