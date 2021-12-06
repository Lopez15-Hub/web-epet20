import React from 'react'
import { Subtitle } from '../text-styles/subtitle'
export const AboutTutorial = () => {
    return (
        <div className="col-12 col-md-4 col-lg-4 col-xl-4 font-bold p-4">


            <div className="font-bold shadow-md rounded-xl  ">
                <div className="text-center">
                    <Subtitle text="¿Qué puedo realizar en esta sección?" />
                </div>
                <ol className="  list-group list-group-numbered  p-4 mx-auto " >
                    <li className="list-group-item">Solicitud de vacaciones</li>
                    <li className="list-group-item"> Solicitud de licencia </li>
                    <li className="list-group-item">Solicitudes de preinscripción </li>
                    <li className="list-group-item"> ¡Y más! </li>
                </ol>

            </div>

            <div className="font-bold shadow-md rounded-xl mt-4  ">
                <div className="text-center">
                    <Subtitle text="¿Qué puedo realizar en esta sección?" />
                </div>
                <ol className="list-group list-group-numbered  p-4 mx-auto " >
                    <li className="list-group-item">Seleccionas el sector en el cual necesitás realizar tus trámites </li>
                    <li className="list-group-item"> Ingresás al link del formulario requerido </li>
                    <li className="list-group-item">  Rellenás los campos </li>
                    <li className="list-group-item">  ¡Listo! El formulario será recepcionado por secretaria. ¡A esperar! </li>
                </ol>

            </div>


        </div>
    )
}
