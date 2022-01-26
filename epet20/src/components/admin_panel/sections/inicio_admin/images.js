import { addDoc, collection, deleteDoc, doc, query, onSnapshot } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Container, Form, FormGroup, Input, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { app, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { useLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Subtitle } from '../../../text-styles/subtitle'
import { Title } from '../../../text-styles/title'
import { v4 as uuidv4 } from 'uuid';
export const SliderImages = () => {
    const { handleChange, values, reset } = useForm();
    const { loading, setLoading, alertMessage, setError, setWarning, setAlertMessage, restartAlertsState, successFile, setSuccessFile, errorFile, warningFile, setErrorFile, setWarningFile } = useLoading();
    const { descriptionPhoto } = values;
    const [upload, setUpload] = useState(false)
    const [imagesFiles, setImagesFiles] = useState([])


    const addImageToFirestore = async (url, fileName) => {
        try {
            const imageRef = await addDoc(collection(db, "images"), {
                "name": fileName,
                "url": url.toString(),
                "description": descriptionPhoto ? descriptionPhoto : 'No se ha adjuntado descripción'
            });


            console.log("Document written with ID: ", imageRef.id);
            document.getElementById("form-image").reset();
            document.getElementById("image1").removeAttribute("disabled", '')
            document.getElementById("input1").removeAttribute("disabled", '')
            reset({
                descriptionPhoto: undefined,
                descriptionPhoto2: undefined,
                descriptionPhoto3: undefined,
            })
            setUpload(false)
            setAlertMessage("Imágen subida exitosamente.");
            setSuccessFile(true);
            restartAlertsState();
        } catch (err) {
            setUpload(false)
            setAlertMessage("Ha ocurrido un error al guardar la imágen en la base de datos. Error:", err.code);
            setErrorFile(true);
            restartAlertsState();
            console.error("Error adding document: ", err);
        }
    }
    const setImages = (url, fileName) => {
        if (url && fileName) {
            addImageToFirestore(url, fileName);
        } else {
            console.log("Ha ocurrido un error.")
        }
    }
    const handleDisabled = () => {
        if (descriptionPhoto !== undefined || descriptionPhoto !== '') {
            document.getElementById("input1").setAttribute("disabled", '')
            document.getElementById("image1").setAttribute("disabled", '')


        }
    }
    const handleImageFile = async (e) => {

        e.preventDefault();
        handleDisabled();
        setUpload(true);
        const file = e.target.files[0];
        if (file.name.split(".").pop() !== "jpg" && file.name.split(".").pop() !== "png" && file.name.split(".").pop() !== "jpeg") {
            document.getElementById("form-image").reset();
            setUpload(false);
            setAlertMessage("Solo se permiten archivos .jpg, jpeg, o .png");
            setWarning(true);
            restartAlertsState();
        } if (file.size > 8000000) {
            setLoading(false);

            setAlertMessage("El archivo es mayor a 8Mb.");

            setWarning(true);
            restartAlertsState();
        }
        else {
            const storageRef = app.storage().ref('/carousel-images/');
            const fileName = "Carousel-image-" + uuidv4()
            const filePath = storageRef.child(fileName);
            await filePath.put(file).then(async () => {
                console.log("File uploaded");
            }).catch((err) => {
                setUpload(false);
                setAlertMessage("Error al subir el archivo: ", err.code);
                setError(true);
                restartAlertsState();
            })
            const url = await filePath.getDownloadURL();
            const finalUrl = url.toString();
            setImages(finalUrl, fileName);

        }





    }
    const deleteImage = async (id, fileName) => {
        var confirm = window.confirm("Esta seguro que desea eliminar esta imágen? Esta acción es irreversible.");
        if (confirm) {

            setLoading(true);
            const imagesRef = doc(db, 'images', id);
            await deleteDoc(imagesRef).then(async () => {
                const storageRef = app.storage().ref('/carousel-images/' + fileName);
                await storageRef.delete().then(() => {
                    console.log("Archivo eliminado exitosamente de storage.");
                    setLoading(false);
                    setAlertMessage("Imágen eliminada exitosamente.");
                    setSuccessFile(true);
                    restartAlertsState();
                }).catch((err) => {
                    console.log("Ha ocurrido un error al eliminar el archivo. Error:", err.code);
                    setLoading(false);
                    setAlertMessage("Ha ocurrido un error al eliminar el archivo. Error: ", err.code);
                    setErrorFile(true);
                    setLoading(false);
                    restartAlertsState();
                });

            }).catch(err => {
                console.log("Ha ocurrido un error al eliminar el archivo de la base de datos. Error:", err.code);
                setLoading(false);
                setAlertMessage("Ha ocurrido un error al eliminar el archivo. Error: ", err.code);
                setErrorFile(true);
                setLoading(false);
                restartAlertsState();
            });


        }


    }

    useEffect(() => {
        const q = query(collection(db, "images"));
        const images = [];
        document.title = "Editar imágenes del slider - Panel de control"
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                images.push({ ...doc.data(), id: doc.id });

            });
            setImagesFiles(images);
        });

        return () => unsubscribe();
    }, [imagesFiles]);

    return <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
        <Container className='border'>

            <Row>

                {successFile ?
                    <AlertNotification variant="success" dimiss={() => setSuccessFile(false)} message={alertMessage} /> :
                    errorFile ? <AlertNotification color="danger" dimiss={() => setErrorFile(false)} message={alertMessage} /> : warningFile ?
                        <AlertNotification color="warning" dimiss={() => setWarningFile(false)} message={alertMessage} /> : ''
                }
                <Form id="form-image" className='p-4'>
                    <Title text="Añadir imágenes al slider" />
                    {upload ? <LoadingSpinner text="Subiendo imágen..." /> : ''}
                    <FormGroup className='mb-4'>
                        <div className='font-bold mb-2'> <Subtitle text="Imágen" /></div>
                        <label className='main-color'>Descripción de imágen</label>
                        <p className='text-muted'>Máximo 120 carácteres</p>
                        <Input id="image1" onChange={handleChange} type="text" maxLength={120} className='mb-4' name="descriptionPhoto" />
                        {
                            descriptionPhoto !== undefined && descriptionPhoto !== '' ? <>
                                <Input id="input1" type="file" onChange={handleImageFile} />
                                <p className='text-muted'>El peso de la imágen no debe ser mayor a 8Mb.</p>

                            </> : ''
                        }

                    </FormGroup>



                </Form>
                {
                    loading ? <LoadingSpinner text="Cargando imágenes..." /> : <>
                        <Title text={"Todas las imágenes (" + imagesFiles.length + ")"} />

                        {
                            imagesFiles.map(image =>
                                <ListGroup key={image.id} className='p-2'>
                                    <ListGroupItem>
                                        <p className='font-bold'> Identificador de imágen</p>
                                        <p> {image.id + " "}</p>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <p className='font-bold'> Nombre</p>
                                        <p> {image.name}</p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <p className='font-bold'> Descripción </p>
                                        <p>{image.description ? image.description : 'Descripción: Sin especificar'}</p>
                                    </ListGroupItem>
                                    <ListGroupItem                                        >
                                        <p className='font-bold'> URL </p>
                                        <a href={image.url}>{image.url ? image.url : 'URL sin especificar.'}</a>
                                    </ListGroupItem>


                                    <ListGroupItem className='d-flex'>

                                        <button type="button" onClick={() => deleteImage(image.id, image.name)} className='btn red d-flex' id="exampleSelect" ><p className='mr-2'>Eliminar</p><FaTrash /></button>
                                    </ListGroupItem>

                                </ListGroup>


                            )
                        }</>
                }

            </Row>








        </Container>
    </motion.div>;
};
