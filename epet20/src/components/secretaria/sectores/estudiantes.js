import React from 'react'
import { MainList } from './main_list_component'

export const EstudiantesList = ({ admin }) => {
    return (
        <div>
            <MainList label="Estudiantes" admin={admin} />
        </div>
    )
}
