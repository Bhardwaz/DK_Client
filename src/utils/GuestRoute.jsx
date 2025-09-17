import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectAuthReady, selectIsAuth } from '../components/auth/authSlice'

function GuestRoute({ children }) {
   const location = useLocation()
   
   const ready = useSelector(selectAuthReady)
   const isAuth = useSelector(selectIsAuth)

   if(!ready) return <div> Loading... </div>
   return isAuth ? (
    <Navigate to={location.pathname === "/signin" || location.pathname === "/signup" ? "/" : location.pathname} replace />
  ) : (
    children
  );
}

export default GuestRoute