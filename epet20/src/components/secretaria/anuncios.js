import React from 'react'
import { Title } from '../text-styles/title'

export const Anuncios = () => {
    return (
        <div className="col-12 col-md-8 rounded-xl  col-lg-8 col-xl-8">
            <div className="text-center ">
                <Title text="Anuncios" />
            </div>
            <ul class="list-group text-center font-bold shadow-md">
                <li class="list-group-item p-4"> La atención a las familias y a la comunidad serán por medio de turnos.</li>
                <li class="list-group-item p-4">Ya está disponible el formulario de inscripción para ingresantes a primer año. Consultar sección "Estudiantes"</li>

            </ul>
        </div>
    )
}
