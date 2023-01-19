import React from 'react'
import { Link } from 'react-router-dom'


const User = ({ userId, name, avatar }) => {
    return (
        <Link to={`/user/${userId}`} className='homeuser'>
            <img src={avatar} alt="userimg" className='userimg' />
            <p>{name}</p>
        </Link>
    )
}

export default User