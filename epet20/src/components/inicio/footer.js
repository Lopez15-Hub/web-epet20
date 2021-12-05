import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="bg-main-color p-3">
    <div className="container-fluid">

      <p className="text-white text-left font-bold ">Enlaces de interés</p>
      <div className="d-flex">
        <Link to="/contacto" className="link-social  p-2">Contacto programador</Link>
        <a href="https://www.neuquen.edu.ar/" className="link-social  p-2">Consejo de educación</a>
        <a href="https://regular.neuquen.gob.ar/" className="link-social  p-2">Certificado de estudiante regular</a>
        <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" className="link-social  p-2">Estado de inscripción</a>
      </div>
    </div>
    <p className="text-white text-center  uppercase font-bold">2022 Escuela provincial de educación técnica número 20 - Intellect Solutions Todos los derechos reservados.</p>
    <p className="text-white text-center ">Sitio web diseñado con amor, por estudiantes de la institución</p>
  </footer>;
}