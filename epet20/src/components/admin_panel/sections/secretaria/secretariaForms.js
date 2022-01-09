import { addDoc, collection, getDocs, } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { Title } from '../../../text-styles/title'

export const SecretariaForms = () => {
    const { handleChange, values } = useForm();
    const date = new Date();
    const { title, url, description, label } = values;
    useEffect(() => {
        getDataFromFirestore();
    }, [])

    console.log(values);
    const getDataFromFirestore = async () => {
        const textsRef = collection(db, 'anuncios');

        const docSnap = await getDocs(textsRef);
    }

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
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container>
                <Row>
                    <Title text="Añadir un formulario" />


                    <Form onSubmit={createForm}>
                        <FormGroup>
                            <Label for="exampleEmail">
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
                            <Label for="exampleEmail">
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
                            <Label for="exampleEmail">
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
                            <Label for="exampleSelect">
                                Selecciona el sector
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleSelect"
                                name="label"
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
                        <Button type='submit' className='my-btn btn' >Añadir formulario</Button>

                    </Form>


                </Row>
            </Container>
        </motion.div>
    )
}



