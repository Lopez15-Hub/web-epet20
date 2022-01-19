import React from 'react';
import { Container, FormGroup, Input } from 'reactstrap';
import { Subtitle } from '../../text-styles/subtitle';
import { Title } from '../../text-styles/title';

export const SearchBar = ({dataList,searchValue,search}) => {
  return  <Container>
  <form>
      <FormGroup>
          <Subtitle text="Buscar materias" />

          <Input id='inputSearch' value={searchValue} onChange={(e) => search} placeholder='Ingrese el nombre o el año de la materia' type="text" name="searchValue" />
      </FormGroup>

  </form>

  {searchValue ? <>
      {
          dataList.length > 0 ? <>
              <Title text={"Todas las materias"}></Title>

              <Subtitle text={"Materias totales: " + dataList.length} />
              {dataList.length !== 0 ? dataList.sort((materia, materia2) => materia.materia < materia2.materia ? materia : -1).sort((materia, materia2) => materia.año > materia2.año ? materia : -1).map((materia, index) => {
                  return (
                      <ul className='border mb-4' key={index}>
                          <div>
                              <li className='main-color font-bold p-2 '>{materia.materia} - {materia.año} </li>
                              <button type='button'  className='btn btn-outline-danger'>Eliminar</button>
                          </div>

                      </ul>
                  )
              }) : ''}

          </> : ''
      }
  </> : <>

      {
          dataList.length !== 0 ? <>
              <Title text={"Materias encontradas:"}></Title>

              <Subtitle text={"Materias totales: " + searchValue.length} />
              {searchValue.length !== 0 ? searchValue.sort((materia, materia2) => materia.materia < materia2.materia ? materia : -1).sort((materia, materia2) => materia.año > materia2.año ? materia : -1).map((materia, index) => {
                  return (
                      <ul className='border mb-4' key={index}>
                          <div>
                              <li className='main-color font-bold p-2 '>{materia.materia} - {materia.año} </li>
                              <button type='button' className='btn btn-outline-danger'>Eliminar</button>
                          </div>

                      </ul>
                  )
              }) : ''}

          </> : !searchValue ? <div className='font-bold'><Subtitle text="No se han encontrado resultados." /></div> : ''
      }
  </>}
</Container>;
};
