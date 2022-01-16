import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { DashboardRouter } from './dashboardRouter';
import { WebRouter } from './webRouter';



export const AppRouter = () => {
    return (

        <BrowserRouter>
            <AnimatePresence>

                <Routes>
                    <Route path="/*" element={<WebRouter />} />
                    <Route path="dashboard/*" element={<DashboardRouter />} />

                </Routes>
            </AnimatePresence>
        </BrowserRouter>

    )
}
