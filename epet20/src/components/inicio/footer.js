import { FaLink } from "react-icons/fa";
import { useDate } from "../../hooks/useDate";


export default function Footer() {
  const { formatYear } = useDate();
  return <footer className="bg-main-color p-3">
    <div className="container-fluid">
      <div className="row ">
        <p className="text-white text-left font-bold ">Enlaces de interés</p>
        <a href="https://www.neuquen.edu.ar/cargos-y-horas-vacantes/" className="link-social col-sm-12 col-md-3  p-2 d-flex  "><FaLink /> Cargos y horas vacantes</a>
        <a href="https://www.neuquen.edu.ar/" className="link-social col-sm-12 col-md-3  p-2 d-flex"> <FaLink /> Consejo de educación</a>
        <a href="https://regular.neuquen.gob.ar/" className="link-social col-sm-12 col-md-3  p-2 d-flex"><FaLink />  Certificado de estudiante regular</a>
        <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" className="link-social col-sm-12 col-md-3  p-2 row"> <div className="d-flex col-12"><FaLink /><p className="text-center"> Estado de inscripción</p></div></a>
        <p className="text-white text-center  uppercase font-bold mt-2">{formatYear()} Escuela provincial de educación técnica número 20.</p>
        <p className="text-white text-center ">Sitio web diseñado con amor, por estudiantes de la institución.</p>
      </div>
    </div>

  </footer>;
}