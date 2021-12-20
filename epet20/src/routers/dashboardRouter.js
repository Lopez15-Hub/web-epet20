import { motion } from 'framer-motion';
import { Route, Routes } from 'react-router-dom'
import { Container, Row } from 'reactstrap';
import { Menu } from '../components/admin_panel/menu';
import { Form } from '../components/admin_panel/sections/form';
import { Profile } from '../components/admin_panel/sections/profile';
import { Usuarios } from '../components/admin_panel/sections/usuarios';
import { NavbarAdmin } from '../components/inicio/navbar_admin';
import { PaginaEnConstruccion } from "../views/we_working";
export const DashboardRouter = () => {
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <NavbarAdmin />
            <Container>
                <Row >
                    <div className='col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <Menu />
                    </div>
                    <div className='col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 position-relative'>
                        <Container>
                            <Routes>

                                <Route path="perfil/" element={<Profile />} />
                                <Route path="usuarios/" element={<Usuarios />} />
                                <Route path="usuarios/add" element={<Form />} />
                                <Route path="usuarios/:userId" element={<Form />} />
                                <Route path="inicio" element={<PaginaEnConstruccion />} />
                                <Route path="novedades" element={<PaginaEnConstruccion />} />
                                <Route path="secretaria" element={<PaginaEnConstruccion />} />
                                <Route path="contacto" element={<PaginaEnConstruccion />} />
                                <Route path="plan-de-estudios" element={<PaginaEnConstruccion />} />
                            </Routes>
                        </Container>
                    </div>
                </Row>
            </Container>


        </motion.div>
    )
}
