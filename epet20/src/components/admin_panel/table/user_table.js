import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Form, Table } from 'reactstrap'
import { HeaderTable } from './header'
import { useGet } from '../../../hooks/query_hooks/useGet';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { Subtitle } from '../../text-styles/subtitle';
import { Link } from 'react-router-dom';
import { UseLoading } from '../../../hooks/useLoading';
export const UserTable = () => {
    const { users } = useGet();
    const { loading, setLoading} = UseLoading();



    const deleteUser = async (id) => {
        var confirm = window.confirm("Esta seguro que desea eliminar a este usuario? Esta acción es irreversible.");
        if (confirm) {

            setLoading(true);
            const userRef = doc(db, 'users', id);
            await deleteDoc(userRef).then(() => {
                window.alert("Usuario eliminado correctamente.");
                setLoading(false);
                window.location.reload();
            }).catch(err => {

            });
            setLoading(false);

        }


    }



    return (

        <Table responsive >
            <thead>
                <HeaderTable />
            </thead>
            <tbody>
                {


                    loading ?


                        <tr className='mt-4'>
                            <th> <Subtitle text="Espere..." /></th>
                        </tr>

                        :
                        users.map(user => (
                            <tr key={user.id}>
                                <th><button className='font-bold' onClick={() => alert("ID de usuario: " + user.id)}>{user.id.toString().slice(0, 13) + '...'}</button></th>
                                <td>{user.name === null || user.name === '' ? 'S/E' : user.name}</td>
                                <td>{user.apellido === null || user.apellido === '' ? 'S/E' : user.apellido}</td>
                                <td>{user.phone === null || user.phone === '' ? 'S/E' : user.phone}</td>
                                <td>{user.email === null || user.email === '' ? 'S/E' : user.email}</td>
                                <td>{user.role === null || user.role === '' ? 'S/E' : user.role}</td>
                                <td>
                                    <Form>
                                        <Link to={"./" + user.id} className='ml-4 btn main-color' id="exampleSelect" ><FaEdit /></Link>
                                        <button type="button" className='ml-4 btn red' id="exampleSelect" onClick={() => deleteUser(user.id)}  ><FaTrash /></button>

                                    </Form>
                                </td >

                            </tr>
                        ))

                }
            </tbody>

        </Table >
    )
}
