import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import './App.css'
import { Login } from './component/conainer'


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<h1>dfjksf</h1>} />
        <Route path='/account' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App