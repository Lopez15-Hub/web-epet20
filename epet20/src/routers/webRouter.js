import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Contacto } from '../views/contacto';
import { Estudiantes } from '../views/estudiantes';
import { Inicio } from '../views/inicio';
import { Login } from '../views/login';
import { Registro } from '../views/registro';
import { PlanDeEstudios } from '../views/plan_estudios';
import { GeneralList } from '../components/secretaria/sectores/general';
import { EstudiantesList } from '../components/secretaria/sectores/estudiantes';
import { DocentesList } from '../components/secretaria/sectores/docentes';
import { Anuncios } from '../components/secretaria/sectores/anuncios';
import { Teoria } from '../components/estudiantes/teoria';
import { Taller } from '../components/estudiantes/taller';
import { EducacionFisica } from '../components/estudiantes/ed-fisica';
import { Prueba } from '../components/general/navbar/prueba';
import { MyNavbar } from '../components/general/navbar/custom_navbar';
import { PaginaEnConstruccion } from '../views/we_working';
import { Error404 } from '../views/404';
export const WebRouter = () => {
    React.useEffect(() => {

        if (
            window.location.pathname !== '/'
            && window.location.pathname !== '/inicio'
            && window.location.pathname !== './logo192.png'
            && window.location.pathname !== '/'
            && window.location.pathname !== './'
            && window.location.pathname !== '/novedades'
            && window.location.pathname !== '/contacto'
            && window.location.pathname !== '/registro'
            && window.location.pathname !== '/login'
            && window.location.pathname !== '/plan-de-estudios'
            && window.location.pathname !== "estudiantes/teoria"
            && window.location.pathname !== "estudiantes/taller"
            && window.location.pathname !== "estudiantes/ed-fisica"
            && window.location.pathname !== "secretaria/anuncios"
            && window.location.pathname !== "secretaria/estudiantes"
            && window.location.pathname !== "secretaria/general"
            && window.location.pathname !== "secretaria/docentes"
            && window.location.pathname !== "/estudiantes/teoria"
            && window.location.pathname !== "/estudiantes/taller"
            && window.location.pathname !== "/estudiantes/ed-fisica"
            && window.location.pathname !== "/secretaria/anuncios"
            && window.location.pathname !== "/secretaria/estudiantes"
            && window.location.pathname !== "/secretaria/general"
            && window.location.pathname !== "/secretaria/docentes"
            && window.location.pathname !== '/prueba'
            && window.location.pathname !== '/404') {
            return window.location.replace('/404');

        }

    }, [])
    return (
        <>
            <MyNavbar />
            <Routes>

                <Route path="404" element={<Error404 />} />
                <Route path="" element={<Inicio />} />
                <Route path="inicio" element={<Inicio />} />
                <Route path="novedades" element={<PaginaEnConstruccion />} />
                <Route path="estudiantes/teoria" element={<Teoria />} />
                <Route path="estudiantes/taller" element={<Taller />} />
                <Route path="estudiantes/ed-fisica" element={<EducacionFisica />} />
                <Route path="estudiantes" element={<Estudiantes />} />
                <Route path="secretaria/anuncios" element={<Anuncios />} />
                <Route path="secretaria/estudiantes" element={<EstudiantesList />} />
                <Route path="secretaria/general" element={<GeneralList />} />
                <Route path="secretaria/docentes" element={<DocentesList />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="plan-de-estudios" element={<PlanDeEstudios />} />
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Registro />} />
                <Route path="prueba" element={<Prueba />} />

            </Routes>
        </>
    )
}
