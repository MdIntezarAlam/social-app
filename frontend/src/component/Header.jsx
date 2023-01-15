import React, { useState } from 'react'
import '../styles/header.css'
import { Link } from 'react-router-dom'
import {
    Home,
    HomeOutlinedIcon,
    AddIcon,
    AddCircleOutlinedIcon,
    SearchIcon, SearchOutlinedIcon,
    AccountCircleIcon,
    AccountCircleOutlinedIcon
} from './icons/MaterialIcons'

const Header = () => {
    const [tab, setTab] = useState(window.location.pathname)

    return (
        <div className='header'>
            <Link to="/" onClick={() => setTab("/")}>
                {tab === "/" ? <Home style={{ color: "#000" }} /> : <HomeOutlinedIcon />}
            </Link>
            <Link to="/newpost" onClick={() => setTab("/newpost")}>
                {tab === "/newpost" ? <AddIcon style={{ color: "#000" }} /> : <AddCircleOutlinedIcon />}
            </Link>
            <Link to="/search " onClick={() => setTab("/search")}>
                {tab === "/search" ? <SearchIcon style={{ color: "#000" }} /> : <SearchOutlinedIcon />}
            </Link>
            <Link to="/account" onClick={() => setTab("/account")}>
                {tab === "/account" ? <AccountCircleIcon style={{ color: "#000" }} /> : <AccountCircleOutlinedIcon />}
            </Link>
        </div>
    )
}

export default Header