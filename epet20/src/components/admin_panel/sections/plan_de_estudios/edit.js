
import { doc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { db } from '../../../../firebase/firebaseConfig'
import { usePlan } from '../../../../hooks/query_hooks/usePlan'
import { useForm } from '../../../../hooks/useForm'
import { UseLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Subtitle } from '../../../text-styles/subtitle'
import { Title } from '../../../text-styles/title'

export const EditPlanDeEstudios = () => {
    const { handleChange, values, reset } = useForm({});
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();
    const { title, profile, materia, año, alcances } = values;
    const { plan } = usePlan();
    const planMaterias = plan.materias;
    const [materias, setMaterias] = React.useState([]);
    const [search, setSearch] = React.useState(false);
    const [save, setSave] = React.useState(false);
    const singleMateria = {
        "materia": materia,
        "año": año,
        "ciclo": año === '1°' || año === '2°' || año === '3°' ? 'basico' : 'superior',
    }
    const addMateria = () => {
        console.log(materia)
        handleMaterias();
    }
    const handleMaterias = () => {

        if ((materia !== '' || año !== '' || singleMateria.materia !== "") && singleMateria.año !== "" && singleMateria.materia !== undefined && singleMateria.año !== undefined) {

            setMaterias([...materias, singleMateria]);
            console.log(materias);
            document.getElementById("formMateria").reset();

            reset({ materia: '', año: '' });
        } else {
            setAlertMessage("Debes especificar una materia y su año para añadirla.");
            setWarning(true);
            restartAlertsState();
        }

    }
    const deleteMateria = (index) => {
        setLoading(true);
        if (search === true) {
            const newMaterias = [...planMaterias];
            newMaterias.splice(index, 1);
            planMaterias.splice(index, 1);
            setMaterias(newMaterias);
            document.getElementById("form-search").reset();
            setLoading(false);
        } else {
            const newMaterias = [...materias];
            newMaterias.splice(index, 1);
            document.getElementById("form-search").reset();
            setMaterias(newMaterias);
            setLoading(false);

        }

    }

    const uploadPlan = async () => {
        setLoading(true);
        const planRef = doc(db, 'textos', 'planDeEstudios');
        await setDoc(planRef, {
            "title": title ? title : plan.title,
            "profile": profile ? profile : plan.profile,
            "alcances": alcances ? alcances : plan.alcances,
            "materias": materias ? materias : materias && plan.materias ? materias.concat(plan.materias) : plan.materias,

        }).then(() => {
            setAlertMessage("Plan editado exitosamente.")
            setLoading(false);
            setSuccess(true);
            restartAlertsState();
        }).catch((err) => {

            setLoading(false);
            setError(true);
            setAlertMessage("Error al subir el plan: ", err.code);
            console.log("Error al subir el plan: ", err.code);
            setTimeout(() => { restartAlertsState() }, 3000);


        });;


    }
    const searchMateria = (e) => {
        const { value } = e.target;
        if (value) {
            console.log(search);
            setSearch(true);
        } else {
            console.log("Empty");
        }
        setMaterias(planMaterias.filter(
            materia => materia.materia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) !== -1
                || materia.materia.toLowerCase() === value.toLowerCase()
                || materia.año.toLowerCase().indexOf(value) !== -1
                || materia.año.toLowerCase() === value.toLowerCase()
                || materia.materia.normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1
                || materia.materia === value));
    }
    const createPlan = async (e) => {

        e.preventDefault();

        if (plan.materias.length === 0) {
            if ((title === null || title === undefined || profile === null
                || profile === undefined || alcances === null || alcances === undefined
                || materias.length === 0 || materias === null || materias === undefined
                || materia === null || materia === undefined || año === null || plan.length === 0 || plan === null || plan === undefined
                || año === undefined || año === "") || (materia === "" && profile === "" && title === "" && alcances === "" && materias.length === 0 && plan.length === 0) || (plan.title === title && plan.profile === profile && plan.alcances === alcances && !plan.materias)) {


                setWarning(true);
                setAlertMessage("Debes rellenar todos los campos para editar el plan de estudios.");
                console.log("Debes rellenar todos los campos.");
                restartAlertsState();


            } else {
                uploadPlan();
            }

        } else if ((plan && title === null) || (title === undefined || profile === null
            || profile === undefined || alcances === null || alcances === undefined
            || materias.length === 0 || materias === null || materias === undefined
            || materia === null || materia === undefined || año === null || plan.length === 0 || plan === null || plan === undefined
            || año === undefined) || (año === "" && materia === "" && profile === "" && title === "" && alcances === "" && materias.length === 0)) {

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

    useEffect(() => {
        if (plan && plan.materias) {
            setMaterias([...planMaterias]);
            var mat = planMaterias[0].materia;
            console.log(mat);
        }

    }, [plan, planMaterias])


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


                    <Form onSubmit={createPlan}>

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
                            <form id='formMateria' onReset={reset}>
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
                                    <button type="reset" onClick={() => addMateria()} className='btn btn-outline-primary'>+ Añadir materia</button>




                                </FormGroup>

                            </form>
                        </div>


                        <input type='submit' className='my-btn btn mt-4 mb-4' value="Guardar cambios" />
                    </Form>
                    <form id="form-search">
                        <Subtitle text="Buscar materia" />
                        <input onChange={(e) => searchMateria(e)} className='form-control mb-4' placeholder={"Ingrese la materia o nombre"} />
                    </form>
                    {
                        materias.length !== 0 ? <>
                            <Title text={"Materias añadidas"}></Title>

                            <Subtitle text={"Materias totales: " + materias.length} />
                            {materias.length !== 0 ? materias.sort((materia, materia2) => materia.materia < materia2.materia ? materia : -1).sort((materia, materia2) => materia.año > materia2.año ? materia : -1).map((materia, index) => {
                                return (
                                    <ul className='border mb-4' key={index}>
                                        <div>
                                            <li className='main-color font-bold p-2 '>{materia.materia} - {materia.año} </li>
                                          
                                            <button type='button' onClick={() => deleteMateria(index)} className='btn btn-outline-danger'>Eliminar</button>
                                        </div>

                                    </ul>
                                )
                            }) : ''}

                        </> : materias.length === 0 ? <Subtitle text="No hay materias añadidas" /> : ''
                    }

                </Row>
            </Container>
        </motion.div>
    )
}