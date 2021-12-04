import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Contacto } from '../views/contacto';
import { Estudiantes } from '../views/estudiantes';
import { Inicio } from '../views/inicio';
import { Novedades } from '../views/novedades';
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/novedades" element={<Novedades />} />
                <Route path="estudiantes" element={<Estudiantes />} />
                <Route path="secretaria" element={<Estudiantes />} />
                <Route path="contacto" element={<Contacto />} />
                <Route path="plan-de-estudios" element={<Estudiantes />} />
            </Routes>

        </BrowserRouter>
    )
}
