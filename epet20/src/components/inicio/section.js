import { Link } from "react-router-dom";
import { Title } from "../text-styles/title";
import Image from "../../assets/icono-escuela.png"
export default function Section() {
    return <section className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 main-color text-bold text-justify">
        <Title text="Un poco de nuestra historia" />
        <img className="img-fluid text-center mx-auto w-50 mt-4 mb-5" src={Image} alt="Logo EPET N°20" />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida eget mi molestie euismod. Nulla facilisi. Aenean sit amet erat aliquet, interdum sem a, elementum nunc. Fusce eu quam dolor. Nullam ut dictum velit, nec ullamcorper ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ac tristique metus. Nullam id ex metus. Nullam fringilla eget erat dignissim facilisis. Cras accumsan, urna non mollis fermentum, magna neque aliquet tortor, at fringilla felis mi vel urna. Pellentesque sed tellus ac dui convallis tincidunt. Sed ut augue justo. Vestibulum est lorem, fringilla in justo ut, molestie malesuada risus.

            Duis lectus dui, faucibus sit amet ornare id, volutpat quis diam. Sed in volutpat nibh. Morbi ac viverra dolor. In hac habitasse platea dictumst. Maecenas id risus vestibulum, facilisis lacus et, laoreet odio. Praesent pretium, risus ac condimentum pellentesque, ex nulla sagittis risus, non accumsan purus nulla quis ex. In tortor lectus, feugiat non bibendum vitae, auctor vel ligula. Pellentesque eget libero nec libero rutrum sollicitudin. Ut condimentum vulputate fringilla. Nam id mauris vitae odio auctor dapibus. Nunc at nibh ligula. Cras tincidunt volutpat lorem, eget vestibulum eros laoreet sed. Sed porta dui ut massa venenatis, sed tincidunt odio hendrerit.

        </p>
        <div className="mt-4">
        <Title text="Perfil del egresado" />
        </div>
        <h5 className="font-bold mb-2 mt-2">¿Qué implica ser técnico en programación? </h5>
        <p className="text-justify">
            El Técnico en Programación participa en proyectos de desarrollo de software desempeñando roles que tienen por objeto analizar, diseñar, desarrollar e implementar sistemas informáticos.

        </p>
        <h5 className="font-bold mb-2 mt-4">¿Qué voy a poder realizar? </h5>
        <p className="text-justify">
            La actividad de un técnico en programación se basa en el constante aprendizaje de las tecnologías implementadas, la compresión, el planteamiento y la resolución de un problema, la constante documentación del proyecto, aplicación y estructuración de metodologías ágiles que optimicen los tiempos de producción y aplicación de normativas que gestionen y aseguren la calidad del producto.
        </p>
        <Link to="/plan-de-estudios" className=" text-button text-center font-bold btn btn-sm btn-block text-large mt-4 mb-4">Ver más</Link>
    </section>


}