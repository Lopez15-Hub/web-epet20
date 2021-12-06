import React from 'react'
import { Subtitle } from '../components/text-styles/subtitle'
import { Title } from '../components/text-styles/title'
import  Image  from '../assets/weWorking.jpg';
export const PaginaEnConstruccion = () => {
    return (
        <div className="container-fluid top-80  position-absolute ">


            <div className="row ">
                <div className="col-12" />
                <img className="img-fluid img p-2 w-auto mx-auto shadow-lg rounded-xl" src={Image} alt="logo-epet" />


            </div>

            <div className="row">

                <div className="text-center col-12">

                    <Title text="¡Oops! Continuamos trabajando. Muy pronto podrás visitar esta sección." />
                    <Subtitle text="¡Inténtalo de nuevo más tarde! ;))" />

                </div>

            </div>
        </div>
    )
}
