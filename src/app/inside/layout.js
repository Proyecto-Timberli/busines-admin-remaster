import Sidebar from '@/components/Sidebar/Sidebar'
export default function DashboardLayout({ children }) {
  return (
    <>
    <Sidebar/>  
    <div className="relative md:ml-64 bg-blueGray-100">
      {children}   
    </div>
    </>
  )
}