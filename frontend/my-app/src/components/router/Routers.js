import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../pages/Home.jsx';
import Tours from './../pages/Tours.jsx';
import TourDetails from './../pages/TourDetails.jsx';
import Login from './../pages/Login.jsx';
import Register from './../pages/Register.jsx';
import SearchResultList from './../pages/SearchResultList.jsx';
import ThankYou from './../pages/ThankYou.jsx';



const Routers = () => {
  return (
    <Routes>
        <Route path='/' element= {<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/tours/search' element={<SearchResultList/>} />
        

    </Routes>
  )
}

export default Routers
