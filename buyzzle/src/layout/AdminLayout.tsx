import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"


interface Props {
}
function AdminLayout(props: Props) {
  return (
    <div >
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AdminLayout