
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Container, Row } from 'reactstrap';
import { Menu } from '../components/admin_panel/menu';
import { FilesOfStudents } from '../components/admin_panel/sections/estudiantes/administrar';
import { UploadFile } from '../components/admin_panel/sections/estudiantes/upload_file';
import { Form } from '../components/admin_panel/sections/form';
import { InicioAdmin } from '../components/admin_panel/sections/inicio_admin/inicio_admin';
import { SliderImages } from '../components/admin_panel/sections/inicio_admin/images';
import { Loading } from '../components/admin_panel/sections/loading';
import { EditPlanDeEstudios } from '../components/admin_panel/sections/plan_de_estudios/edit';
import { Profile } from '../components/admin_panel/sections/profile';
import { AñadirAnuncio } from '../components/admin_panel/sections/secretaria/add_anuncios';
import { SecretariaAdmin } from '../components/admin_panel/sections/secretaria/administrar';
import { SecretariaForms } from '../components/admin_panel/sections/secretaria/secretariaForms';
import { Usuarios } from '../components/admin_panel/sections/usuarios';
import { AlertNotification } from '../components/general/alertNotification';
import { AdminNavbar } from '../components/general/navbar/custom_navbar_admin';
import { auth } from '../firebase/firebaseConfig';
import { useConnection } from '../hooks/useConnection';
import { UseLoading } from '../hooks/useLoading';
import { useRole } from '../hooks/useRole';
import { PaginaEnConstruccion } from "../views/we_working";
export const DashboardRouter = () => {
    const [screenWidth, setWidth] = useState(window.innerWidth);
    const { role } = useRole();
    const { loading, setLoading, success, error, warning, alertMessage, setSuccess, setError, setWarning, setAlertMessage } = UseLoading();
    const { connectionStatus } = useConnection();

    useEffect(() => {
        if (window.location.pathname === "/dashboard") {
            window.location.replace("dashboard/perfil");
        }
        if (
            window.location.pathname !== '/dashboard'
            && role === "administrador"
            && window.location.pathname !== "/dasboard/usuarios/"
            && window.location.pathname !== "/dashboard/inicio"
            && window.location.pathname !== "/dashboard/inicio/images"
            && window.location.pathname !== '/dashboard/perfil'
            && window.location.pathname !== '/dashboard/usuarios'
            && window.location.pathname !== "/dashboard/usuarios/:userId"
            && window.location.pathname !== '/dashboard/usuarios/add'
            && window.location.pathname !== '/dasboard/contacto'
            && window.location.pathname !== '/dashboard/novedades'
            && window.location.pathname !== '/dashboard/secretaria/forms'
            && window.location.pathname !== '/dashboard/secretaria/anuncios'
            && window.location.pathname !== '/dashboard/secretaria/anuncios'
            && window.location.pathname !== '/dashboard/secretaria/admin'
            && window.location.pathname !== "/dashboard/secretaria/anuncios/:id"
            && window.location.pathname !== "/dashboard/secretaria/forms/:id"
            && window.location.pathname !== "/dashboard/estudiantes/admin"
            && window.location.pathname !== "/dashboard/estudiantes/upload"
            && window.location.pathname !== "/dashboard/contacto"
            && window.location.pathname !== "/dashboard/plan-de-estudios"
            && window.location.pathname !== "/dashboard/docentes"
            && window.location.pathname !== '/404') {
            return window.location.replace('/404');

        }
        else if (
            window.location.pathname !== '/dashboard'
            && role === "secretaria"
            && window.location.pathname !== '/dashboard/perfil'
            && window.location.pathname !== '/dashboard/secretaria/forms'
            && window.location.pathname !== '/dashboard/secretaria/anuncios'
            && window.location.pathname !== '/dashboard/secretaria/admin'
            && window.location.pathname !== "/dashboard/secretaria/anuncios/:id"
            && window.location.pathname !== "/dashboard/secretaria/forms/:id"
            && window.location.pathname !== '/404') {
            return window.location.replace('/404');

        } else if (
            window.location.pathname !== '/dashboard'
            && role === "usuario"
            && window.location.pathname !== '/dashboard/perfil'
            && window.location.pathname !== '/404') {
            return window.location.replace('/404');

        }
        const changeWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", changeWidth);
        if (connectionStatus === true) {
            auth.onAuthStateChanged(async (user) => {


                if (user) {
                    user.reload().then(() => { console.log("user reloaded") }).catch(() => { console.log("user not reloaded") });
                    console.log("user logged in")

                    if (role) {
                        setLoading(false);
                    }
                } else {

                    console.log("user not logged in")
                    auth.signOut();
                    setLoading(false);
                }
            });
        } else {
            setAlertMessage("Se ha perdido la conexión a internet. Intente de nuevo más tarde.")
            setWarning(true);
        }

        return () => {
            window.removeEventListener("resize", changeWidth);
        }
    }, [connectionStatus, role, setAlertMessage, setLoading, setWarning])


    return (
        <>
            {<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AdminNavbar currentRole={role} />
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                }
                <Container className='me-auto'>
                    {loading === false ?
                        <>
                            {screenWidth < 1366 ? <>
                                <Container>
                                    <Routes>
                                        {    /*RUTAS DEL ROL ADMINISTRADOR*/}
                                        {role === "administrador" ? <>

                                            <Route path="perfil/" element={<Profile />} />
                                            <Route path="usuarios/" element={<Usuarios />} />
                                            <Route path="usuarios/add" element={<Form />} />
                                            <Route path="usuarios/:userId" element={<Form />} />

                                            <Route path="inicio" element={<InicioAdmin />} />
                                            <Route path="inicio/images" element={<SliderImages />} />
                                            <Route path="novedades" element={<PaginaEnConstruccion />} />
                                            <Route path="estudiantes/admin" element={<FilesOfStudents />} />
                                            <Route path="estudiantes/upload" element={<UploadFile />} />
                                            <Route path="secretaria/forms" element={<SecretariaForms />} />
                                            <Route path="secretaria/forms/:id" element={<SecretariaForms />} />
                                            <Route path="secretaria/anuncios" element={<AñadirAnuncio />} />
                                            <Route path="secretaria/anuncios/:id" element={<AñadirAnuncio />} />
                                            <Route path="secretaria/admin" element={<SecretariaAdmin />} />
                                            <Route path="contacto" element={<PaginaEnConstruccion />} />
                                            <Route path="plan-de-estudios" element={<EditPlanDeEstudios />} />
                                            {/*RUTAS DEL ROL Secretaria*/}
                                        </> : role === "secretaria" ? <>
                                            <Route path="perfil/" element={<Profile />} />
                                            <Route path="secretaria/forms" element={<SecretariaForms />} />
                                            <Route path="secretaria/forms/:id" element={<SecretariaForms />} />
                                            <Route path="secretaria/anuncios" element={<AñadirAnuncio />} />
                                            <Route path="secretaria/anuncios/:id" element={<SecretariaForms />} />
                                            <Route path="secretaria/admin" element={<SecretariaAdmin />} />
                                            {/*RUTAS DEL ROL Usuario*/}
                                        </> : role === "usuario" ? <>  <Route path="perfil/" element={<Profile />} /></> : role === '' || role === undefined || role === null ? window.location.replace("/inicio") : ''}




                                    </Routes>
                                </Container>

                            </> : <>
                                <Row >
                                    <div className='col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                                        {screenWidth >= 1366 ? <Menu role={role} /> : ''}
                                    </div>
                                    <div className='col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10'>
                                        <Container>
                                            <Routes>
                                                {    /*RUTAS DEL ROL ADMINISTRADOR*/}
                                                {role === "administrador" ? <>

                                                    <Route path="perfil/" element={<Profile />} />
                                                    <Route path="usuarios/" element={<Usuarios />} />
                                                    <Route path="usuarios/add" element={<Form />} />
                                                    <Route path="usuarios/:userId" element={<Form />} />
                                                    <Route path="inicio" element={<InicioAdmin />} />
                                                    <Route path="inicio/images" element={<SliderImages />} />
                                                    <Route path="novedades" element={<PaginaEnConstruccion />} />
                                                    <Route path="estudiantes/admin" element={<FilesOfStudents />} />
                                                    <Route path="estudiantes/upload" element={<UploadFile />} />
                                                    <Route path="secretaria/forms" element={<SecretariaForms />} />
                                                    <Route path="secretaria/anuncios" element={<AñadirAnuncio />} />
                                                    <Route path="secretaria/forms/:id" element={<SecretariaForms />} />
                                                    <Route path="secretaria/anuncios/:id" element={<AñadirAnuncio />} />
                                                    <Route path="secretaria/admin" element={<SecretariaAdmin />} />
                                                    <Route path="contacto" element={<PaginaEnConstruccion />} />
                                                    <Route path="plan-de-estudios" element={<EditPlanDeEstudios />} />
                                                    {/*RUTAS DEL ROL Secretaria*/}
                                                </> : role === "secretaria" ? <>
                                                    <Route path="perfil/" element={<Profile />} />
                                                    <Route path="secretaria/forms" element={<SecretariaForms />} />
                                                    <Route path="secretaria/anuncios" element={<AñadirAnuncio />} />
                                                    <Route path="secretaria/admin" element={<SecretariaAdmin />} />
                                                    {/*RUTAS DEL ROL Usuario*/}
                                                </> : role === "usuario" ? <>  <Route path="perfil/" element={<Profile />} /></> : role === '' || role === undefined || role === null ? window.location.replace("/") : <Route path="/" element={<Profile />} />
                                                }



                                            </Routes>
                                        </Container>

                                    </div>
                                </Row>
                            </>}




                        </> : <Loading text="Cargando" />}

                </Container>


            </motion.div>}
        </>
    )
}
