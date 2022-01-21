import React from 'react'

import { Input, Form, InputGroup, InputGroupText } from 'reactstrap'
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md'
import { auth } from '../../firebase/firebaseConfig'
export const BoxComments = () => {
    return <div className='border rounded-b-lg'>

        <ul className='m-4'>
            <li>
                <div className=''>

                    <div className='d-flex mb-4'>
                        <img src={auth.currentUser ? auth.currentUser.photoURL : ''} alt="User foto comment" className='img-profile-min-boxComment border' />
                        <p className='border rounded-lg comment p-2 shadow-md'>    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat enim officiis expedita labore ipsam porro dicta asperiores eius, recusandae voluptatem, debitis ipsa officia accusamus iure culpa amet consequatur aspernatur natus.
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

