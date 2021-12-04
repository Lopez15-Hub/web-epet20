import { React } from 'react';
import Header from '../components/inicio/header';
import MyCarousel from '../components/inicio/carousel';
import MyCard from '../components/inicio/card';
import Instagram from '../../src/assets/instagram.png';
import { Carousel } from 'react-materialize';
function Inicio() {
    return <div>
        <Header />
       
        <div className="container shadow-xl" >
            <div className="row">
                
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <h1 className="text-2xl   main-color font-bold text-center p-2 uppercase">Bienvenido a nuestra institución</h1>
                    <MyCarousel />
                    <h1 className="text-2xl   main-color font-bold text-center p-2 uppercase">En esta escuela aprenderás</h1>
                    <div className="row p-3">
                        <div className="d-flex p-7 ">

                            <a className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" href=" https://es.wikipedia.org/wiki/Desarrollo_de_programas_para_Android" className="p-2"> <MyCard description="Desarrollo de aplicaciones mobile" imageUrl="https://www.lancetalent.com/blog/wp-content/uploads/63317-OANQVG-591.png" /></a>


                            <a className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" href="https://es.wikipedia.org/wiki/Dise%C3%B1o_web" className="p-2">
                                <MyCard description="Diseño de páginas web" imageUrl="https://cdn.shopify.com/s/files/1/0426/9209/articles/diseno-web-todo-lo-que-debes-saber_960x502_crop_center.jpg?v=1598655949960w" />
                            </a>

                            <a className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" href="https://es.wikipedia.org/wiki/%C3%89tica_hacker" className="p-2">
                                <MyCard description="Hacking ético" imageUrl="https://hard2bit.com/blog/wp-content/uploads/2019/01/Ethical-Hacking.jpg" />
                            </a>

                        </div>
                        

                        <div>
                            <a href="#" className=" text-button btn btn-sm btn-block text-large">Ver el programa completo</a>
                        </div>
                    </div>

                </div>
                <section className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 main-color text-bold text-justify">
                    <h1 className="text-2xl   main-color font-bold text-center p-2 uppercase">Un poco de nuestra historia</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida eget mi molestie euismod. Nulla facilisi. Aenean sit amet erat aliquet, interdum sem a, elementum nunc. Fusce eu quam dolor. Nullam ut dictum velit, nec ullamcorper ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ac tristique metus. Nullam id ex metus. Nullam fringilla eget erat dignissim facilisis. Cras accumsan, urna non mollis fermentum, magna neque aliquet tortor, at fringilla felis mi vel urna. Pellentesque sed tellus ac dui convallis tincidunt. Sed ut augue justo. Vestibulum est lorem, fringilla in justo ut, molestie malesuada risus.

                        Duis lectus dui, faucibus sit amet ornare id, volutpat quis diam. Sed in volutpat nibh. Morbi ac viverra dolor. In hac habitasse platea dictumst. Maecenas id risus vestibulum, facilisis lacus et, laoreet odio. Praesent pretium, risus ac condimentum pellentesque, ex nulla sagittis risus, non accumsan purus nulla quis ex. In tortor lectus, feugiat non bibendum vitae, auctor vel ligula. Pellentesque eget libero nec libero rutrum sollicitudin. Ut condimentum vulputate fringilla. Nam id mauris vitae odio auctor dapibus. Nunc at nibh ligula. Cras tincidunt volutpat lorem, eget vestibulum eros laoreet sed. Sed porta dui ut massa venenatis, sed tincidunt odio hendrerit.

                        Praesent aliquam placerat venenatis. Etiam fringilla vel justo vitae sollicitudin. Sed interdum dolor elit, id euismod odio malesuada ut. Aliquam felis turpis, rutrum varius imperdiet vel, cursus sagittis nulla. Praesent in magna auctor, dignissim purus maximus, accumsan orci. Vestibulum erat mi, tincidunt id volutpat vitae, vehicula vel magna. Nulla facilisi. Quisque quis egestas ligula. Proin sollicitudin mi massa, ut pretium turpis tincidunt vitae.

                    </p>
                </section>





            </div>


        </div>
  {/*FOOOTER*/}      
        <footer className="bg-main-color p-3">
            <div className="container">
                <div className="d-flex">
                    <a href="#" className="link-social  p-2">Instagram</a>
                    <a href="#" className="link-social  p-2">Facebook</a>
                    <a href="#" className=" link-social p-2">Twitter</a>
                </div>
            </div>
            <p className="text-white  uppercase">2022 Escuela provincial de educación técnica número 20. Todos los derechos reservados.</p>
        </footer>
    </div>;


}

export default Inicio;