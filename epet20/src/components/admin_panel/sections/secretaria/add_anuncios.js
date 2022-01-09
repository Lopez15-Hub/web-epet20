import { addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { auth, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { Subtitle } from '../../../text-styles/subtitle'
import { Title } from '../../../text-styles/title'

export const AñadirAnuncio = () => {
    const { handleChange, values } = useForm();
    const { title, url, description, label } = values;
    const date = new Date();
    useEffect(() => {
        console.log(date)
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
            const docRef = await addDoc(collection(db, "anuncios"), {
                title: title,
                description: description,
                submitAt: date,
                submitBy: auth.currentUser.displayName,
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
                    <Title text="Añadir un anuncio" />


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

                        <Button type='submit' className='my-btn btn' >Añadir anuncio</Button>

                    </Form>


                </Row>
            </Container>
        </motion.div>)
}
