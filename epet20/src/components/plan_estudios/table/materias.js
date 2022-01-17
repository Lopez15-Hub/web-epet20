import React from 'react'
import { Table } from 'reactstrap'
import { usePlan } from '../../../hooks/query_hooks/usePlan';
import { Head } from './head'

export const Materias = ({ showBasic, año }) => {
    const { plan } = usePlan();
    const materias = plan.materias ? plan.materias : [];
    const getCicloBasico = () => {

        const cicloBásico = materias.filter(materia => materia.ciclo === 'basico' && materia.año === año).sort((materia, materia2) => materia.materia < materia2.materia ? materia : -1).sort((materia, materia2) => materia.año > materia2.año ? materia : -1);
        return cicloBásico;
    }
    const getCicloSuperior = () => {
        const cicloSuperior = materias.filter(materia => materia.ciclo === 'superior' && materia.año === año).sort((materia, materia2) => materia.materia < materia2.materia ? materia : -1).sort((materia, materia2) => materia.año > materia2.año ? materia : -1);
        return cicloSuperior;
    }
    const materiasCicloBasico = getCicloBasico();
    const materiasCicloSuperior = getCicloSuperior();

    return (
        <div>
            <Table bordered >
                <Head />
                <tbody>

                    {
                        showBasic ? materiasCicloBasico.map((materia, index) => {
                            return (
                                <>

                                    <tr key={index}>
                                        <th scope="row">{'CB0' + index}</th>
                                        <th  >{materia.materia}</th>
                                        <th >{materia.año}</th>





                                    </tr>


                                </>

                            )
                        }) : materiasCicloSuperior.map((materia, index) => {
                            return (
                                <tr key={index}>



                                    <th scope="row">{'CS0' + index}</th>
                                    <th  >{materia.materia}</th>
                                    <th >{materia.año}</th>


                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
