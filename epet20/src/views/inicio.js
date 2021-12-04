import Navbar from '../components/inicio/navbar';
import MyCarousel from '../components/inicio/carousel';
import MyCard from '../components/inicio/card';
import Footer from '../components/inicio/footer';
import Section from '../components/inicio/section';
import React from 'react'

export const Inicio = () => {
    return (
        <>
            <Navbar />

            <div className="container shadow-xl" >
                <div className="row">

                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <h1 className="text-2xl   main-color font-bold text-center p-2 uppercase">Bienvenido a nuestra institución</h1>
                        <MyCarousel />
                        <h1 className="text-2xl   main-color font-bold text-center p-2 uppercase">En esta escuela aprenderás</h1>
                        <div className="container">

                            <div className="row ">


                                <a className="col-xs-12 col-sm-12 col-md-4 p-1 " href=" https://es.wikipedia.org/wiki/Desarrollo_de_programas_para_Android" >
                                    <MyCard description="Desarrollo de aplicaciones mobile" imageUrl="https://www.lancetalent.com/blog/wp-content/uploads/63317-OANQVG-591.png" />
                                </a>

                                <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/Dise%C3%B1o_web" >

                                    <MyCard description="Diseño de páginas web" imageUrl="https://cdn.shopify.com/s/files/1/0426/9209/articles/diseno-web-todo-lo-que-debes-saber_960x502_crop_center.jpg?v=1598655949960w" />
                                </a>
                                <a className="col-xs-12 col-sm-12 col-md-4 p-1" href="https://es.wikipedia.org/wiki/%C3%89tica_hacker">
                                    <MyCard description="Hacking ético" imageUrl="https://hard2bit.com/blog/wp-content/uploads/2019/01/Ethical-Hacking.jpg" />
                                </a>







                            </div>





                            <div>
                                <a href="www.epet20.com.ar" className=" text-button text-center btn btn-sm btn-block text-large m-4">Ver el programa completo</a>
                            </div>
                        </div>

                    </div>
                    <Section />



                </div>


            </div>
            {/*FOOOTER*/}
            <Footer />
        </>

    )
}
