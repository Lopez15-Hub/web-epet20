import { motion } from 'framer-motion'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { auth, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { useLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Title } from '../../../text-styles/title'
import { addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";

export const SecretariaForms = () => {
    const { id } = useParams();
    const { handleChange, values, reset } = useForm({
        url: "",

    });
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = useLoading();
    const date = new Date();
    const { title, url, description, label } = values;
    const [form, setForm] = useState({});

    const updateForm = async () => {
        const formRef = doc(db, "forms", id);
        const newFormData = {
            "title": !title ? '' : title,
            "description": description ? description : form.description,
            "submitAt": form.submitAt,
            "updatedAt": date,
            "submitBy": form.submitBy,
            "updatedBy": auth.currentUser.displayName,

        }
        await setDoc(formRef, newFormData, { merge: true }).then(() => {
            setAlertMessage("Anuncio actualizado exitosamente.")
            console.log("Anuncio actualizado")
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
                window.location.replace("/dashboard/secretaria/admin");
            }, 1000)
        }).catch(err => {
            if (title === form.title || description === form.description || title === '' || description === '') {
                setLoading(false);
                setWarning(true);
                setAlertMessage("Debes editar al menos un campo para editar el formulario.");
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
    const uploadForm = async () => {
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, "forms"), {
                "title": title ? title : '',
                "description": description ? description : '',
                "url": url ? url : '',
                "label": label ? label : '',
                "submitAt": date ? date : '',
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
        if (!id) {
            if (title === null || title === undefined || description === null || description === undefined || url === "" || label === null || label === undefined) {
                setWarning(true);
                setAlertMessage("Debes rellenar todos los campos para crear un formulario.");
                console.log("Debes rellenar todos los campos.");
                restartAlertsState();

            }


        } else { uploadForm(); }
        if (id && (title !== '' || description !== '' || url !== '' || label !== '' || !form.title || !form.description || !form.url || !form.label)) {
            updateForm();
            restartAlertsState();
        } else {
            setWarning(true);
            setAlertMessage("Debes editar al menos un campo para guardar el formulario.");
            console.log("Debes rellenar todos los campos.");
            restartAlertsState();
        }
    }
    const getForm = useCallback(async () => {
        if (id) {
            const formRef = doc(db, "forms", id);
            const docSnap = await getDoc(formRef);
            try {
                if (docSnap.exists()) {

                    const initialState = {
                        title: docSnap.data().title.toString() || '',
                        url: docSnap.data().url || '',
                        description: docSnap.data().description || '',
                        label: docSnap.data().label || '',
                        submitAt: docSnap.data().submitAt || '',
                        submitBy: docSnap.data().submitBy || '',


                    }
                    setForm(initialState)
                    console.log(form.title)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (e) { console.log(e) }

        } else {

            console.log("No userId");
        }

    }, [form.title, id])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (id) {
                document.title = "Editar formulario";
            } else {
                document.title = "Añadir formulario";
            }
            getForm();
        }
        return () => mounted = false;
    }, [getForm, id])

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                }
                <Row>
                    {id ? <Title text="Editar formulario" /> : <Title text="Crear formulario" />}


                    <Form onSubmit={createForm} onReset={reset}>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Titulo
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="title"
                                value={title}
                                defaultValue={form.title}
                                placeholder={form.title}
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
                                value={description}
                                name="description"
                                defaultValue={form.description}
                                invalid={description === ""}
                                type="textarea"
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
                                defaultValue={form.url}

                                id="exampleEmail"
                                name="url"
                                invalid={url === "" || form.url === "" || !url.startsWith("https://") || !form.url.startsWith("https://")}
                                type="url"

                            />
                            <FormFeedback>
                                {!url.startsWith("https://") && url !== "" ? 'Debe ingresar un link válido.' : url === "" || form.url === '' ? 'Debe añadir un link.' : ''}
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
                                invalid={!label || label === null || label === '' || form.label === ''}
                                value={label}

                            >
                                <option value={id ? form.label : ''}>
                                    {form.label ? form.label + " (Area actual)" : ' Seleccione una opción'}
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
                        <Button type='submit' className='my-btn btn' >{id ? 'Guardar cambios' : 'Añadir formulario'}</Button>
                        {loading ? <LoadingSpinner text="Creando formulario..." /> : ''}
                    </Form>


                </Row>
            </Container>
        </motion.div>
    )
}



