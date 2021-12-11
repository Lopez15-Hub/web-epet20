import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, Table } from 'reactstrap'
import { HeaderTable } from './header'
import { useGet } from '../../../hooks/query_hooks/useGet';
import { deleteDoc, doc } from 'firebase/firestore';
import {db} from '../../../firebase/firebaseConfig';
import { Subtitle } from '../../text-styles/subtitle';
export const UserTable = () => {
    const { users } = useGet();
    const [isLoading, setLoading] = useState(true);
    const id = users.map(user => user.id)
    const isLoad = () => {
        setLoading(true);
        setTimeout(() => {
            if (id) {
                setLoading(false);
            };

        }, 1000);

    }
    useEffect(() => {
        isLoad();
    }, [])


    const deleteUser = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            console.log("deleted");
            window.location.reload();
        } catch (err) {
            console.log(err);

        }

    }



    return (

        <Table responsive >
            <thead>
                <HeaderTable />
            </thead>
            <tbody>
                {


                    isLoading ?


                        <div className='mt-4'>
                            <Subtitle text="Espere..." />
                        </div>

                        :
                        users.map(user => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.name == null ? 'S/E' : user.name}</td>
                                <td>{user.name == null ? 'S/E' : user.apellido}</td>
                                <td>{user.phone == null ? 'S/E' : user.phone}</td>
                                <td>{user.email == null ? 'S/E' : user.email}</td>
                                <td>{user.role == null ? 'S/E' : user.role}</td>
                                <td>
                                    <Form>
                                        <button type="button" className='ml-4 btn btn-danger' id="exampleSelect" onClick={() => deleteUser(user.id)}  ><FaTrash /></button>

                                    </Form>
                                </td >

                            </tr>
                        ))

                }
            </tbody>

        </Table >
    )
}
