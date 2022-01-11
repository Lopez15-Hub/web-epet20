import React from 'react'
import { MainList } from '../secretaria/sectores/main_list_component'

export const Taller = ({admin}) => {
    return (
        <div>
            <MainList label={"taller"} admin={admin}/>
        </div>
    )
} 
