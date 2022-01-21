import React from 'react'


import { Title } from '../components/text-styles/title'
import { motion } from 'framer-motion'

import Footer from '../components/inicio/footer'

import { Container, Row } from 'reactstrap'

import { Anuncio } from '../components/novedades/Advertisements'
import { BoxComments } from '../components/novedades/BoxComments'
export const Novedades = () => {
    return (
        <>
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mt-4 ">
                <div className=" p-6 shadow-lg rounded-t-xl">
                    {/*  Area de novedades de la escuela */}
                    <Title text="Área de novedades" />
                    {/* Sección de Anuncios */}
                    <Container>
                        <Row>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <div>
                                    <Anuncio />
                                    {/* Caja de comentarios */}
                                    <BoxComments />
                                </div>
                            </div>
                        </Row>
                    </Container>

                </div>
                <Footer />
            </motion.div>
        </>
    )
}
