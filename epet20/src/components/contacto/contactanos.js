import React from 'react'
import { Subtitle } from '../text-styles/subtitle'

export const Contactanos = () => {
    return (
        <div>

            <div className="d-flex ">
                <div className="col-8">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de atención" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-4 col-xl-4">Lunes a viernes de 08:00 a 18:00</p>
                </div>
                <div className="col-6">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de teoría" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-6 col-xl-6 p-2">08:00 a 13:00 Turno mañana  - 08:00 a 13:30 Turno tarde</p>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de taller" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-6 col-xl-6 p-2">08:00 a 11:40 Turno mañana - 13:30 a 16:50 Turno tarde</p>
                </div>
            </div>
            <div className="d-flex ">
                <div className="col-8">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Nuestro email" /></div>
                    <a href="mailto:epet20@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">epet20@gmail.com</a>
                </div>
                <div className="col-6">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Email de asesoría" /></div>
                    <a href="mailto:epet20@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">epet20asesoria@gmail.com</a>

                </div>
            </div>
        </div>
    )
}
