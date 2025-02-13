import { fetchProducts } from "@/action/fetch";
import DefaultCardsSection from "@/components/defaultcardssection";

export default async function page() {
  const fetchedProducts = await fetchProducts()
  return (
    <div className="p-4">
      <DefaultCardsSection receivedProductsFromFetch = {fetchedProducts}/>
    </div>
  );
}
