import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title'

import { Materias } from '../components/plan_estudios/table/materias'
import { Subtitle } from '../components/text-styles/subtitle'
import { FaPrint } from 'react-icons/fa'
import ReactToPrint from 'react-to-print';
import { Container } from 'reactstrap'
import Footer from '../components/inicio/footer';
import { useLoading } from '../hooks/useLoading'
import { LoadingSpinner } from '../components/general/loading'
import { AlertNotification } from '../components/general/alertNotification'
import { useDate } from '../hooks/useDate'
import { usePlan } from '../hooks/query_hooks/usePlan'

export const PlanDeEstudios = () => {
    const { loading, success, error, alertMessage, setLoading, setSuccess, setError, setAlertMessage, restartAlertsState } = useLoading()
    const ref = useRef(null)
    const { plan } = usePlan();
    const { formatYear } = useDate();
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
    useEffect(() => {
        document.title = "Plan de estudios - E.P.E.T N°20";
    })

    return (
        <>
            {plan ? <>



                <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} name="main">

                    <Container>
                        <div>
                            <div className='row  m-6' ref={ref}>

                                <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'></div>
                                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 '>
                                    <header className="bg-main-color my-shadow rounded-xl p-3 mt-4">

                                        <dl className='text-center' >
                                            <dt className="text-white">Escuela provincial de educación técnica número 20. </dt>

                                            <dd className="text-white">Ministerio de educación - Ciudad de Neuquén - Año {formatYear()}. </dd>



                                        </dl>


                                    </header>
                                    <div>
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
                                        {plan && plan.materias ? <>

                                            {plan.materias.length > 0 ? <div >
                                                <div className="mt-4">
                                                    <Title text="Listado de materias" />
                                                </div>

                                                <Container className='mx-auto'>
                                                    <div ><Subtitle text="Ciclo básico " /></div>


                                                    <Container className='mx-auto'>

                                                        <h1 className='font-bold mt-4 mb-2 pt-2 pb-2'>Primer año</h1>
                                                        <Materias showBasic={true} año={"1°"} />
                                                        <h1 className='font-bold mt-4 mb-2 pt-2 pb-2'>Segundo año</h1>
                                                        <Materias showBasic={true} año={"2°"} />
                                                        <h1 className='font-bold mt-4 mb-2 pt-2 pb-2'>Tercer año</h1>
                                                        <Materias showBasic={true} año={"3°"} />
                                                    </Container>
                                                </Container>
                                                <Container className='mx-auto'>
                                                    <div><Subtitle text="Ciclo superior " /></div>


                                                    <Container className='mx-auto'>

                                                        <h1 className='font-bold mt-4 mb-2 pt-2 pb-2'>Cuarto año</h1>
                                                        <Materias año={"4°"} />
                                                        <h1 className=' font-bold mt-4 mb-2 pt-2 pb-2'>Quinto año</h1>
                                                        <Materias año={"5°"} />
                                                        <h1 className='font-bold mt-4 mb-2 pt-2 pb-2'>Sexto año</h1>
                                                        <Materias año={"6°"} />
                                                    </Container>
                                                </Container>


                                            </div> : ''}
                                        </> : ''}


                                        <p id='labelMark' className=' text-muted text-center mb-4 mt-4'>Documento generado de la página oficial de la E.P.E.T. N°20 - Año {formatYear()}.</p>


                                    </div>


                                </div>



                            </div>
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

                                    trigger={() => <button className="btn btn-outline-primary"><p className='d-flex'> <FaPrint className='mr-2' />Imprimir plan de estudios</p> </button>}
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
