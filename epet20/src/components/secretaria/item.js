import React from 'react'

export const Item = ({ description }) => {
    return (
        <li class="border p-4 m-2 shadow-md rounded-xl">{description}</li>
    )
}
