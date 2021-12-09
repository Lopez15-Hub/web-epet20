import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Form, Table } from 'reactstrap'
import { HeaderTable } from './header'


import { useGet } from '../../../hooks/useGet';
export const UserTable = () => {
    const { users } = useGet();
    return (
        <Table responsive>
            <thead>
                <HeaderTable />
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr>
                            <th>{user.id}</th>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.telefono}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>
                                <Form>
                                    <button type="button" name="submit" value="Eliminar" className='btn btn-warning ' id="exampleSelect"  ><FaEdit /></button>
                                    <button type="button" name="submit" value="Eliminar" className='ml-4 btn btn-danger' id="exampleSelect"  ><FaTrash /></button>

                                </Form>
                            </td >

                        </tr>
                    ))
                }

            </tbody>
        </Table >
    )
}
