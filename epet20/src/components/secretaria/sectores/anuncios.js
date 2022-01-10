import React from 'react'
import { MainList } from './main_list_component'

export const Anuncios = ({admin}) => {
    return (
        <div className="">
            <MainList label="Anuncios" admin={admin} />
        </div>
    )
}
