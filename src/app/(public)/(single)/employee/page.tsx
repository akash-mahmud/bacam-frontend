'use client';
import EmployeeCard from '@/components/ui/cards/EmployeeCard';
import {
  Employee,
  SortOrder,
  useEmployeeByCategoryQuery,
} from '@/graphql/generated/schema';
import React from 'react';

export default function Page() {
  const { data } = useEmployeeByCategoryQuery({
    variables: {
      orderBy: {
        position: SortOrder.Asc,
      },
    },
  });
  const employeeBycategories = data?.employeeCategories;
  return (
    <div>
      {employeeBycategories?.map(
        (category) =>
          category?.employee?.length && (
            <div key={category.slug} className=" flex flex-col gap-y-3 mb-2">
              <h3 className=" font-bold text-xl">{category.name}</h3>
              {category.employee?.map((employee) => (
                <div
                  key={employee.id}
                  className="flex flex-row flex-wrap gap-x-5 "
                >
                  <EmployeeCard {...(employee as Employee)} />
                </div>
              ))}
            </div>
          ),
      )}
    </div>
  );
}
