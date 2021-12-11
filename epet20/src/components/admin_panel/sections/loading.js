import React from 'react'
import { Spinner,Row } from 'reactstrap'
import { Subtitle } from '../../text-styles/subtitle'

export const Loading = ({text}) => {
    return (
        <Row>
            <Spinner className='main-color text-center  mt-5 mx-auto p-4 top-50  ' />
            <div className='text-center mt-4'>  <Subtitle text={text} /></div>
        </Row>
    )
}
