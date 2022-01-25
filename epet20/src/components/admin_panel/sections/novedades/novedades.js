
import { addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React from 'react'
import { Button, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { app, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { UseLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Title } from '../../../text-styles/title'
import { v4 as uuidv4 } from 'uuid';
export const NovedadesAdmin = () => {
  const { handleChange, values, reset } = useForm({
    url: "",

  });
  const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();
  const [showInputFile, setInputFile] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState("");
  const [isUploaded, setUploaded] = React.useState(false);
  const date = new Date();
  const { title, url: imageUrl, description } = values;
  const handleClick = () => {

    showInputFile ? setInputFile(false) : setInputFile(true);

  }
  const uploadPost = async (isFile) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "novedades"), {
        "title": title,
        "description": description,
        "url": isFile ? fileUrl : imageUrl ? imageUrl : "",
        "submitAt": date.toDateString(),
        "submitBy": app.auth().currentUser.displayName,
      });
      console.log("Document written with ID: ", docRef.id);
      setAlertMessage("Post creado exitosamente.")
      setLoading(false);
      setSuccess(true);
      restartAlertsState();
    } catch (err) {
      setLoading(false);
      setError(true);
      setAlertMessage(err.code);
      restartAlertsState();


    }
  }
  const handleFile = async (e) => {
    if (title === undefined || title === "") {
      setLoading(false);
      setAlertMessage("Para subir un archivo primero debes definir un título.");
      setWarning(true);
      restartAlertsState();
      document.getElementById("archivoFile").setAttribute("disabled", '');
      setTimeout(() => {
        document.getElementById("archivoFile").removeAttribute("disabled", '');
        document.getElementById("archivoFile").value = "";
      }, 3000)
    } else {
      setLoading(true);
      document.getElementById("archivoFile").setAttribute("disabled", '');
      const file = e.target.files[0];
      const fileName = file.name + uuidv4()
      const storageRef = app.storage().ref("estudiantes-files/");
      const filePath = storageRef.child(fileName);
      await filePath.put(file).then(async () => {


        console.log("File uploaded");


      }).catch((err) => {
        setLoading(false);
        setAlertMessage("Error al subir el archivo: ", err.code);
        setError(true);
      })
      const url = await filePath.getDownloadURL();
      const finalUrl = url.toString();
      if (finalUrl !== undefined || finalUrl !== null || finalUrl !== "") {
        setFileUrl(finalUrl);
        console.log("URL: " + finalUrl);
        setUploaded(true);
        setLoading(false);
        setAlertMessage("El archivo: " + file.name + " se ha cargado exitosamente.");
        setSuccess(true);
        restartAlertsState();
        document.getElementById("resetForm").reset();
        document.getElementById("archivoFile").removeAttribute("disabled", '');


      }
    }

  }
  const createForm = async (e) => {
    e.preventDefault();
    if (title === null || title === undefined || description === null || description === undefined) {
      setWarning(true);
      setAlertMessage("Debes rellenar todos los campos para crear un formulario.");
      console.log("Debes rellenar todos los campos.");
      restartAlertsState();


    } else {
      if (showInputFile === true) {
        console.log("El archivo se sube localmente a firebase storage.");
        try {
          if (isUploaded) {
            uploadPost(true);
          } else {
            setAlertMessage("El archivo aún se está subiendo.");
            setWarning(true);
            restartAlertsState();
          }

        } catch (err) {
          setLoading(false);
          setError(true);
          setAlertMessage("Error al subir el archivo: ", err.code);
          restartAlertsState();
        }

      } else {
        console.log("El archivo se envía por un enlace.")
        uploadPost(false);
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
          <Title text="Publicar una novedad" />


          <Form id="resetForm" onSubmit={createForm} onReset={reset}>
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

            <FormGroup check>
              <Input name='file' onClick={handleClick} type="checkbox" />

              <Label check >
                {'Subir una imágen local.'}
              </Label>
            </FormGroup>

            {showInputFile ? <FormGroup>

              <Input

                id="archivoFile"
                name="file"
                type="file"
                onChange={handleFile}


              />

            </FormGroup> : <FormGroup>
              <Label htmlFor="exampleEmail">
                Enlace de la imágen
              </Label>
              <Input
                onChange={handleChange}
                id="exampleEmail"
                name="url"

                type="url"

              />
            </FormGroup>}

            <Button type='submit' className='my-btn btn' >Publicar</Button>
            {loading ? <LoadingSpinner text="Subiendo..." /> : ''}
          </Form>


        </Row>
      </Container>
    </motion.div>
  )
}
