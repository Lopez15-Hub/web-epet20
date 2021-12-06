import React from 'react'
import { Subtitle } from '../text-styles/subtitle'

export const ContactoProgramador = () => {
    return (
        <div>
            <div className="d-flex ">
                <div className="col-4">
                    <Subtitle text="Ezequiel López" />
                    <a href="mailto:contacto.ezequiel.lopez@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">contacto.ezequiel.lopez@gmail.com</a>
                    <div className="d-flex">
                        <a href="https://www.linkedin.com/in/ezequiel-l%C3%B3pez-94193b1b9" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Linkedln</a>
                        <a href="https://instagram.com/ezequielopez18" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color  ">Instagram</a>
                    </div>
                </div>
                <div className="col-4">
                    <Subtitle text="Tomás Castro" />
                    <a href="mailto:ttomycastro@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 ">ttomycastro@gmail.com</a>
                    <div className="d-flex">
                        <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Linkedln</a>
                        <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4  main-color">Instagram</a>
                    </div>
                </div>
                <div className="col-4">
                    <Subtitle text="Ayrton Sandoval" />
                    <a href="mailto:juanayrtonsandoval@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">juanayrtonsandoval@gmail.com</a>
                    <div className="d-flex">
                        <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Linkedln</a>
                        <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
