import React from 'react'
import { Link } from 'react-router-dom'
import MyCard from '../inicio/card'
import image1 from '../../assets/maestros.jpg';
import image2 from '../../assets/teoría.png';
import image3 from '../../assets/general.jpg';
export const Sectores = () => {
    return (
        <>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                <Link to="/secretaria/docentes"> <MyCard description="Docentes" imageUrl={image1} /></Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                <Link to="/secretaria/teoria"> <MyCard description="General" imageUrl={image3} /></Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                <Link to="/secretaria/estudiantes">  <MyCard description="Estudiantes" imageUrl={image2} /> </Link>
            </div>

        </>
    )
}
