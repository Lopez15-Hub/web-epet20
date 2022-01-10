import { motion } from 'framer-motion'
import React from 'react'
import { Container } from 'reactstrap'
import { Anuncios } from '../../../secretaria/sectores/anuncios'
import { DocentesList } from '../../../secretaria/sectores/docentes'
import { EstudiantesList } from '../../../secretaria/sectores/estudiantes'
import { GeneralList } from '../../../secretaria/sectores/general'


export const SecretariaAdmin = () => {
    const [toggle, setToggle] = React.useState(false)
    const [show, setShow] = React.useState(false)

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >


            {
                toggle === 1 ? <>
                    <button onClick={() => setToggle(0)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Anuncios</button>
                    <Anuncios admin={true} />
                    <button onClick={() => setToggle(2)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Formularios</button></> : toggle === 2 ?
                    <>
                        <button onClick={() => setToggle(1)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Anuncios</button>
                        <button onClick={() => setToggle(0)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Formularios</button>
                        <ul>
                            {
                                show == 1 ?
                                    <li>
                                        <button onClick={() => setShow(0)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>General</button>
                                        <GeneralList admin={true} />
                                        <button onClick={() => setShow(2)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Docentes</button>
                                        <button onClick={() => setShow(3)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Estudiantes</button>
                                    </li> : show == 2 ? <li>
                                        <button onClick={() => setShow(1)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>General</button>
                                        <button onClick={() => setShow(0)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Docentes</button>
                                        <DocentesList admin={true} />

                                        <button onClick={() => setShow(3)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Estudiantes</button>
                                    </li> : show == 3 ? <li>
                                        <button onClick={() => setShow(1)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>General</button>
                                        <button onClick={() => setShow(2)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Docentes</button>
                                        <button onClick={() => setShow(0)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Estudiantes</button>
                                        <EstudiantesList admin={true} />

                                    </li> : <>
                                        <button onClick={() => setShow(1)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>General</button>
                                        <button onClick={() => setShow(2)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Docentes</button>
                                        <button onClick={() => setShow(3)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Estudiantes</button>
                                    </>
                            }


                        </ul>
                    </>
                    : <>
                        <button onClick={() => setToggle(1)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Anuncios</button>
                        <button onClick={() => setToggle(2)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Formularios</button>
                    </>
            }

        </motion.div>


    )
}
