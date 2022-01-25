import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { auth, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { useLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Title } from '../../../text-styles/title'
import { addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";
export const AñadirAnuncio = () => {
    const { id } = useParams();
    const { handleChange, values } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = useLoading();
    const { title, description } = values;
    const date = new Date();
    const [anuncio, setAnuncio] = useState({});


    const getAnuncio = async () => {
        if (id) {
            const anunciosRef = doc(db, "anuncios", id);
            const docSnap = await getDoc(anunciosRef);
            try {
                if (docSnap.exists()) {

                    const initialState = {
                        title: docSnap.data().title || '',
                        description: docSnap.data().description || '',
                        submitAt: docSnap.data().submitAt || '',
                        submitBy: docSnap.data().submitBy || '',

                    }
                    setAnuncio(initialState)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (e) { console.log(e) }

        } else {
            console.log("No anuncio id");
        }

    }
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getAnuncio();
        }
        return () => mounted = false;
    })
    const updateAnuncio = async () => {
        const anunciosRef = doc(db, "anuncios", id);
        const newAnuncioData = {
            title: title ? title : anuncio.title,
            description: description ? description : anuncio.description,
            submitAt: anuncio.submitAt,
            updatedAt: date,
            submitBy: anuncio.submitBy,
            updatedBy: auth.currentUser.displayName,

        }
        await setDoc(anunciosRef, newAnuncioData, { merge: true }).then(() => {
            setAlertMessage("Anuncio actualizado exitosamente.")
            console.log("Anuncio actualizado")
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
                window.location.replace("/dashboard/secretaria/anuncios");
            }, 1000)
        }).catch(err => {
            if (title === anuncio.title || description === anuncio.description || title === '' || description === '') {
                setLoading(false);
                setWarning(true);
                setAlertMessage("Debes editar al menos un campo para editar el anuncio.");
                restartAlertsState();
            } else {
                setAlertMessage("Ha ocurrido un error al añadir los documentos: " + err.code)
                setLoading(false);
                setError(true);
                restartAlertsState();
                console.error("Error adding document: ", err.code);
            }
        });
    }
    const addAnuncio = async () => {
        try {
            const docRef = await addDoc(collection(db, "anuncios"), {
                title: title,
                description: description,
                submitAt: date,
                submitBy: auth.currentUser.displayName,
            });

            console.log("Document written with ID: ", docRef.id);
            setAlertMessage("Anuncio guardado exitosamente.")
            setLoading(false);
            setSuccess(true);
            setTimeout(() => { window.location.reload() }, 1000)
        } catch (err) {
            if (title === undefined || !title || title === "" || description === undefined || !description || description === "") {
                setLoading(false);
                setWarning(true);
                setAlertMessage("Debes rellenar todos los campos para crear un anuncio.");
                restartAlertsState();
            } else {
                setAlertMessage("Ha ocurrido un error al añadir los documentos: " + err.code)
                setLoading(false);
                setError(true);
                restartAlertsState();
                console.error("Error adding document: ", err.code);
            }


        }
    }
    const uploadForm = async () => {
        if (id) {
            updateAnuncio();
        } else {
            addAnuncio();
        }



    }
    const createForm = async (e) => {

        e.preventDefault();
        if (title === anuncio.title || description === anuncio.description) {
            setLoading(false);
            setWarning(true);
            setAlertMessage("Debes editar al menos un campo para editar el anuncio.");
            restartAlertsState();
        } else {
            setLoading(true);
            if (title === undefined || !title || title === "" || description === undefined || !description || description === "") {

                setWarning(true);
                setAlertMessage("Debes rellenar todos los campos para crear un anuncio.");
                restartAlertsState();
            } else {
                uploadForm();
            }

        }

    }

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                }
                <Row>
                    {id ? <Title text="Editar anuncio" /> : <Title text="Añadir un anuncio" />}


                    <Form onSubmit={createForm}>
                        <FormGroup>
                            <Label >
                                Titulo
                            </Label>
                            <Input
                                onChange={handleChange}
                                name="title"
                                defaultValue={anuncio.title}
                                placeholder="Ingrese un titulo"
                                type="text"
                                invalid={title === ""}
                            />
                            <FormFeedback>
                                El título es requerido.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Descripción
                            </Label>
                            <Input
                                onChange={handleChange}
                                name="description"
                                value={description}
                                defaultValue={anuncio.description}
                                type="textarea"
                                maxLength="500"
                                invalid={description === ""}
                            />
                            <FormFeedback>
                                Tiene que adjuntar una descripción.
                            </FormFeedback>
                        </FormGroup>

                        <Button type='submit' className='my-btn btn' >{id ? 'Guardar cambios' : 'Añadir anuncio'}</Button>
                        {loading ? <LoadingSpinner text="Subiendo..." /> : ''}
                    </Form>


                </Row>
            </Container>
        </motion.div>)
}
