import { addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React from 'react'
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { UseLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Title } from '../../../text-styles/title'

export const SecretariaForms = () => {
    const { handleChange, values, reset } = useForm({
        url: "",

    });
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage,restartAlertsState } = UseLoading();
    const date = new Date();
    const { title, url, description, label } = values;
    const uploadForm = async () => {
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, "forms"), {
                "title": title,
                "description": description,
                "url": url,
                "label": label,
                "submitAt": date,
            });
            console.log("Document written with ID: ", docRef.id);
            console.log(values);
            setAlertMessage("Formulario creado exitosamente.")
            setLoading(false);
            setSuccess(true);
           
            setTimeout(() => { window.location.reload() }, 1000)
        } catch (err) {

            setLoading(false);
            setError(true);
            setAlertMessage(err.message);
            restartAlertsState();

        }
    }
    const createForm = async (e) => {
        e.preventDefault();
        if (title === null || title === undefined || description === null || description === undefined || url === "" || label === null || label === undefined) {
            setWarning(true);
            setAlertMessage("Debes rellenar todos los campos para crear un formulario.");
            console.log("Debes rellenar todos los campos.");
            restartAlertsState();


        } else {
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
                    <Title text="Añadir un formulario" />


                    <Form onSubmit={createForm} onReset={reset}>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Titulo
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="title"
                                placeholder="Ingrese un titulo"
                                type="text"
                                invalid={title === ""}
                            />
                            <FormFeedback>
                                El título es requerido.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Descripción
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="description"
                                invalid={description === ""}
                                type="textarea"

                                value={description}
                                maxLength="500"
                            />
                            <FormFeedback>
                                {'Debe añadir una descripción.'}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Link del formulario
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="url"
                                invalid={url === "" || !url.startsWith("https://")}
                                type="url"

                            />
                            <FormFeedback>
                                {!url.startsWith("https://") && url !== "" ? 'Debe ingresar un link válido.' : url === "" ? 'Debe añadir un link.' : ''}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup >
                            <Label
                                for="exampleSelect"
                                sm={2}

                            >
                                Area
                            </Label>

                            <Input
                                onChange={handleChange}
                                id="exampleSelect"
                                name="label"
                                type="select"
                                invalid={!label || label === null || label === ''}
                                value={label}

                            >
                                <option value="">
                                    Seleccione una opción
                                </option>
                                <option value="estudiantes" >
                                    Estudiantes
                                </option>
                                <option value="docentes">
                                    Docentes
                                </option>
                                <option value="general">
                                    General
                                </option>

                            </Input>
                            <FormFeedback>
                                Debe seleccionar una opción.
                            </FormFeedback>
                        </FormGroup>
                        <Button type='submit' className='my-btn btn' >Añadir formulario</Button>
                        {loading ? <LoadingSpinner text="Creando formulario..." /> : ''}
                    </Form>


                </Row>
            </Container>
        </motion.div>
    )
}



