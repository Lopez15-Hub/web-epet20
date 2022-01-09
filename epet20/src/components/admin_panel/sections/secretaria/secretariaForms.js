import { addDoc, collection} from 'firebase/firestore'
import { motion } from 'framer-motion'
import React from 'react'
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { UseLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Title } from '../../../text-styles/title'

export const SecretariaForms = () => {
    const { handleChange, values } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage } = UseLoading();
    const date = new Date();
    const { title, url, description, label } = values;
 

    const createForm = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "forms"), {
                title: title,
                description: description,
                url: url,
                label: label,
                submitAt: date,
            });
            console.log("Document written with ID: ", docRef.id);
            setAlertMessage("Formulario creado exitosamente.")
            setLoading(false);
            setSuccess(true);
        } catch (err) {
            if (title ===  null || title ===  "" || description ===  null || description ===  "" || url === null || url === "" || label === null || label === "") {
                setLoading(false);
                setWarning(true);
                setAlertMessage("Debes rellenar todos los campos para crear un formulario.");
            } else {
                setAlertMessage("Ha ocurrido un error al añadir los documentos: " + err.code)
                setLoading(false);
                setError(true);

                console.error("Error adding document: ", e);
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
                    <Title text="Añadir un formulario" />


                    <Form onSubmit={createForm}>
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
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Descripción
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="description"

                                type="textarea"
                                maxLength="500"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Link del formulario
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="url"

                                type="url"

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="exampleSelect">
                                Selecciona el sector
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleSelect"
                                name="label"
                                value="Selecciona una opción"
                                type="select"
                            >
                                <option>
                                    Estudiantes
                                </option>
                                <option>
                                    Docentes
                                </option>
                                <option>
                                    General
                                </option>

                            </Input>
                        </FormGroup>
                        <Button onClick={() => setLoading(true)} type='submit' className='my-btn btn' >Añadir formulario</Button>
                        {loading ? <LoadingSpinner text="Creando formulario..." /> : ''}
                    </Form>


                </Row>
            </Container>
        </motion.div>
    )
}



