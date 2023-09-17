import React from 'react'
import Store from '../../Store/Store'
import { Navigate} from 'react-router-dom';


export default function PrivateRoute({children}) {
    const storedata = Store.getState();
 
    if(storedata.flag){
        return children
    }
    else{
       return <Navigate to="/"/>
    }
 
}
