import { Title } from "../text-styles/title";
export default function Section() {
    return <section className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 main-color text-bold text-justify">
        <Title text="Un poco de nuestra historia" />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida eget mi molestie euismod. Nulla facilisi. Aenean sit amet erat aliquet, interdum sem a, elementum nunc. Fusce eu quam dolor. Nullam ut dictum velit, nec ullamcorper ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ac tristique metus. Nullam id ex metus. Nullam fringilla eget erat dignissim facilisis. Cras accumsan, urna non mollis fermentum, magna neque aliquet tortor, at fringilla felis mi vel urna. Pellentesque sed tellus ac dui convallis tincidunt. Sed ut augue justo. Vestibulum est lorem, fringilla in justo ut, molestie malesuada risus.

            Duis lectus dui, faucibus sit amet ornare id, volutpat quis diam. Sed in volutpat nibh. Morbi ac viverra dolor. In hac habitasse platea dictumst. Maecenas id risus vestibulum, facilisis lacus et, laoreet odio. Praesent pretium, risus ac condimentum pellentesque, ex nulla sagittis risus, non accumsan purus nulla quis ex. In tortor lectus, feugiat non bibendum vitae, auctor vel ligula. Pellentesque eget libero nec libero rutrum sollicitudin. Ut condimentum vulputate fringilla. Nam id mauris vitae odio auctor dapibus. Nunc at nibh ligula. Cras tincidunt volutpat lorem, eget vestibulum eros laoreet sed. Sed porta dui ut massa venenatis, sed tincidunt odio hendrerit.

            Praesent aliquam placerat venenatis. Etiam fringilla vel justo vitae sollicitudin. Sed interdum dolor elit, id euismod odio malesuada ut. Aliquam felis turpis, rutrum varius imperdiet vel, cursus sagittis nulla. Praesent in magna auctor, dignissim purus maximus, accumsan orci. Vestibulum erat mi, tincidunt id volutpat vitae, vehicula vel magna. Nulla facilisi. Quisque quis egestas ligula. Proin sollicitudin mi massa, ut pretium turpis tincidunt vitae.

        </p>
        <Title text="Perfil del egresado" />
        <h5 className="font-bold mb-2 mt-2">¿Qué implica ser técnico en programación? </h5>
        <p className="text-justify">
            El Técnico en Programación participa en proyectos de desarrollo de software desempeñando roles que tienen por objeto analizar, diseñar, desarrollar e implementar sistemas informáticos.

        </p>
        <h5 className="font-bold mb-2 mt-2">¿Qué voy a poder realizar? </h5>
        <p className="text-justify">
            La actividad de un técnico en programación se basa en el constante aprendizaje de las tecnologías implementadas, la compresión, el planteamiento y la resolución de un problema, la constante documentación del proyecto, aplicación y estructuración de metodologías ágiles que optimicen los tiempos de producción y aplicación de normativas que gestionen y aseguren la calidad del producto.
        </p>
    </section>

        ;
}