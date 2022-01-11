import React from 'react'
import { MainList } from '../secretaria/sectores/main_list_component'

export const EducacionFisica = ({admin}) => {
    return (
        <div>
            <MainList label={"educación física"} admin={admin} />
        </div>
    )
}
 