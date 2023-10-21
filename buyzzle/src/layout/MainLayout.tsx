import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"


interface Props {
  children?: React.ReactNode
}
function MainLayout({ children }: Props) {
  return (
    <div >
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout