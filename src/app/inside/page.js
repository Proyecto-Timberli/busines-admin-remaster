import Dashboard from '@/components/Dashboard/Dashboard'
import Header from '@/components/Headers/HeaderStats'
import Footer from '@/components/Footers/FooterAdmin'
export default function BusinessPage() {
    return (
      <div className="container min-h-screen h-auto  dark:bg-stone-950">
        <Header/>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <Dashboard/>
        <Footer/> 
        </div>
      </div>
    )
  }