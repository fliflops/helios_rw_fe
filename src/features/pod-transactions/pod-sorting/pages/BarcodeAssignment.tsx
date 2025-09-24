import { Button } from "@/components/ui/button"
import { useAssignBarcodeMutation, useCancelSortingSessionMutation, useConfirmSortMutation, useGetSortingSessionQuery } from "@/lib/redux/api/pod-sorting.api"
import { Navigate } from "react-router-dom"
import BarcodeInput from "../components/input/BarcodeInput"
import SelectInvoice from "../components/input/SelectInvoice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { getPodSortingState, setIsDr, setSelected } from "@/lib/redux/slices/pod-sort.slice"
import { useRef, useEffect, useState } from "react"
import AssignedTable from "../components/table/AssignedTable"
import { toast } from "react-toastify"

const BarcodeAssignment = () => {
    const barcodeRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const {selected, is_dr} = useAppSelector(getPodSortingState);
    const [popOver, setPopOver] = useState<boolean>(false)

    const {isLoading, data} = useGetSortingSessionQuery();
    const [assignBarcode, assignBarcodeProps] = useAssignBarcodeMutation()    
    const [confirmSort, confirmSortProps] = useConfirmSortMutation();

    const [cancelSession, cancelSessionProps] = useCancelSortingSessionMutation();
    
    const handleCancel = async () => {
        await cancelSession()
    }

    const handleSelectInvoice = (selected: {label:string; value: string}) => {     
        dispatch(setSelected(selected))
    }

    const handleSetBarcode = async(barcode:string) => {
        await assignBarcode({
            key: selected?.value as string,
            barcode
        })
        .unwrap()
        .then(() => {
            dispatch(setSelected(null))
            setPopOver(true)

            toast.success('Barcode Assgined')
        })
        
    }

    const handlePopOverOpen = (value: boolean) => {
        setPopOver(value);
    }

    const handleSubmit = async () => {
        await confirmSort()
    }

    useEffect(() => {
        if(selected) {
            if(barcodeRef.current) barcodeRef.current.focus();
        }
    },[selected])

    if(isLoading) return <>...Loading</>
    if(!data) return <Navigate to='/pod-sorting' replace/>
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-2">
                    <SelectInvoice isLoading={assignBarcodeProps.isLoading} isDr={is_dr} onOpen={handlePopOverOpen} popOverOpen={popOver} onSelected={handleSelectInvoice} selected={selected}/>
                </div>
                <div className="">
                     <BarcodeInput ref={barcodeRef} disabled={!selected} setBarcode={handleSetBarcode} placeholder="Barcode"/>
                </div>
                <div className="col-span-2 flex items-center gap-3">
                    <input type="checkbox" checked={is_dr} onChange={(e) => dispatch(setIsDr(e.target.checked))}/>
                    <label>Delivery Receipt</label>
                </div>
            </div>
            <div>
                <AssignedTable/>
            </div>
            <div className="flex justify-between gap-2">
                <Button variant={'destructive'} onClick={handleCancel} isLoading={cancelSessionProps.isLoading}>Cancel</Button>
                <Button onClick={handleSubmit} isLoading={confirmSortProps.isLoading}>Submit</Button>
            </div>
        </div>
    )
}

export default BarcodeAssignment