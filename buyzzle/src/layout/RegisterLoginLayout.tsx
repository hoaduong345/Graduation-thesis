import Footer from "../components/Footer/Footer"
import HeaderTop from "../components/HeaderTop/HeaderTop"


interface Props {
    children?: React.ReactNode
  }
function RegisterLoginLayout({children} : Props) {
  return (
    <div className='inline-flex flex-col h-screen w-full'>
        <HeaderTop />
        {children}
        <Footer />
    </div>
  )
}

export default RegisterLoginLayout