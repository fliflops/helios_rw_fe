import { useGetSortingSessionQuery } from "@/lib/redux/api/pod-sorting.api"
import PodSortingFilterForm from "../components/forms/PodSortingFilterForm"
import { Navigate } from "react-router-dom";

const PodSortingFilterPage = () => {
  const { isLoading, data } = useGetSortingSessionQuery();

  if(isLoading) return <>...Loading</>
  //if(isSuccess) 
  console.log(data)
  if(data) return <Navigate to='/pod-sorting/assign-barcode' replace/>


  return (
    <div className='p-10 flex flex-col gap-2'>
        <label className='text-2xl'>Define Filters</label>
        <PodSortingFilterForm/>
    </div>
  )
}

export default PodSortingFilterPage