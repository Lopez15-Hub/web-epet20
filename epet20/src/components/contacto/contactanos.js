import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Subtitle } from '../text-styles/subtitle'

export const Contactanos = () => {
    return (
        <div>

            <div className="me-auto  row">
                <div className="col-sm-12 col-md-8">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de atención" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-4 col-xl-4">Lunes a viernes de 08:00 a 18:30</p>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Secretaría" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-4 col-xl-4">Lunes a viernes de 08:00 a 18:30</p>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Preceptoría" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-4 col-xl-4">Lunes a viernes de 08:00 a 17:50</p>
                </div>
                <div className="col-sm-12 col-md-4  me-auto">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de teoría" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-12 col-xl-12">08:00 a 13:00 Turno mañana  - 08:00 a 13:30 Turno tarde</p>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de taller" /></div>
                    <p className="col-xs-12 col-sm-12  col-md-12 col-xl-12">08:00 a 11:40 Turno mañana - 13:30 a 16:50 Turno tarde</p>
                </div>
            </div>
            <div className="me-auto ">
                <div className="col-sm-12 col-md-6">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Nuestro email" /></div>
                    <div>

                        <a href="mailto:epet20@gmail.com" className="d-flex"><FaGoogle className="main-color mt-1 " />epet20@gmail.com</a>
                    </div>
                    <div>
                        <div className=""><Subtitle text="Email de asesoría" /></div>
                        <div>

                            <a href="mailto:epet20@gmail.com" className=" d-flex"><FaGoogle className="main-color mt-1" />epet20asesoria@gmail.com</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
