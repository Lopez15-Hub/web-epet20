import React from 'react'
import { MainList } from './main_list_component'

export const DocentesList = ({admin}) => {
    return (
        <div>
            <MainList label="Docentes" admin={admin}/>
        </div>
    )
}
