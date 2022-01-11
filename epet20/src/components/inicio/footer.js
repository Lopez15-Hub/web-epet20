import { useDate } from "../../hooks/useDate";


export default function Footer() {
  const { formatDate } = useDate();
  return <footer className="bg-main-color p-3">
    <div className="container-fluid">

      <p className="text-white text-left font-bold ">Enlaces de interés</p>
      <div className="d-flex">
        <a href="https://www.neuquen.edu.ar/cargos-y-horas-vacantes/" className="link-social  p-2">Cargos y horas vacantes</a>
        <a href="https://www.neuquen.edu.ar/" className="link-social  p-2">Consejo de educación</a>
        <a href="https://regular.neuquen.gob.ar/" className="link-social  p-2">Certificado de estudiante regular</a>
        <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" className="link-social  p-2">Estado de inscripción</a>
      </div>
    </div>
    <p className="text-white text-center  uppercase font-bold mt-2">{formatDate()} Escuela provincial de educación técnica número 20.</p>
    <p className="text-white text-center ">Sitio web diseñado con amor, por estudiantes de la institución.</p>
  </footer>;
}