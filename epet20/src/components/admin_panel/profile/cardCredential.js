import { deleteUser, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../../firebase/firebaseConfig'
import { Title } from '../../text-styles/title';
import UserIcon from "../../../assets/user.png";
export const CardCredential = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        handleUserData();
    }, [])
    const handleUserData = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,

                })

            } else {
                console.log("cargando...")
            }
        });
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

                        {user ? <img
                            className='img-profile mx-auto  shadow-xl rounded-xl border'
                            alt="foto de perfil"
                            src={user.photoURL ? user.photoURL : UserIcon}
                           

                        /> : null}
                    </div>

                    <div >
                        <ul>
                            <li >
                                <p className='font-bold'>Nombre</p> <p className='main-color'>
                                    {user ? user.displayName : null}
                                </p>
                            </li>
                            <li >
                                <p className='font-bold'>Email</p>
                                <p className='main-color'>  {user ? user.email : null}</p>
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
