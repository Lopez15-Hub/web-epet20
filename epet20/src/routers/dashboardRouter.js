
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Container, Row } from 'reactstrap';
import { Menu } from '../components/admin_panel/menu';
import { Form } from '../components/admin_panel/sections/form';
import { InicioAdmin } from '../components/admin_panel/sections/inicio_admin';
import { Loading } from '../components/admin_panel/sections/loading';
import { Profile } from '../components/admin_panel/sections/profile';
import { AñadirAnuncio } from '../components/admin_panel/sections/secretaria/add_anuncios';
import { SecretariaForms } from '../components/admin_panel/sections/secretaria/secretariaForms';
import { Usuarios } from '../components/admin_panel/sections/usuarios';
import { NavbarAdmin } from '../components/inicio/navbar_admin';
import { auth} from '../firebase/firebaseConfig';
import { UseLoading } from '../hooks/useLoading';
import { useRole } from '../hooks/useRole';
import { PaginaEnConstruccion } from "../views/we_working";
export const DashboardRouter = () => {

    const { role} = useRole();
    const {loading, setLoading} = UseLoading();
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {


            if (user) {
                user.reload().then(() => { console.log("user reloaded") }).catch(() => { console.log("user not reloaded") });
                console.log("user logged in")

                if (role && auth.currentUser) {
                    setLoading(false);
                }
            } else {

                console.log("user not logged in")
                auth.signOut();
                setLoading(false);
                window.location.replace("/");
            }
        });

    }, [role])


    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <NavbarAdmin currentRole={role} />
            <Container>
                {loading === false ?
                    <>

                        <Row >
                            <div className='col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                                <Menu role={role} />
                            </div>
                            <div className='col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 position-relative'>
                                <Container>
                                    <Routes>
                                        {role === "administrador" ? <>

                                            <Route path="perfil/" element={<Profile />} />
                                            <Route path="usuarios/" element={<Usuarios />} />
                                            <Route path="usuarios/add" element={<Form />} />
                                            <Route path="usuarios/:userId" element={<Form />} />
                                            <Route path="inicio" element={<InicioAdmin />} />
                                            <Route path="novedades" element={<PaginaEnConstruccion />} />
                                            <Route path="secretaria/forms" element={<SecretariaForms />} />
                                            <Route path="secretaria/anuncios" element={<AñadirAnuncio />} />
                                            <Route path="contacto" element={<PaginaEnConstruccion />} />
                                            <Route path="plan-de-estudios" element={<PaginaEnConstruccion />} />

                                        </> : role === "secretaria" ? <>
                                            <Route path="perfil/" element={<Profile />} />
                                            <Route path="secretaria/forms" element={<SecretariaForms />} />
                                            <Route path="secretaria/anuncios" element={<AñadirAnuncio />} />
                                        </> : role === "usuario" ? <>  <Route path="perfil/" element={<Profile />} /></> : role === '' || role === undefined || role === null ? window.location.replace("/") : <Route path="/" element={<Profile />} />
                                        }



                                    </Routes>
                                </Container>

                            </div>
                        </Row>



                    </> : <Loading text="Cargando" />}

            </Container>


        </motion.div>
    )
}
