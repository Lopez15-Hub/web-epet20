import { doc, getDoc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'reactstrap'
import { db } from '../../../firebase/firebaseConfig'
import { useForm } from '../../../hooks/useForm'
import { UseLoading } from '../../../hooks/useLoading'
import { AlertNotification } from '../../general/alertNotification'
import { LoadingSpinner } from '../../general/loading'
import { Subtitle } from '../../text-styles/subtitle'
import { Title } from '../../text-styles/title'

export const InicioAdmin = () => {
    const { handleChange, values } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();
    const { presentacion, alcances, perfilTec } = values;
    const getDataFromFirestore = async () => {
        setAlertMessage("Obteniendo datos.");
        setLoading(true);

        const textsRef = doc(db, 'textos', 'presentacion');

        const docSnap = await getDoc(textsRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setPresentaciones({
                presentacion: docSnap.data().presentacion,
                alcances: docSnap.data().alcances,
                perfilTecnico: docSnap.data().perfilTecnico,
            });
            setLoading(false);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setAlertMessage("No hay datos disponibles.");
            setLoading(false);
        }
    }
    useEffect(() => {
        getDataFromFirestore();
    }, []);
    const [presentaciones, setPresentaciones] = useState({
        presentacion: presentacion,
        alcances: alcances,
        perfilTecnico: perfilTec,

    });
    console.log(values);


    const editPresentacion = (e) => {
        e.preventDefault();
        const textsRef = doc(db, 'textos', 'presentacion');
        if (presentacion || alcances || perfilTec) {
            setAlertMessage("Actualizando datos...");
            setLoading(true);
            setSuccess(false);
            setError(false);
            setWarning(false);
            setDoc(textsRef, {
                presentacion: presentacion || presentaciones.presentacion,
                alcances: alcances || presentaciones.alcances,
                perfilTecnico: perfilTec || presentaciones.perfilTecnico,
            }).then(() => {
                setAlertMessage("Textos actualizados exitosamente.");
                setLoading(false);
                setSuccess(true);
            }).catch((err) => {
                setAlertMessage("Ha ocurrido un error al actualizar los textos: " + err.code);
                setLoading(false);
                setError(true);

            });

        } else {
            setAlertMessage("Debes editar al menos un campo para actualizar los textos.");
            setLoading(false);
            setWarning(true);
            restartAlertsState();
        }

    }



    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <Container>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                }

                {
                    loading ?
                        <LoadingSpinner text={alertMessage} /> :
                        <Row>
                            <Title text="Inicio" />

                            <form className='mt-4' onSubmit={editPresentacion} >


                                <div className='from-group row'>
                                    <div className=' col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4'>
                                        <div className='font-bold'> <Subtitle text="Editar párrafo de presentación" /></div>
                                        <textarea value={presentacion} type="textarea" onChange={handleChange} defaultValue={presentaciones.presentacion} className='m-4 form-control-lg border' name="presentacion" cols="30" rows="10" />

                                    </div>

                                    <div className='col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4'>
                                        <div className='font-bold'><Subtitle text="Editar párrafo de perfil técnico" /></div>
                                        <textarea value={perfilTec} onChange={handleChange} defaultValue={presentaciones.perfilTecnico} className='m-4  form-control-lg border' name="perfilTec" cols="30" rows="10" />
                                    </div>
                                    <div className='col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4'>
                                        <div className='font-bold'><Subtitle text="Editar párrafo de alcances" /></div>

                                        <textarea value={alcances} onChange={handleChange} defaultValue={presentaciones.alcances} className='m-4  form-control-lg border' name="alcances" cols="30" rows="10" />
                                    </div>


                                </div>
                                <button type="submit" className=" my-btn btn-lg mt-4 ">Guardar cambios</button>

                            </form>
                        </Row>
                }







            </Container>
        </motion.div>
    )
}
