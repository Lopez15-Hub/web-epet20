import React, { useEffect, useState } from 'react'

import { Input, Form, InputGroup, InputGroupText } from 'reactstrap'
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md'
import { auth } from '../../firebase/firebaseConfig'
import { LoadingSpinner } from '../general/loading';
import { onAuthStateChanged } from 'firebase/auth';
export const BoxComments = () => {
    const [user, setUser] = useState({
        photoUrl: "",
        displayName: "",
    });
    const handleUserData = () => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.photoURL) {
                setUser({
                    photoUrl: user.photoURL,
                    displayName: user.displayName,
                });
            } else {
                console.log("cargando...");
            }
        });
    };
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            handleUserData();
        }
        return () => mounted = false;
    })
    return <div className='border rounded-b-lg'>


        <ul className='m-4'>
            <li>
                <div className=''>

                    <div className='d-flex mb-4'>
                        <img src={user.photoUrl.toString()} alt="User foto comment" className='img-profile-min-boxComment border' />
                        <p className='border rounded-lg comment p-2 shadow-md'>    Lorem ipsum dolor sit, amet consectetur adipisicing elit...
                        </p>
                    </div>

                </div>
            </li>

        </ul>


        <Form className='p-2'>
            <InputGroup >

                <Input className='rounded-xl' placeholder="Añadir un comentario " />
                <InputGroupText className='btn btn-primary btn-sm d-flex btn-block rounded-xl'>
                    Enviar <MdOutlineSubdirectoryArrowRight />
                </InputGroupText>
            </InputGroup>
        </Form>
    </div>;
};

