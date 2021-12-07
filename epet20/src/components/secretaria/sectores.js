import React from 'react'
import { Link } from 'react-router-dom'
import MyCard from '../inicio/card'

export const Sectores = () => {
    return (
        <>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                <Link to="/secretaria/docentes"> <MyCard description="Docentes" imageUrl="https://images.squarespace-cdn.com/content/v1/53aadf1de4b0a0a817640cca/1603687245319-JCQSOWRFQGEKYM8ZL9AK/capacitaci%C3%B3n+maestros" /></Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                <Link to="/secretaria/teoria"> <MyCard description="Teoría" imageUrl="https://lh3.googleusercontent.com/proxy/h1wU1U0TbGMxQNqkE740reoRYfa54bHOLQ4Z3vIe0k9jr5-ANWCABtGCtolexRAVvCGVr0x950v-rdsONLtRMoDlXi7v9n04NpI-OJHD2iyr0JoO-D_sl2809JnxycAQ8K4LFGcR8k8" /></Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                <Link to="/secretaria/estudiantes">  <MyCard description="Estudiantes" imageUrl="https://younoticias.com/wp-content/uploads/2021/06/Muchos-estudiantes-universitarios-no-se-graduan-%C2%BFPor-que-no-darles.png" /> </Link>
            </div>

        </>
    )
}
