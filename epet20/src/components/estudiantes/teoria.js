import React from 'react'
import { MainList } from '../secretaria/sectores/main_list_component'

export const Teoria = ({ admin }) => {
    return (
        <div>
            <MainList label={"teoria"} admin={admin} />
        </div>
    )
}
