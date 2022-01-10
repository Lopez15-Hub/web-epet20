import React from 'react'
import { MainList } from './main_list_component'

export const GeneralList = ({admin}) => {
    return (
        <div>
            <MainList label="General" admin={admin}/>
        </div>
    )
}
