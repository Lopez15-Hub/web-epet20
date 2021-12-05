import React from "react";
export default function MyCarousel() {
  return   <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <img src="https://media.lmneuquen.com/p/bcdc133f875dbefc9039525a367d8740/adjuntos/195/imagenes/006/925/0006925675/1200x675/smart/epet-20-fachada.png" class="img-carousel d-block w-100 " alt="frente de la epet20"/>
  
    </div>
    <div className="carousel-item">
    <img  src="https://www.neuquen.edu.ar/wp-content/uploads/2017/01/NQN-27-01-2017...-Storioni-recorri%C3%B3-el-nuevo-edificio-de-la-EPET-20-de-Neuqu%C3%A9n_SIP1453.jpg" class=" img-carousel d-block w-100 " alt="inagurando la escuela"/>

    </div>
    <div className="carousel-item">
    <img  src="https://educaciondigital.neuquen.gov.ar/wp-content/uploads/2017/10/21Sept17_Inauguracion-EPET-20_7611.jpg" class="img-carousel d-block  w-100" alt="inagurando la escuela"/>
 
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      }
