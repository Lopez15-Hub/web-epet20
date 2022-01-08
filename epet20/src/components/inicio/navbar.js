import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavbarBrand } from 'reactstrap';
import Icon from '../../assets/favicon.png';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";



function Navbar() {
    const [user, setUser] = useState();
    const [role, setRole] = useState();

    useEffect(() => {
        handleUserData();
    }, [])
    const handleUserData = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    photoUrl: user.photoURL,
                    displayName: user.displayName,

                })
                handleRole(user.uid);
            } else {
                console.log('no user' + role);
                console.log("cargando...")
            }
        });
    }
    const handleRole = async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("ROLE: " + docSnap.data().role)
            setRole(docSnap.data().role);
        } else {
            console.log("No such document!");
        }
    }

    const handleSignOut = () => {
        auth.signOut();
        window.location.replace("/");
    }
    /*
    Navbar ES LA SECCIÓN DE 
    LA PÁGINA DONDE SE ENCUENTRA 
    EL LOGO Y EL MENÚ DE NAVEGACIÓN
    */


    return <nav className="navbar bg-light sticky fixed-top navbar-expand-xl  navbar-light p-2 rounded-b-xl shadow-md ">
        <div className="container-fluid text-center ">
            <img src={Icon} className="shadow-xl rounded-xl " alt="Logo" />
            <NavbarBrand><Link to="/inicio" className=" font-bold p-2 main-color ">E.P.E.T N° 20</Link></NavbarBrand>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarScroll">
                <Nav className="navbar-nav  me-auto my-2 m-6 my-lg-0 navbar-nav-scroll" >
                    <div className=" m-2">
                        <Link to="/novedades" className=" font-bold p-2 nav-color ">Novedades</Link>
                    </div>
                    <div className="m-2">
                        <Link to="/estudiantes" className=" font-bold p-2 nav-color   ">Estudiantes</Link>
                    </div>
                    <div className="m-2">
                        <Link to="/secretaria" className=" font-bold p-2  nav-color  ">Secretaria</Link>
                    </div>

                    <div className="m-2">
                        <Link to="/contacto" className=" font-bold  p-2  nav-color ">Contacto</Link>
                    </div>
                    <div className="m-2">
                        <Link to="/plan-de-estudios" className=" font-bold  p-2  nav-color ">Plan de estudios</Link>
                    </div>
                    <div className="m-2">
                        <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" className="nav-color font-bold p-2  ">¿Estoy inscripto?</a>
                    </div>

                </Nav>
                <hr />
                <div className="text-center">
                    <div className="d-flex">
                        {user ?
                            <>

                                <Link to="/admin" className="p-1 m-1">

                                    <img className='img-profile-min ' src={auth.currentUser.photoURL ? auth.currentUser.photoURL : 'https://cdn4.iconfinder.com/data/icons/happy-people-3/64/avatar-guy-profile-smile-512.png'} alt={'Foto de perfil de ' + user.displayName} />
                                </Link>


                                <button className="my-outlined-button  text-center font-bold rounded-md shadow-md mx-auto top-50 p-1 m-1" onClick={handleSignOut}>Cerrar sesión</button>

                            </>

                            :
                            <>
                                <Link to="/login" className=" d-block  btn my-btn text-white text-center shadow-md font-bold p-1 m-1">Iniciar sesión</Link>
                                <Link to="/registro" type="submit" className=" d-block my-outlined-button  text-center font-bold rounded-md shadow-md p-1 m-1">Registrarse</Link>
                            </>

                        }



                    </div>
                </div>
            </div>
        </div>
    </nav >;

}

export default Navbar;

