import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
const EmployeePrivateRoute = () => {
    let employeelogin=true;


    if(!employeelogin){
        
        return <Navigate to='/employeelogin'/>
    }else{
        return <Outlet/>
    }
}

export default EmployeePrivateRoute
