import { apiFetch } from "../../../../lib/apiFetch";
import { type AdminDashboardData, type MarketAnalytics, type ProductAnalytics, type ShopAnalytics, type TopMarket, type TopMarketDetails, type TopProduct, type TopProductDetails, type TopShop, type TopShopDetails } from "../types";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const BASE_URL = `${API_ROOT}/admin/dashboard`;


export const getAdminDashboard = async (): Promise<AdminDashboardData> => {

  return apiFetch<AdminDashboardData>(
    `${BASE_URL}`, 
    {
      method: 'GET'
    }
  )
}

export const getTopProductsList = async (limit = 20): Promise<TopProduct[]> => {

  return apiFetch<TopProduct[]>(
    `${BASE_URL}/topProducts?limit=${limit}`, 
    {
      method: 'GET'
    }
  )
}

export const getTopProductDetails = async (id: string): Promise<TopProductDetails> => {

  return apiFetch<TopProductDetails>(
    `${BASE_URL}/topProducts/${id}`, 
    {
      method: 'GET'
    }
  )
}


export const getProductAnalytics = async (productId: string): Promise<ProductAnalytics> => {

  return apiFetch<ProductAnalytics>(
    `${BASE_URL}/topProducts/${productId}/analytics`, 
    {
      method: 'GET'
    }
  )
}


export const getTopShopsList = async (limit = 20): Promise<TopShop[]> => {

  return apiFetch<TopShop[]>(
    `${BASE_URL}/topShops?limit=${limit}`, 
    {
      method: 'GET'
    }
  )
}


export const getTopShopDetails = async (id: string): Promise<TopShopDetails> => {

  return apiFetch<TopShopDetails>(
    `${BASE_URL}/topShops/${id}`, 
    {
      method: 'GET'
    }
  )
}


export const getShopAnalytics = async (shopId: string): Promise<ShopAnalytics> => {

  console.log("youpi")
  return apiFetch<ShopAnalytics>(
    `${BASE_URL}/topShops/${shopId}/analytics`, 
    {
      method: 'GET'
    }
  )
}


export const getTopMarketsList = async (limit = 20): Promise<TopMarket[]> => {

  return apiFetch<TopMarket[]>(
    `${BASE_URL}/topMarkets?limit=${limit}`, 
    {
      method: 'GET'
    }
  )
}


export const getTopMarketDetails = async (id: string): Promise<TopMarketDetails> => {

  return apiFetch<TopMarketDetails>(
    `${BASE_URL}/topMarkets/${id}`, 
    {
      method: 'GET'
    }
  )
}


export const getMarketAnalytics = async (marketId: string): Promise<MarketAnalytics> => {

  return apiFetch<MarketAnalytics>(
    `${BASE_URL}/topMarkets/${marketId}/analytics`, 
    {
      method: 'GET'
    }
  )
}