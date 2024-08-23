import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Customer from './pages/Customer'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import Order from './pages/Order'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useState } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  

  return (
    <BrowserRouter>
      <div className='flex flex-1'>
        <div className={`w-[300px] fixed md:static  transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`} >
          <Sidebar />
        </div>
        <div className='w-full bg-[#f9f7f7]'>
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/customer' element={<Customer/>}/>
            <Route path='/product' element={<Product/>}/>
            <Route path='/orders' element={<Order/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
