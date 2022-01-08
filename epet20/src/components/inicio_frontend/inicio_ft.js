import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'reactstrap'
import { db } from '../../firebase/firebaseConfig'
import { useForm } from '../../hooks/useForm'
import { Subtitle } from '../text-styles/subtitle'
import { Title } from '../text-styles/title'

export const InicioFT = () => {
    const { handleChange, values } = useForm();
    const { presentacion, alcances, perfilTec } = values;
    useEffect(() => {
        getDataFromFirestore();
    }, [])
    const [presentaciones, setPresentaciones] = useState({
        presentacion: presentacion,
        alcances: alcances,
        perfilTecnico: perfilTec,

    });
    console.log(values);
    const getDataFromFirestore = async () => {
        const textsRef = doc(db, 'textos', 'presentacion');

        const docSnap = await getDoc(textsRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPresentaciones({
                presentacion: docSnap.data().presentacion,
                alcances: docSnap.data().alcances,
                perfilTecnico: docSnap.data().perfilTecnico,
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const editPresentacion = (e) => {
        e.preventDefault();
        const textsRef = doc(db, 'textos', 'presentacion');
        setDoc(textsRef, {
            presentacion: presentacion || presentaciones.presentacion,
            alcances: alcances || presentaciones.alcances,
            perfilTecnico: perfilTec || presentaciones.perfilTecnico,




        }).then(() => {
            console.log('Documento agregado');
        }).catch((e) => {
            console.log('Error al agregar documento');
            console.log(e);
        });
    }

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container>
                <Row>
                    <Title text="Inicio" />


                    <form className='mx-auto mt-4 p-4' onSubmit={editPresentacion} >


                        <div className='from-group row shadow-md'>
                            <div className=' col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4'>
                                <div className='font-bold'> <Subtitle text="Editar párrafo de presentación" /></div>
                                <input value={presentacion} onChange={handleChange} defaultValue={presentaciones.presentacion} className='form-control-lg border' name="presentacion" cols="30" rows="10" />

                            </div>

                            <div className='col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4'>
                                <div className='font-bold'><Subtitle text="Editar párrafo de perfil técnico" /></div>
                                <input value={perfilTec} onChange={handleChange} defaultValue={presentaciones.perfilTecnico} className='form-control-lg border' name="perfilTec" cols="30" rows="10" />
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4'>
                                <div className='font-bold'><Subtitle text="Editar párrafo de alcances" /></div>

                                <input value={alcances} onChange={handleChange} defaultValue={presentaciones.alcances} className='form-control-lg border' name="alcances" cols="30" rows="10" />
                            </div>


                        </div>
                        <button type="submit" className=" my-btn btn-lg mt-4 ">Guardar cambios</button>

                    </form>




                </Row>
            </Container>
        </motion.div>
    )
}
