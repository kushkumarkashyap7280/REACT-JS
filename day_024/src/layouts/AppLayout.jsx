import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'


function AppLayout() {
  return (
    <>
    <Header/>
    {/* this outlet provided by react router dom  and here in place of outlet comes children whatever you define in route */}
    <Outlet/>   
    <Footer/>
    </>
  )
}

export default AppLayout
