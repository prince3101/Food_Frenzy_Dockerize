import {Navigate,Outlet} from 'react-router-dom';

const ProtectedRoute = ({token}) =>{
    return(
        <>
            {!token ? <Navigate to="/login" replace/> : <Outlet/>}
        </>
    );
}

export default ProtectedRoute;