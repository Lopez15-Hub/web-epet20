import React from 'react'
import { Table } from 'reactstrap'
import { Head } from './head'

export const Materias = () => {
    return (
        <div>
            <Table bordered>
                <Head />
                <tbody>
                    <tr>
                        <th scope="row">
                            CB001
                        </th>
                        <td>
                            Matemática
                        </td>
                        <td>
                            1°
                        </td>

                    </tr>

                </tbody>
            </Table>
        </div>
    )
}
