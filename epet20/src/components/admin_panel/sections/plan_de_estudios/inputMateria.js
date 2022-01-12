import React from 'react'
import { FormGroup } from 'reactstrap'
import { useForm } from '../../../../hooks/useForm'

export const InputMateria = ({ handleChange }) => {

    return (

        <FormGroup >
            <div className="input-group mb-3">
                <input type="text" onChange={(e) => handleChange(e)} className="form-control" aria-label="Text input with dropdown button" placeholder="Nombre de la materia" />

                <select onChange={(e) => handleChange(e)} className="btn btn-outline-secondary dropdown-toggle" type="button" >
                    <option>Año</option>
                    <option value="1°">Primero</option>
                    <option value="2°">Segundo</option>
                    <option value="3°">Tercero</option>
                    <option value="4°">Cuarto</option>
                    <option value="5°">Quinto</option>
                    <option value="6°">Sexto</option>

                </select>
            </div>

        </FormGroup>
    )
}
