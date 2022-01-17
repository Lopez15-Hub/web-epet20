import { addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { auth, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { UseLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Title } from '../../../text-styles/title'

export const AñadirAnuncio = () => {
    const { id } = useParams();
    const { handleChange, values } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();
    const { title, description } = values;
    const date = new Date();
    const uploadForm = async () => {
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
    const createForm = async (e) => {

        e.preventDefault();
        if (title === undefined || !title || title === "" || description === undefined || !description || description === "") {

            setWarning(true);
            setAlertMessage("Debes rellenar todos los campos para crear un anuncio.");
            restartAlertsState();
        } else {
            setLoading(true);
            uploadForm();
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
                    <Title text="Añadir un anuncio" />


                    <Form onSubmit={createForm}>
                        <FormGroup>
                            <Label >
                                Titulo
                            </Label>
                            <Input
                                onChange={handleChange}

                                name="title"
                                value={title}
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
                                type="textarea"
                                maxLength="500"
                                invalid={description === ""}
                            />
                            <FormFeedback>
                                Tiene que adjuntar una descripción.
                            </FormFeedback>
                        </FormGroup>

                        <Button type='submit' className='my-btn btn' >Añadir anuncio</Button>
                        {loading ? <LoadingSpinner text="Subiendo..." /> : ''}
                    </Form>


                </Row>
            </Container>
        </motion.div>)
}
