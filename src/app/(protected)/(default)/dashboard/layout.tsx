import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardTopbar from '@/components/dashboard/dashboardTopbar'

import React, { ReactNode } from 'react'

export default function layout({children}:{
  children:ReactNode
}) {
  return (
    <div className="container-fluid mb-12 pt-6 lg:mb-16">

    <DashboardTopbar />
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[230px_5fr] 3xl:gap-12">
      <DashboardSidebar className="hidden xl:block" />
{children}
      </div>
      </div>
  )
}
