import React from "react";
export default function MyCarousel() {
  return   <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src="https://media.lmneuquen.com/p/bcdc133f875dbefc9039525a367d8740/adjuntos/195/imagenes/006/925/0006925675/1200x675/smart/epet-20-fachada.png" class="d-block img" alt="#"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Frente de la escuela</h5>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
    <img src="https://lh3.googleusercontent.com/proxy/8xyJF03J5aqVB95dQ4ln415rlDQu7fNwusiy7J4PI7N6RrpGS6RNxHF8V1726iVPmQXKHGmQULsBsxQzuRKum3VViQtAz9Vgkbg-9s1RyYA3gLBMxwJWwYtwc9AdIuBEgY-JZKg" class="d-block img" alt="#"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
    <img  src="https://educaciondigital.neuquen.gov.ar/wp-content/uploads/2017/10/21Sept17_Inauguracion-EPET-20_7611.jpg" class="d-block img" alt="#"/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      }
