export type modules = {
    module_key: string,
    module_name: string,
    route: string,
}

export type grouped_modules = {
    header_id: string;
    header_label: string;
    route: string;
    modules: modules[]
}[]

const data_management: modules[] = [
    {
        module_key: 'location',
        module_name: 'Locations',
        route: '/location'
    },
    {
        module_key: 'reason_code',
        module_name: 'Reason Code',
        route:'/reason-code'
    },
    {
        module_key: 'ship_point',
        module_name: 'Ship Point',
        route: '/ship-point'
    },
    {
        module_key:'principal',
        module_name: 'Principal',
        route: '/principal'
    }
]

const admin: modules[] = [
    {
        module_key: 'user_management',
        module_name: 'User Management',
        route: '/user'
    },
    {
        module_key: 'role_management',
        module_name: 'Role Management',
        route: '/role'
    },
    
]

const pod_processing: modules[] = [
    {
        module_key:'view_pod',
        module_name: 'View PODs',
        route: '/pod'
    },
    {
        module_key: 'pod_sorting',
        module_name: 'POD Sorting',
        route:"/pod-sorting"
    },
    {
        module_key:'pod_dispatch',
        module_name: 'POD Dispatch',
        route: '/pod-dispatch'
    },
    {
        module_key:'pod_receive',
        module_name: 'POD Receiving',
        route: '/pod-receive'
    },
    {
        module_key:'rud_processing',
        module_name: 'RUD Processing',
        route: '/rud-process'
    },
    {
        module_key:'pod_clearing',
        module_name: 'POD Clearing',
        route: '/pod-clearing'
    },
    {
        module_key: 'pod_verification',
        module_name: 'POD Verification',
        route:'/pod-verification'
    },
    {
        module_key:'trucker_clearance',
        module_name: 'Trucker Clearance',
        route: '/trucker-clear'
    }
];

const uitility: modules[] = [
    {
        module_key:'barcode',
        module_name:'Barcode',
        route:'/barcode'
    }
]


const modules:grouped_modules = [
    {
        header_id: 'pod_transactions',
        header_label: 'POD Transactions',
        route: '',
        modules: pod_processing
    },
    {
        header_id: 'data_management',
        header_label: 'Data Management',
        route: '',
        modules: data_management
    },
    {
        header_id: 'admin',
        header_label: 'Administration',
        route: '',
        modules: admin
    },
    {
        header_id: 'utility',
        header_label: 'Utility',
        route: '',
        modules:uitility
    }
]


export default modules;
