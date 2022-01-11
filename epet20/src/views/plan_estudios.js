import React from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title'
import Footer from '../components/inicio/footer'
import Section from '../components/inicio/section'
import { Materias } from '../components/plan_estudios/table/materias'
import { Subtitle } from '../components/text-styles/subtitle'
import { FaDownload, FaPrint } from 'react-icons/fa'
export const PlanDeEstudios = () => {
    return (
        <>
            {/*Barra de navegación*/}


            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container shadow-xl bg-white rounded-xl p-6 " >

                <div className="row">

                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <div className="mb-4">
                            <Title text="Plan de estudios" />
                            <Subtitle text="Técnico en programación - Plan 682" />
                        </div>

                        {/*Stack de materias*/}
                        <div className="mt-4">
                            <Title text="Listado de materias" />
                        </div>
                        <div>
                            <Subtitle text="Ciclo Básico" />
                            <Materias />
                            <Subtitle text="Ciclo Superior" />
                            <Materias />



                        </div>

                        <button className="col-4 btn btn-primary  mr-4 "><p className='d-flex' ><FaDownload className='mr-2' />Descargar plan de estudios</p> </button>
                        <button className="col-4 btn btn-outline-warning ml-4 "><p p className='d-flex'> <FaPrint className='mr-2' />Imprimir materias</p> </button>

                    </div>

                    <Section />



                </div>


            </motion.div>
            {/*FOOOTER*/}
            <Footer />
        </>
    )
}
