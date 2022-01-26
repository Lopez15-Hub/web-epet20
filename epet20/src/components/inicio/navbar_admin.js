import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Nav, NavbarBrand } from 'reactstrap';
import Icon from '../../assets/favicon.png';
import { auth } from '../../firebase/firebaseConfig';


export const NavbarAdmin = ({ currentRole }) => {
    const [user, setUser] = useState({ displayName: '' });
    const handleSignOut = () => {
        auth.signOut();
        window.location.replace('/inicio');
    }
    const handleUserData = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    displayName: user.displayName,

                })

            } else {
                console.log("cargando...")
            }
        });
    }
    useEffect(() => {
        handleUserData();
    }, [])

    return <nav className="navbar bg-light sticky fixed-top navbar-expand-xl  navbar-light p-2 rounded-b-xl shadow-md ">
        <div className="container-fluid text-center ">
            <img src={Icon} className="shadow-xl rounded-xl " alt="Logo" />
            <NavbarBrand><Link to="/inicio" className=" font-bold p-2 main-color ">{currentRole === 'administrador' ? 'Panel de administrador' : 'General'}</Link></NavbarBrand>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarScroll">
                <Nav className="navbar-nav  me-auto my-2 m-6 my-lg-0 navbar-nav-scroll" >
                </Nav>

                <div className="text-center">
                    <div className="d-flex">

                        <>
                            <Link to="/admin" className=" d-block  text-center font-bold p-1 m-1 nav-color btn rounded-xl">{user.displayName ? user.displayName : 'Cargando...'}</Link>
                            <button className=" d-block my-outlined-button  text-center font-bold rounded-md shadow-md p-1 m-1" onClick={handleSignOut}>Cerrar sesión</button>
                        </>







                    </div>
                </div>
            </div>
        </div>
    </nav >;
}
