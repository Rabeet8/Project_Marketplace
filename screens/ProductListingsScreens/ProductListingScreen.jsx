import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import ProductListing from './ProductListing'
import Header from '../HomeScreen/Header'

const ProductListingScreen = () => {
  return (
    <>
    <Header />
    <ScrollView>
    <ProductListing
    title="Dell i5 Laptop"
    price="46,000"
    location="Karachi"
    daysAgo={3}
    expiryDays={15}
  />
  <ProductListing
    title="1st Copy Apple Airpods"
    price="3,000"
    location="Multan"
    daysAgo={3}
    expiryDays={15}
  />
  <ProductListing
    title="Zero Lifestyle Headphones"
    price="8,500"
    location="Lahore"
    daysAgo={3}
    expiryDays={15}
  />
  </ScrollView>
  </>
  )
}
export default ProductListingScreen