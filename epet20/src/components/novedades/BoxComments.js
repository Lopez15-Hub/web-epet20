import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, limit, onSnapshot, query, setDoc, where, } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { Input, Form, InputGroup } from 'reactstrap'
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md'
import { auth } from '../../firebase/firebaseConfig'
import { LoadingSpinner } from '../general/loading';
import { useForm } from '../../hooks/useForm';
import { v4 as uuidv4 } from 'uuid';
import { Subtitle } from '../text-styles/subtitle';
import UserIcon from "../../assets/user.png";
import { Link } from 'react-router-dom'
import { useRole } from '../../hooks/useRole';
export const BoxComments = ({ anuncioId }) => {
    const [comments, setcomments] = useState([])

    const { values, handleChange } = useForm();
    const { comment } = values;
    const { role } = useRole();
    const createComment = (e) => {
        e.preventDefault();
        const commentId = uuidv4();
        const commentsRef = doc(db, "comments", commentId);

        setDoc(commentsRef, {
            anuncioId: anuncioId,
            comment: comment,
            commentId: commentId,

            submitBy: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
            submitByPhotoUrl: auth.currentUser.photoURL,
            submitAt: new Date().toLocaleString(),

        }).then(() => {
            console.log("comentario creado");
            document.getElementById("comment-form").reset();
        })



    }
    const deleteComment = async (id) => {
        const commentQuery = collection(db, "comments");
        await deleteDoc(doc(commentQuery, id)).then(() => {
            console.log("comentario eliminado");
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        const q = query(collection(db, "comments"), limit(5), where("anuncioId", "==", anuncioId));
        const comments = [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                comments.push({ ...doc.data(), id: doc.id });

            });
            setcomments(comments);
        });

        return () => unsubscribe();
    }, [anuncioId, comments]);


    return <div className='border rounded-b-lg'>

        {comments ? <>

            <ul className='ml-2 mt-2 box-comment'>

                {comments.length > 0 ? <div>
                    {comments.map((comment) =>

                        <li className='d-flex mb-4' key={comment.commentId}>
                            <img src={comment.submitByPhotoUrl ? comment.submitByPhotoUrl : UserIcon} alt="User foto comment" className='img-profile-min-boxComment border' />

                            <div className="rounded-lg comment p-2 shadow-md container ">
                                <div className='d-flex'>
                                    <p className='main-color text-sm font-bold'>{comment.submitBy}</p>
                                    <p className='text-muted ml-2 text-sm'>Publicado el: {comment.submitAt.substring(0, 10)}</p>
                                </div>
                                <p className='text-sm text-comment w-100'>{comment.comment}</p>
                                {(auth.currentUser && comment.userId === auth.currentUser.uid) || role === "administrador" ?
                                    <button className='ml-2 text-danger' onClick={() => deleteComment(comment.id)} >Eliminar</button> : ''}
                            </div>
                        </li>)
                    }
                    <button className='text-decoration-none'>Ver más...</button>
                </div> : <><Subtitle text={"No hay comentarios aún. ¡Sé el primero en agregar uno!"} /></>}


            </ul>
        </> : <LoadingSpinner text={'Cargando datos...'} />}


        <Form id="comment-form" className='p-2 border-t shadow-md' onSubmit={createComment}>
            {auth.currentUser ? '' : <p className='text-muted'>Debes <Link to="/login" className='main-color'>iniciar sesión</Link> para comentar</p>}
            <InputGroup  >

                {auth.currentUser ? <>
                    <Input onChange={handleChange} name='comment' className='rounded-xl' placeholder="Añadir un comentario " />
                    {comment === "" || comment === undefined ? <button type='submit' disabled className='btn btn-primary btn-sm d-flex btn-block rounded-xl'>
                        Enviar <MdOutlineSubdirectoryArrowRight />
                    </button> : <button type='submit' className='btn btn-primary btn-sm d-flex btn-block rounded-xl'>
                        Enviar <MdOutlineSubdirectoryArrowRight />
                    </button>}
                </> : <>
                    <Input disabled onChange={handleChange} name='comment' className='rounded-xl' placeholder="Añadir un comentario " />

                </>}

            </InputGroup>
        </Form>
    </div >;
};

