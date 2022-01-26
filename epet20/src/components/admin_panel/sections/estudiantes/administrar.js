import React from 'react'
import { motion } from 'framer-motion'
import { EducacionFisica } from '../../../estudiantes/ed-fisica'
import { Teoria } from '../../../estudiantes/teoria'
import { Taller } from '../../../estudiantes/taller'

export const FilesOfStudents = () => {
    const [toggle, setToggle] = React.useState(false)
    const [show, setShow] = React.useState(false)
    React.useEffect(() => {
        document.title = "Administrar archivos de estudiantes - Panel de control";
      },[])
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >


            {
                toggle === 1 ? <>
                    <button onClick={() => setToggle(2)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Archivos</button></> : toggle === 2 ?
                    <>
                        <button onClick={() => setToggle(0)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Archivos</button>
                        <ul>
                            {
                                show === 1 ?
                                    <li>
                                        <button onClick={() => setShow(0)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Teoría</button>
                                        <Teoria admin={true} />
                                        <button onClick={() => setShow(2)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Taller</button>
                                        <button onClick={() => setShow(3)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Educación física</button>
                                    </li> : show === 2 ? <li>
                                        <button onClick={() => setShow(1)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Teoría</button>
                                        <button onClick={() => setShow(0)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Taller</button>
                                        <Taller admin={true} />
                                        <button onClick={() => setShow(3)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Educación física</button>
                                    </li> : show === 3 ? <li>
                                        <button onClick={() => setShow(1)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Teoría</button>
                                        <button onClick={() => setShow(2)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Taller</button>
                                        <button onClick={() => setShow(0)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Educación Física</button>
                                        <EducacionFisica admin={true} />

                                    </li> : <>
                                        <button onClick={() => setShow(1)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Teoría</button>
                                        <button onClick={() => setShow(2)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Taller</button>
                                        <button onClick={() => setShow(3)} className='border p-4 m-2 col-12 btn-block  rounded-xl font-bold main-color'>Educación Física</button>
                                    </>
                            }


                        </ul>
                    </>
                    : <>
                        <button onClick={() => setToggle(2)} className='border p-4 m-2 col-12 btn-block shadow-md rounded-xl font-bold main-color'>Archivos</button>
                    </>
            }

        </motion.div>)
}
