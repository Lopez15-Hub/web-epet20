import React from 'react'
import { Subtitle } from '../text-styles/subtitle'

export const ComoLlegar = () => {
    return (
        <div>
            <div className="mt-2 mb-4 font-bold"> <Subtitle text="Cómo llegar a nuestra escuela" /></div>
            <div className="d-flex ">
                <div className="col-8">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Dirección del lugar" /></div>
                    <a href="https://www.google.com.ar/maps/place/Escuela+Provincial+de+Educaci%C3%B3n+T%C3%A9cnica+N%C2%B0+20/@-38.9648652,-68.0899264,17z/data=!3m1!4b1!4m5!3m4!1s0x960a33b795c819a7:0x65c00b69eb2c3f1d!8m2!3d-38.9647969!4d-68.0877371" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">Neuquén Capital (8300) - Lanin 2020</a>
                </div>
                <div className="col-6">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Lineas de colectivo" /></div>
                    <p>Linea 4</p> <p>Linea 5B</p> <p>Linea 5A</p><p>Linea 50A</p><p>Linea 50B</p>

                </div>
            </div>
        </div>
    )
}
