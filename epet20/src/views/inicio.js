import Navbar from '../components/inicio/navbar';
import MyCarousel from '../components/inicio/carousel';

import Footer from '../components/inicio/footer';
import Section from '../components/inicio/section';
import React, { useEffect } from 'react'
import { Title } from '../components/text-styles/title';

import { motion } from 'framer-motion';
import db from '../firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { Signatures } from '../components/inicio/signatures';



export const Inicio = () => {
    useEffect(() => {
        const obtenerDatos = async () => {
            const querySnapshot = await getDocs(collection(db, "user"));
            for (let doc of querySnapshot.docs) {
                console.log(doc.data());
            }
        }
        obtenerDatos();

    }, [])
    return (
        <>
            {/*Barra de navegación*/}
            <Navbar />

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container shadow-xl bg-white rounded-xl mt-6" >

                <div className="row">

                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <Title text="Bienvenido a nuestra institución" />
                        {/*Carousel de imágenes*/}
                        <MyCarousel />
                        {/*Stack de materias*/}
                        <Title text="En esta escuela aprenderás" />
                        <Signatures />
                    </div>

                    <Section />



                </div>


            </motion.div>
            {/*FOOOTER*/}
            <Footer />
        </>

    )
}
