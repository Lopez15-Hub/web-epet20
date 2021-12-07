import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Contacto } from '../views/contacto';
import { Estudiantes } from '../views/estudiantes';
import { Inicio } from '../views/inicio';
import { Novedades } from '../views/novedades';
import { AnimatePresence } from 'framer-motion';
import { Login } from '../views/login';
import { Registro } from '../views/registro';
import { Secretaria } from '../views/secretaria';
import { PlanDeEstudios } from '../views/plan_estudios';
export const AppRouter = () => {
    return (

        <BrowserRouter>
            <AnimatePresence>
                <Routes>
                    <Route path="/error" element={<Inicio />} />
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/novedades" element={<Novedades />} />
                    <Route path="/estudiantes" element={<Estudiantes />} />
                    <Route path="/secretaria" element={<Secretaria />} />
                    <Route path="/secretaria/estudiantes" element={<Secretaria />} />
                    <Route path="/secretaria/teoria" element={<Secretaria />} />
                    <Route path="/secretaria/docentes" element={<Secretaria />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/plan-de-estudios" element={<PlanDeEstudios />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>
            </AnimatePresence>
        </BrowserRouter>

    )
}
