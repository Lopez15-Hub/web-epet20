import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Container, Form, FormGroup, Input, Row } from 'reactstrap'
import { app, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { useLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Subtitle } from '../../../text-styles/subtitle'
import { Title } from '../../../text-styles/title'

export const InicioAdmin = () => {
    const { handleChange, values, reset } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState} = useLoading();
    const { presentacion, alcances, perfilTec } = values;



    useEffect(() => {
        let mounted = true
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
        if (mounted) {
            getDataFromFirestore();
        }
        return () => mounted = false;
    }, [setAlertMessage, setLoading, setSuccess, setError, setWarning]);
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
                restartAlertsState();
                reset({
                    presentacion: undefined,
                    alcances: undefined,
                    perfilTec: undefined,
                });

            }).catch((err) => {
                setAlertMessage("Ha ocurrido un error al actualizar los textos: " + err.code);
                setLoading(false);
                setError(true);
                restartAlertsState();
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
            <Container className='border'>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                }

                {
                    loading ?
                        <LoadingSpinner text={alertMessage} /> :
                        <Row>

                            <Form onSubmit={editPresentacion} className='p-4'>
                                <Title text="Editar datos generales" />
                                <FormGroup>
                                    <div className='font-bold'> <Subtitle text="Editar párrafo de presentación" /></div>
                                    <Input value={presentacion} type="textarea" onChange={handleChange} defaultValue={presentaciones.presentacion} name="presentacion" cols="20" rows="5" />

                                    <div className='font-bold'><Subtitle text="Editar párrafo de perfil técnico" /></div>
                                    <Input value={perfilTec} type="textarea" onChange={handleChange} defaultValue={presentaciones.perfilTecnico} name="perfilTec" cols="30" rows="5" />

                                    <div className='font-bold'><Subtitle text="Editar párrafo de alcances" /></div>
                                    <Input value={alcances} type="textarea" onChange={handleChange} defaultValue={presentaciones.alcances} name="alcances" cols="30" rows="5" />

                                </FormGroup>

                                <button type="submit" className=" btn my-btn  mt-4 mb-4 ">Guardar cambios</button>


                            </Form>
                       


                        </Row>
                }







            </Container>
        </motion.div>
    )
}
