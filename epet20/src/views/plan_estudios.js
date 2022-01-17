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
import { usePlan } from '../hooks/query_hooks/usePlan'

export const PlanDeEstudios = () => {
    const { loading, success, error, alertMessage, setLoading, setSuccess, setError, setAlertMessage, restartAlertsState } = UseLoading()
    const ref = useRef(null)
    const { plan } = usePlan();
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
            {plan ? <>



                <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" mt-4  " name="main" >
                    <div fluid className='p-2 mb-4'>




                    </div>
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
                                        <p>{plan.title}</p>
                                    </div>
                                    <div>
                                        <div>
                                            <div className="font-bold"> <Subtitle text="Perfil del egresado" /></div>
                                            <p className='text-justify'>{plan.profile}</p>
                                        </div>
                                        <div>
                                            <div className="font-bold"> <Subtitle text="Alcance del título" /></div>
                                            <p className='text-justify'>{plan.alcances}</p>
                                        </div>
                                    </div>
                                    {/*Stack de materias*/}
                                    <div >
                                        <div className="mt-4">
                                            <Title text="Listado de materias" />
                                        </div>

                                        <Container className='p-6 mt-4  mx-auto'>
                                            <div className='mb-2'><Subtitle text="Ciclo Básico " /></div>

                                            <Materias showBasic={true} />


                                        </Container>

                                        <Container className='p-6 mt-4   mx-auto'>
                                            <div className='mt-2 mb-2'><Subtitle text="Ciclo Superior" /></div>

                                            <Materias />
                                        </Container>

                                    </div>


                                    <p id='labelMark' className=' text-muted text-center mb-4'>Documento generado de la página oficial de la E.P.E.T. N°20 - Año {formatDate()}.</p>


                                </div>


                            </div>
                            <div className='col-1'></div>


                        </div>
                        <Container>

                            <div className='text-center'>
                                {success ?
                                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : ''
                                }
                                {loading ? <LoadingSpinner text="Generando pdf..." /> : null}
                                {/*Módulo de impresión*/}
                                <ReactToPrint

                                    trigger={() => <button className="btn btn-outline-primary ml-4 "><p className='d-flex'> <FaPrint className='mr-2' />Imprimir plan de estudios</p> </button>}
                                    content={() => ref.current}
                                    documentTitle='E.P.E.T N°20 - Plan de estudios.pdf'
                                    onBeforePrint={beforePrint}
                                    onPrintError={errorPrint}
                                    onAfterPrint={afterPrint}





                                />
                                <p className=' text-muted text-center mb-4'>Nota: También puedes guardar el plan en formato PDF.</p>

                            </div>
                        </Container>


                    </Container>
                    {/*FOOOTER*/}
                    <Footer />

                </motion.div>
            </> : <div className='mx-auto p-6'><LoadingSpinner text="Cargando datos..." /></div>
            }
        </>
    )
}
