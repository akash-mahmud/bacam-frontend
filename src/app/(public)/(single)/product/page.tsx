import Filter from '@/components/product/filter'
import FilterTopbar from '@/components/product/filter-topbar'
import Products from '@/components/product/products'
import React from 'react'

export default function page() {
  return (
    <>

      <div className="container-fluid mb-12 pt-6 lg:mb-16">

        <FilterTopbar />
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[330px_5fr] 3xl:gap-12">
          <Filter className="hidden xl:block" />
          <Products />
        </div>
      </div>
    </>
  )
}
