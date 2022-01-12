
import { doc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React from 'react'
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { db } from '../../../../firebase/firebaseConfig'
import { usePlan } from '../../../../hooks/query_hooks/usePlan'
import { useForm } from '../../../../hooks/useForm'
import { UseLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Subtitle } from '../../../text-styles/subtitle'
import { Title } from '../../../text-styles/title'

export const EditPlanDeEstudios = () => {
    const { handleChange, values, reset } = useForm({
    });
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();
    const { title, profile, materia, año, alcances } = values;
    const { plan } = usePlan();
    const planMaterias = plan.materias ? plan.materias : [];
    const [materias, setMaterias] = React.useState([]);
    const singleMateria = {
        "materia": materia,
        "año": año,
        "ciclo": año === '1°' || año === '2°' || año === '3°' ? 'basico' : 'superior',
    }
    const addMateria = () => {
        handleMaterias();
    }
    const handleMaterias = () => {
        if (singleMateria.materia !== "" && singleMateria.año !== "" && singleMateria.materia !== undefined && singleMateria.año !== undefined) {
            setMaterias([...materias, singleMateria]);
            console.log(materias);
            document.getElementById("formMateria").reset();
        } else {
            setAlertMessage("Debes especificar una materia y su año para añadirla.");
            setWarning(true);
            setTimeout(() => { restartAlertsState() }, 3000);
        }

    }
    const deleteMateria = (index) => {
        materias.splice(index, 1);
    }

    const uploadPlan = async () => {
        setLoading(true);

        const planRef = doc(db, 'textos', 'planDeEstudios');
        await setDoc(planRef, {
            "title": title ? title : plan.title,
            "profile": profile ? profile : plan.profile,
            "alcances": alcances ? alcances : plan.alcances,
            "materias": materias ? materias : plan.materias,

        }).then(() => {
            setAlertMessage("Archivo creado exitosamente.")
            setLoading(false);
            setSuccess(true);
            // setTimeout(() => { window.location.reload() }, 1000)
        }).catch((err) => {
            if (err.code === undefined) {
                setAlertMessage("Archivo creado exitosamente.")
                console.log("El archivo se ha subido con exito pero ha ocurrido un error indefinido. Error: ", err);
                setLoading(false);
                setSuccess(true);
                setTimeout(() => { window.location.reload() }, 1000)
            } else {
                setLoading(false);
                setError(true);
                setAlertMessage("Error al subir el plan: ", err.code);
                console.log("Error al subir el plan: ", err.code);
                setTimeout(() => { restartAlertsState() }, 3000);
            }

        });;


    }

    const createPlan = async (e) => {

        e.preventDefault();

        if (plan.length === 0) {
            if (title === null || title === undefined || profile === null
                || profile === undefined || alcances === null || alcances === undefined
                || materias.length === 0 || materias === null || materias === undefined
                || materia === null || materia === undefined || año === null || plan.length === 0 || plan === null || plan === undefined
                || año === undefined || año === "" && materia === "" && profile === "" && title === "" && alcances === "" && materias.length === 0 && plan.length === 0) {


                setWarning(true);
                setAlertMessage("Debes rellenar todos los campos para editar el plan de estudios.");
                console.log("Debes rellenar todos los campos.");
                restartAlertsState();


            } else {

                console.log("Datos del plan de estudios: ", values);
                console.log("Datos del plan de estudio añadidos y listos para subir.");
                uploadPlan();
            }

        } else if (plan && title === null || title === undefined || profile === null
            || profile === undefined || alcances === null || alcances === undefined
            || materias.length === 0 || materias === null || materias === undefined
            || materia === null || materia === undefined || año === null || plan.length === 0 || plan === null || plan === undefined
            || año === undefined || año === "" && materia === "" && profile === "" && title === "" && alcances === "" && materias.length === 0) {

            console.log("Datos del plan de estudios: ", values);
            console.log("Datos del plan de estudio añadidos y listos para subir.");
            uploadPlan();

        } else {
            setWarning(true);
            setAlertMessage("Debes editar los datos para que los cambios surgan efecto.");
            console.log("Debes rellenar todos los campos.");
            restartAlertsState();
        }

    }


    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : loading ? <LoadingSpinner text="Subiendo..." /> : ''
                }
                <Row>
                    <Title text="Editar plan de estudios" />


                    <Form onSubmit={createPlan} onReset={reset}>
                        <Button type='submit' className='my-btn btn mt-4 mb-4' >Guardar cambios</Button>
                        <div className='font-bold'><Subtitle text="Datos generales" /></div>
                        <FormGroup>
                            <Label >
                                Titulo
                            </Label>
                            <Input
                                onChange={handleChange}
                                defaultValue={plan.title}
                                name="title"
                                placeholder="Ingrese un titulo"
                                type="text"
                                invalid={title === ""}
                            />
                            <FormFeedback>
                                Perfil del egresado
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label >
                                Perfil del egresado
                            </Label>
                            <Input
                                onChange={handleChange}
                                defaultValue={plan.profile}
                                name="profile"
                                placeholder="Ingrese el perfil del egresado"
                                type="textarea"
                                maxLength={500}
                                invalid={title === ""}
                            />
                            <FormFeedback>
                                Este campo es requerido.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label >
                                Alcances
                            </Label>
                            <Input
                                onChange={handleChange}
                                defaultValue={plan.alcances}
                                name="alcances"
                                placeholder="Ingrese los alcances del egresado"
                                type="textarea"
                                maxLength={500}
                                invalid={title === ""}
                            />
                            <FormFeedback>
                                Este campo es requerido.
                            </FormFeedback>
                        </FormGroup>

                        <div className='font-bold'><Subtitle text="Materias" /></div>
                        <div>
                            <form id='formMateria'>
                                <FormGroup>
                                    <div className="input-group mb-3">
                                        <input id='inputMateria' onChange={handleChange} name="materia" type="text" className="form-control" aria-label="Text input with dropdown button" placeholder="Nombre de la materia" />

                                        <select id='selectAño' onChange={handleChange} name="año" className="btn btn-outline-secondary dropdown-toggle" type="button" >
                                            <option value={null}>Año</option>
                                            <option value="1°">Primero</option>
                                            <option value="2°">Segundo</option>
                                            <option value="3°">Tercero</option>
                                            <option value="4°">Cuarto</option>
                                            <option value="5°">Quinto</option>
                                            <option value="6°">Sexto</option>

                                        </select>
                                    </div>
                                    <button type="reset" onClick={() => addMateria()} type='button' className='btn btn-outline-primary'>+ Añadir materia</button>




                                </FormGroup>
                            </form>
                        </div>
                        {
                            materias.length !== 0 || planMaterias.length !== 0 ? <>
                                <Title text={"Materias añadidas"}></Title>
                                <Subtitle text={"Total añadidas: " + planMaterias.length !== 0 ? planMaterias.length : materias.length} />
                                {materias.length !== 0 ? materias.map((materia, index) => {
                                    return (
                                        <ul className='border' key={index}>
                                            <div>
                                                <li className='main-color font-bold p-2'>{materia.materia} - {materia.año} </li>
                                                <button type='button' onClick={() => deleteMateria(index)} className='btn btn-outline-danger'>Eliminar</button>
                                            </div>

                                        </ul>
                                    )
                                }) : planMaterias.map((materia, index) => {
                                    return (
                                        <ul className='border' key={index}>
                                            <div>
                                                <li className='main-color font-bold p-2'>{materia.materia} - {materia.año} </li>
                                                <button onClick={() => deleteMateria(index)} className='btn btn-outline-danger'>Eliminar</button>
                                            </div>

                                        </ul>
                                    )
                                })}
                            </> : ''
                        }


                    </Form>


                </Row>
            </Container>
        </motion.div>
    )
}
