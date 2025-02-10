"use server"

import { Category, Product } from "@prisma/client"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const API = `${baseUrl}/api/v1/categories`
const productsAPI = `${baseUrl}/api/v1/products`
export async function fetchCategories() {
    try {
        const response = await fetch(API,{cache:"no-store"})
        const fetchedCategories = await response.json()
        return fetchedCategories.data as Category[]
    } catch (error) {
        console.log(error);
        return []    
    }
}

export async function fetchSingleCategory(id:string) {
    const singleCategoryAPI = `${baseUrl}/api/v1/categories/${id}`
    try {
        const response = await fetch(singleCategoryAPI,{cache:"no-store"})
        const singleFetchedCategory = await response.json()
             return singleFetchedCategory.data as Category & {
            products:Product[]
        }
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function fetchProducts() {
    try {
        const response = await fetch(productsAPI,{cache:"no-store"})
        const fetchedProducts = await response.json()
        return fetchedProducts.data as Product[]
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function fetchSingleProduct(slug:string) {
    try {
        const singleProductAPI = `${baseUrl}/api/v1/products/${slug}`
        const response = await fetch(singleProductAPI,{cache:"no-store"})
        const singleFetchedProduct = await response.json()
        return singleFetchedProduct.data as Product
    } catch (error) {
        console.log(error);
        return null
    }
}