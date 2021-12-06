import React from 'react'
import MyCard from './card';
import { Link } from 'react-router-dom';
export const Signatures = () => {
    return (
        <div className="container">

            <div className="row ">


                <div className="col-6">
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1 " href=" https://es.wikipedia.org/wiki/Desarrollo_de_programas_para_Android" >
                        <MyCard description="Desarrollo de aplicaciones mobile" imageUrl="https://www.lancetalent.com/blog/wp-content/uploads/63317-OANQVG-591.png" />
                    </a>

                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Dise%C3%B1o_web" >

                        <MyCard description="Diseño de páginas web" imageUrl="https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/web-development-t.jpg" />
                    </a>
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/%C3%89tica_hacker">
                        <MyCard description="Hacking ético" imageUrl="https://hard2bit.com/blog/wp-content/uploads/2019/01/Ethical-Hacking.jpg" />
                    </a>




                </div>
                <div className="col-6">
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Sistema_de_gesti%C3%B3n_de_la_calidad">
                        <MyCard description="Sistemas de gestión de la cálidad" imageUrl="https://www.ceupe.com/images/easyblog_articles/1927/b2ap3_medium_calidad-servicio-1.jpg" />
                    </a>
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Algoritmo">
                        <MyCard description="Resolución de problemas y algoritmos" imageUrl="https://concepto.de/wp-content/uploads/2018/04/algoritmo-min-e1523301106897.jpg" />
                    </a>
                    <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Base_de_datos">
                        <MyCard description="Bases de datos" imageUrl=" https://ayudaleyprotecciondatos.es/wp-content/uploads/2020/09/modelo-base-de-datos-00.jpg" />
                    </a>
                </div>


            </div>





            <div>
                <Link to="/plan-de-estudios" className=" text-button text-center font-bold btn btn-sm btn-block text-large mt-4 mb-4">Ver el programa completo</Link>
            </div>
        </div>

    )
}
