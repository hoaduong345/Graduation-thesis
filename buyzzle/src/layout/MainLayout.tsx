import Header from "../components/header/Header"


interface Props {
    children?: React.ReactNode
  }
function MainLayout({children} : Props) {
  return (
    <div className='inline-flex flex-col h-screen w-full'>
        <Header />
        {children}
    </div>
  )
}

export default MainLayout