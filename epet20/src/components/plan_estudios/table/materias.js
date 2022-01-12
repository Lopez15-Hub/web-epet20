import React from 'react'
import { Table } from 'reactstrap'
import { usePlan } from '../../../hooks/query_hooks/usePlan';
import { Head } from './head'

export const Materias = ({ showBasic }) => {
    const { plan } = usePlan();
    const materias = plan.materias ? plan.materias : [];
    const getCicloBasico = () => {
        const cicloBásico = materias.filter(materia => materia.ciclo === 'basico');
        return cicloBásico;
    }
    const getCicloSuperior = () => {
        const cicloSuperior = materias.filter(materia => materia.ciclo === 'superior');
        return cicloSuperior;
    }
    const materiasCicloBasico = getCicloBasico();
    const materiasCicloSuperior = getCicloSuperior();

    return (
        <div>
            <Table bordered>
                <Head />
                <tbody>
                    {
                        showBasic ? materiasCicloBasico.map((materia, index) => {
                            return (
                                <tr key={index}>


                                    <th>{materia.ciclo === 'basico' ? 'CB0' + index : ''}</th>
                                    <th>{materia.materia}</th>
                                    <th>{materia.año}</th>


                                </tr>
                            )
                        }) : materiasCicloSuperior.map((materia, index) => {
                            return (
                                <tr key={index}>



                                    <th>{materia.ciclo === 'superior' ? 'CS0' + index : ''}</th>
                                    <th>{materia.materia}</th>
                                    <th>{materia.año}</th>


                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
