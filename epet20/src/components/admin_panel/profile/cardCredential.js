import { deleteUser, onAuthStateChanged, updateProfile } from 'firebase/auth';
import React, { useEffect, useState, memo } from 'react'
import { app, auth } from '../../../firebase/firebaseConfig'
import { Title } from '../../text-styles/title';

import UserIcon from "../../../assets/user.png";
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { UseLoading } from '../../../hooks/useLoading';
import { LoadingSpinner } from '../../general/loading';
import { AlertNotification } from '../../general/alertNotification';
export const CardCredential = memo(() => {
    const [user, setUser] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user.photoURL) {

                setUser({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,

                })
                console.log(user)
                setProfilePhoto(user.photoURL)
            } else {
                console.log("cargando...")
            }
        });

    }, [])
    const handleProfilePhoto = (fileUrl) => {
        updateProfile(auth.currentUser, {
            photoURL: fileUrl.toString()
        }).then(() => {
            setAlertMessage("Foto de perfil actualizada.")
            console.log("Foto de perfil: ", auth.currentUser.photoURL)
            setProfilePhoto(auth.currentUser.photoURL)
            setSuccess(true);
            setLoading(false);
            restartAlertsState();
        }).catch((error) => {
            setAlertMessage("Ha ocurrido un error al actualizar el nombre: " + error.code)
            setError();
            setLoading(false);
            console.log(error)
            restartAlertsState();
        });
    }
    const handleProfileImageFile = async (e) => {
        e.preventDefault();
        setLoading(true);
        const file = e.target.files[0];
        if (file.name.split(".").pop() !== "jpg" && file.name.split(".").pop() !== "png" && file.name.split(".").pop() !== "jpeg") {
            document.getElementById("form-profile").reset();
            setLoading(false);

            setAlertMessage("Solo se permiten archivos .jpg, jpeg y .png");

            setWarning(true);
            restartAlertsState();
        } if (file.size > 5000000) {
            setLoading(false);

            setAlertMessage("El archivo es mayor a 5Mb.");

            setWarning(true);
            restartAlertsState();
        } else {
            const storageRef = app.storage().ref("/profile-images/");
            const filePath = storageRef.child(auth.currentUser.uid);
            await filePath.put(file).then(async () => {


                console.log("File uploaded");

            }).catch((err) => {
                setLoading(false);
                setAlertMessage("Error al subir el archivo: ", err.code);
                setError(true);
                restartAlertsState();
            })
            const url = await filePath.getDownloadURL();
            const finalUrl = url.toString();
            if (finalUrl !== undefined || finalUrl !== null || finalUrl !== "") {
                console.log("URL: " + finalUrl);
                handleProfilePhoto(finalUrl);
                document.getElementById("form-profile").reset();
            }
        }





    }
    const handleDeleteAccount = () => {
        var confirm = window.confirm("Esta seguro que desea eliminar su cuenta?");
        if (confirm) {
            deleteUser(auth.currentUser).then(() => {
                window.location.replace("/inicio")
            }).catch((error) => {
                console.log(error)
            });
            window.alert("Su cuenta ha sido eliminada exitosamente.")
        } else {
            console.log("cancelado")
        }

    }
    return (




        <div className='mx-auto  p-4'>

            <div className=' p-6 border shadow-md rounded-xl'>
                <Title text="Datos personales" />
                <div >
                    <div >

                        {auth.currentUser ? <>
                            <div>

                                {auth.currentUser.photoURL || auth.currentUser.photoURL === null ? <img

                                    className='img-profile mx-auto  shadow-md rounded-xl border'
                                    alt="foto de perfil"
                                    src={auth.currentUser.photoURL !== null ? profilePhoto : UserIcon}


                                /> : <LoadingSpinner text="Cargando imagen..." />}
                                <Form onChange={handleProfileImageFile} id='form-profile'>
                                    <FormGroup className='mt-2' >
                                        <Label className='font-bold'>Editar foto de perfil</Label>
                                        <Input type="file" />
                                        <p className='text-muted'>El archivo no debe pesar más de 5Mb.</p>
                                    </FormGroup>
                                </Form>
                                {success ?
                                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                                }
                                {loading ? <LoadingSpinner text="Subiendo imágen..." /> : ''}
                            </div>
                        </> : null}
                    </div>

                    <div >
                        <ul>
                            <li >
                                <p className='font-bold'>Nombre</p> <p className='main-color'>
                                    {auth.currentUser.displayName}
                                </p>
                            </li>
                            <li >
                                <p className='font-bold'>Email</p>
                                <p className='main-color'>  {auth.currentUser.email}</p>
                            </li>
                        </ul>

                        <button className='btn btn-danger' onClick={() => handleDeleteAccount()}>Eliminar cuenta</button>
                        <p className='text-muted mt-4'>Esta acción eliminará tu cuenta y deberás volver a registrarte para usarla.</p>
                    </div>

                </div>
            </div>
        </div>



    )
}
)