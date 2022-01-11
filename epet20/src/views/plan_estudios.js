import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title'

import { Materias } from '../components/plan_estudios/table/materias'
import { Subtitle } from '../components/text-styles/subtitle'
import { FaPrint } from 'react-icons/fa'
import ReactToPrint from 'react-to-print';
import { Container } from 'reactstrap'
import Footer from '../components/inicio/footer';
import { UseLoading } from '../hooks/useLoading'
import { LoadingSpinner } from '../components/general/loading'
import { AlertNotification } from '../components/general/alertNotification'
import { useDate } from '../hooks/useDate'

export const PlanDeEstudios = () => {
    const { loading, success, error, alertMessage, setLoading, setSuccess, setError, setAlertMessage, restartAlertsState } = UseLoading()
    const ref = useRef(null)
   
    const { formatDate } = useDate();
    const beforePrint = () => {
        setLoading(true)
    }
    const afterPrint = () => {

        setLoading(false)
        setAlertMessage("PDF generado exitosamente. ")
        setSuccess(true)
        restartAlertsState()
    }
    const errorPrint = () => {
        setLoading(false)
        setAlertMessage("Ocurrió un error al crear el PDF. ")
        setError(true)
        restartAlertsState()
    }
    return (
        <>
            {/*Barra de navegación*/}
            <div fluid className='mt-2 mb-4'>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : ''
                }

                <ReactToPrint

                    trigger={() => <div className='row'><button className="btn btn-outline-primary ml-4 col-2"><p p className='d-flex'> <FaPrint className='mr-2' />Imprimir plan de estudios</p> </button><p className='col-2 text-muted text-justify '>Nota: También puedes guardar el plan en formato PDF.</p> </div>}
                    content={() => ref.current}
                    documentTitle='E.P.E.T N°20 - Plan de estudios.pdf'

                    onPrintError={errorPrint}
                    onAfterPrint={afterPrint}
                    onBeforePrint={beforePrint}




                />

                {loading ? <LoadingSpinner text="Generando pdf..." /> : null}

            </div>

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" mt-4  " >
                <Container>
                    <div className='row' ref={ref}>
                        <div className='col-1'></div>
                        <div className="row p-7 col-10" >
                            <header className="bg-main-color shadow-md rounded-xl p-3">

                                <dl >
                                    <dt className="text-white">Escuela provincial de educación técnica número 20. </dt>

                                    <dd className="text-white">Ministerio de educación - Ciudad de Neuquén - Año {formatDate()}. </dd>



                                </dl>


                            </header>
                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-12 col-xl-12">
                                <div className="mb-4">
                                    <Title text="Plan de estudios" />
                                    <div className='font-bold'> <Subtitle text="Título" /> </div>
                                    <p>Técnico en programación - Plan 682</p>
                                </div>
                                <div>
                                    <div>
                                        <div className="font-bold"> <Subtitle text="Perfil del egresado" /></div>
                                        <p className='text-justify'>El Técnico en Programación participa en proyectos de desarrollo de software desempeñando roles que tienen por objeto analizar, diseñar, desarrollar e implementar sistemas informáticos.</p>
                                    </div>
                                    <div>
                                        <div className="font-bold"> <Subtitle text="Alcance del título" /></div>
                                        <p className='text-justify'>La actividad de un técnico en programación se basa en el constante aprendizaje de las tecnologías implementadas, la compresión, el planteamiento y la resolución de un problema, la constante documentación del proyecto, aplicación y estructuración de metodologías ágiles que optimicen los tiempos de producción y aplicación de normativas que gestionen y aseguren la calidad del producto.</p>
                                    </div>
                                </div>
                                {/*Stack de materias*/}
                                <div >
                                    <div className="mt-4">
                                        <Title text="Listado de materias" />
                                    </div>

                                    <div >
                                        <Subtitle text="Ciclo Básico" />
                                        <Materias />
                                        <Subtitle text="Ciclo Superior" />
                                        <Materias />



                                    </div>
                                </div>





                            </div>

                        </div>
                        <div className='col-1'></div>

                    </div>

                </Container>


                {/*FOOOTER*/}
                <Footer />


            </motion.div>

        </>
    )
}
