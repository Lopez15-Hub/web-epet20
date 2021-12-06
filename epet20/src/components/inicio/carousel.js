import React from "react";
export default function MyCarousel() {
  return <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner rounded-lg shadow-md">
      <div className="carousel-item active">
        <img src="https://media.lmneuquen.com/p/bcdc133f875dbefc9039525a367d8740/adjuntos/195/imagenes/006/925/0006925675/1200x675/smart/epet-20-fachada.png" className="img-carousel d-block w-100 " alt="frente de la epet20" />
        <div class="carousel-caption font-bold  rounded-xl shadow-xl text-center nav-background d-none d-md-block">
          <h5>Frente de la escuela</h5>
          <p>Foto tomada por: Diario La Mañana Neuquén.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="https://www.neuquen.edu.ar/wp-content/uploads/2017/01/NQN-27-01-2017...-Storioni-recorri%C3%B3-el-nuevo-edificio-de-la-EPET-20-de-Neuqu%C3%A9n_SIP1453.jpg" className=" img-carousel d-block w-100 " alt="inagurando la escuela" />
        <div class="carousel-caption font-bold nav-background rounded-xl shadow-xl text-center  d-none d-md-block">
          <h5>La escuela en fase de terminación</h5>
          <p>Foto tomada por: Diario La Mañana Neuquén.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="https://educaciondigital.neuquen.gov.ar/wp-content/uploads/2017/10/21Sept17_Inauguracion-EPET-20_7611.jpg" className="img-carousel d-block  w-100" alt="inagurando la escuela" />
        <div class="carousel-caption font-bold nav-background rounded-xl shadow-xl text-center d-none d-md-block">
          <h5>Inaguración de nuestra escuela</h5>
          <p>Foto tomada por: Diario La Mañana Neuquén.</p>
        </div>
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
