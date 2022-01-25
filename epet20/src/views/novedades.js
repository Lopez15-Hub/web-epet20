import React, { useEffect, useState } from 'react'


import { Title } from '../components/text-styles/title'
import { motion } from 'framer-motion'

import Footer from '../components/inicio/footer'

import { Container, Row } from 'reactstrap'

import { Anuncio } from '../components/novedades/Advertisements'
import { BoxComments } from '../components/novedades/BoxComments'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
export const Novedades = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const q = query(collection(db, "novedades"), orderBy("submitAt", "desc"));
        const incomingPosts = [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                incomingPosts.push({ ...doc.data(), id: doc.id });

            });

        });
        setPosts(incomingPosts);
        return () => unsubscribe();
    }, []);


    return (
        <>
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 ">
                <div className="mb-4">
                    {/*  Area de novedades de la escuela */}
                    <Title text="Área de novedades" />
                    {/* Sección de Anuncios */}
                    <Container>
                        <Row>
                            <div className='col-sm-12 col-xs-12  col-md-3 col-lg-3 col-xl-3'></div>
                            <div className='col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6'>


                                <Anuncio />
                           



                            </div>

                        </Row>
                    </Container>

                </div>
                <Footer />
            </motion.div>
        </>
    )
}
