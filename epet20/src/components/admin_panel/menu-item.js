import React from 'react'
import { Link } from 'react-router-dom'


export const MenuItem = ({ name, icon, route}) => {

    return (
        <Link to={route} className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">  {icon} {name}</Link>
    )
}
