import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthReady, selectIsAuth } from '../components/auth/authSlice'

const ProtectedRoute = ({ children }) => {
    const ready = useSelector(selectAuthReady)
    const isAuth = useSelector(selectIsAuth)
        
    if(!ready) return <div> Loading... </div>
    
    return isAuth ? children : <Navigate to={'signin'} replace />
}

export default ProtectedRoute
