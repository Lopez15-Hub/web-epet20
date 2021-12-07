import React from 'react'
import MyCard from './card';
import { Link } from 'react-router-dom';
import Image1 from "../../assets/signature1.png";
import Image2 from "../../assets/signature2.jpg";
import Image3 from "../../assets/signature3.jpg";
import Image4 from "../../assets/signature4.jpg";
import Image5 from "../../assets/signature5.jpg";
import Image6 from "../../assets/signature6.jpg";
export const Signatures = () => {
    return (
        <div className="container">

            <div className="row ">


                <div className=" col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1 " href={" https://es.wikipedia.org/wiki/Desarrollo_de_programas_para_Android"} >
                        <MyCard description="Desarrollo de aplicaciones mobile" imageUrl={Image1} />
                    </a>

                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Dise%C3%B1o_web" >

                        <MyCard description="Diseño de páginas web" imageUrl={Image2} />
                    </a>
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/%C3%89tica_hacker">
                        <MyCard description="Hacking ético" imageUrl={Image3} />
                    </a>




                </div>
                <div className=" col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Sistema_de_gesti%C3%B3n_de_la_calidad">
                        <MyCard description="Sistemas de gestión de la cálidad" imageUrl={Image4} />
                    </a>
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Algoritmo">
                        <MyCard description="Resolución de problemas y algoritmos" imageUrl={Image5} />
                    </a>
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Base_de_datos">
                        <MyCard description="Bases de datos" imageUrl={Image6} />
                    </a>
                </div>


            </div>





            <div>
                <Link to="/plan-de-estudios" className=" text-button text-center font-bold btn btn-sm btn-block text-large mt-4 mb-4">Ver el programa completo</Link>
            </div>
        </div>

    )
}
