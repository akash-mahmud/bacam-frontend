"use client"
import TopBikes from '@/components/home/top-bikes';
import {  useEmployeesQuery, useFindManyNewsQuery, usePartnerShipsQuery } from '@/graphql/generated/schema';
export default async function HomePage() {
const {data:PartnerShips , loading:partnerShipsLoading} = usePartnerShipsQuery()
const {data:findManyNewsdata , loading:findmanyNewsLoading} = useFindManyNewsQuery()
const {data:ourTeamEmployeeData , loading:ourTeamEmployeeDataLoading} = useEmployeesQuery()
// const {data:reviewData , loading:reviewsDataLoading} = useFindManyNewsQuery()

  return (
    <div className=' flex flex-col flex-grow'>
      {/* <TopBikes /> */}
      <div className="flex flex-col">
        <div className="flex flex-row">

        </div>
        <div className="">

        </div>
      </div>
    </div>
  );
}
