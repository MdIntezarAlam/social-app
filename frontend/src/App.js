import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import './App.css'
import { Login, Home, Account } from './component/conainer'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, } from './redux/action/User'



const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.user)
  // ye wala function se user ka value hamesa se hi rahega redux store mai referesh karne ke baad bhee
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])


  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/account' element={isAuthenticated ? <Account /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App