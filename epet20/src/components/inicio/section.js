import { Link } from "react-router-dom";
import { Title } from "../text-styles/title";
import Image from "../../assets/icono-escuela.png"
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../general/loading";



export default function Section() {
    const [data, setData] = useState({});
    const obtenerTextosDeFirebase = async () => {
        const querySnapshot = await getDocs(collection(db, "textos"));
        querySnapshot.forEach((doc) => {
            setData({
                presentacion: doc.data().presentacion,
                perfilTecnico: doc.data().perfilTecnico,
                alcances: doc.data().alcances,
            });
        });
    }
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            obtenerTextosDeFirebase();
        }
        return () => mounted = false;

    }, [])

    return <section className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 main-color text-bold text-justify">
        <Title text="Un poco de nuestra historia" />
        <img className="img-fluid text-center mx-auto w-50 mt-4 mb-5" src={Image} alt="Logo EPET N°20" />

        {data.presentacion ? <p> {data.presentacion}  </p> : <LoadingSpinner />}


        <div className="mt-4">
            <Title text="Perfil del egresado" />
        </div>
        <h5 className="font-bold mb-2 mt-2">¿Qué implica ser técnico en programación? </h5>

        {data.perfilTecnico ? <p className="text-justify"> {' ' + data.perfilTecnico}      </p> : <LoadingSpinner />}


        <h5 className="font-bold mb-2 mt-4">¿Qué voy a poder realizar? </h5>
        {data.alcances ? <p className="text-justify"> {data.alcances}      </p> : <LoadingSpinner />}
        <Link to="/plan-de-estudios" className=" text-button text-center font-bold btn btn-sm btn-block text-large mt-4 mb-4">Ver más</Link>
    </section>


}