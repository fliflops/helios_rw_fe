
export type selectType = {
    label: string;
    value: string;
}


const status:selectType[] = [
    {
        label: 'Active',
        value: 'ACTIVE'
    },
    {
        label: 'In Active',
        value: 'INACTIVE'
    }
]

const boolean_status: selectType[] = [
    {
        label: 'Yes',
        value: `1`
    },
    {
        label: 'No',
        value: '0'
    }
]

const receive_mode: selectType[] = [
    {
        label:'Barcode',
        value: '/pod-transaction/receive/barcode'
    },
    {
        label: 'Date Entry',
        value: '/pod-transaction/receive/data-entry'
    }
]

const rud_status: selectType[] = [
    {
        label:'UNDELIVERED',
        value:'UNDELIVERED'
    },
    {
        label:'PARTIAL',
        value:'PARTIAL'
    },
    {
        label:'FULL',
        value: 'FULL'
    },
    {
        label:'CLEARED',
        value:'CLEARED'
    }
]

const delivery_status: selectType[] = [
    {
        label: 'UNDELIVERED',
        value:'UNDELIVERED'
    },
    {
        label: 'DELIVERED_PARTIAL',
        value:'DELIVERED_PARTIAL'
    },
    {
        label:'DELIVERED_FULL',
        value: 'DELIVERED_FULL'
    },
]

// const pod_status: selectType[] = [
//     {
//         label:'',
//         value:''
//     },
//     {
//         label:'',
//         value:''
//     },
//     {
//         label:'',
//         value:''
//     },
//     {
//         label:'',
//         value:''
//     },
//     {
//         label:'',
//         value:''
//     },
//     {
//         label:'',
//         value:''
//     },
//     {
//         label:'',
//         value:''
//     },
// ]

export type statusType = {
    status: selectType[],
    receive_mode: selectType[],
    rud_status: selectType[],
    delivery_status: selectType[],
    boolean_status: selectType[]
}

const statusList: statusType = {
    status,
    receive_mode,
    rud_status,
    delivery_status,
    boolean_status
}


export default statusList;