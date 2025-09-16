import PodSortingFilterForm from "../components/forms/PodSortingFilterForm"

const PodSortingFilterPage = () => {
  return (
    <div className='p-10 flex flex-col gap-2'>
        <label className='text-2xl'>Define Filters</label>
        <PodSortingFilterForm/>
    </div>
  )
}

export default PodSortingFilterPage