import Navbar from "../shared/Navbar"
import Footer from "../shared/Footer"
import { Outlet, useLocation } from "react-router-dom"

function MainLayout() {
  const location = useLocation();
  const path = location.pathname
  
  const shouldHideFooter = path === "/" || path.startsWith("/chat") 
  return (
    <div className='min-h-screen flex flex-col'>
    <Navbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
     {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default MainLayout