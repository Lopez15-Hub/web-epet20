import React, { useCallback, useEffect, useState } from 'react'
import { CardText, CardTitle } from 'reactstrap';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig';
import { BoxComments } from './BoxComments';
import UserIcon from "../../assets/user.png";
import { LoadingSpinner } from '../general/loading';
import { Title } from '../text-styles/title';
import { useLoading } from "../../hooks/useLoading";
export const Anuncio = () => {
    const [posts, setPosts] = useState([])
    const { loading, setLoading } = useLoading();
    const urlRegexSafe = require('url-regex-safe');
    const detectUrls = (text) => {
        if (text) {
            const matches = text.match(urlRegexSafe());
            if (matches) {
                return <a href={matches}>{matches}</a>
            }


        }

    }
    const getNovedades = useCallback(async () => {
        setLoading(true)
        const posts = []
        const querySnapshot = await getDocs(collection(db, "novedades"));
        querySnapshot.forEach((doc) => {

            posts.push({ ...doc.data(), id: doc.id });
        });

        setPosts(posts.reverse());
        setLoading(false)
    }, [setLoading])
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getNovedades();
        }

        return () => mounted = false;
    }, [getNovedades]);

    return <>
        <div>
            {loading ? <LoadingSpinner text="Obteniendo posts..." /> : <>
                {posts.length !== 0 ? <div>

                    {posts.map((post) => <div className=' m-4 '  key={post.id}>
                        <div className=' border rounded-t-lg'>
                            <div className='p-4'>
                                <div className='d-flex border-b mb-2'>
                                    <img src={post.submitByPhotoUrl ? post.submitByPhotoUrl : UserIcon} alt="User foto comment" className='img-profile-min-boxComment border' />

                                    <p className='m-2 font-bold main-color'>{post.submitBy}</p>

                                </div>

                                <CardTitle as="div">
                                    {post.title}
                                </CardTitle>
                                <CardText as="div">
                                    {detectUrls(post.description)}
                                </CardText>
                                <CardText as="div">
                                    <small className="text-muted">
                                        Subido el: {post.submitAt.toDate().toLocaleDateString()}
                                    </small>
                                </CardText>
                            </div>
                        </div>
                        {post.url !== "" ? <img
                            className='img-anuncio w-100'
                            alt="anuncio imagen"
                            src={post.url} /> : ''}
                        <BoxComments anuncioId={post.id} />
                    </div>

                    )}

                </div> : <Title text="No hay novedades aún." />}
            </>}
        </div>
    </>;
};
