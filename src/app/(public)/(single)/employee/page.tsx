'use client'
import EmployeeCard from '@/components/ui/cards/EmployeeCard';
import { useEmployeeByCategoryQuery } from '@/graphql/generated/schema';
import React from 'react';

export default function page() {
  const { data } = useEmployeeByCategoryQuery({

  });
  const employeeBycategories = data?.employeeCategories;
  return (
    <div >
      {employeeBycategories?.map((category) => (
        category?.employee?.length&&
        <div className=' flex flex-col gap-y-3 mb-2'>
          <h3 className=' font-bold text-xl'>{category.name}</h3>
          {
            category.employee?.map((employee)=> (
              <div className='flex flex-row flex-wrap gap-x-5 '>

                <EmployeeCard {...employee}/>
              </div>
            ))
          }
        </div>
      ))}
    </div>
  );
}
