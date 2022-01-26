import React, { useEffect, useState } from 'react'
import { CardText, CardTitle } from 'reactstrap';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig';
import { BoxComments } from './BoxComments';
import { useDate } from '../../hooks/useDate';
import UserIcon from "../../assets/user.png";
import { LoadingSpinner } from '../general/loading';
import { Title } from '../text-styles/title';
import { useLoading } from "../../hooks/useLoading";
export const Anuncio = () => {
    const [posts, setPosts] = useState([])
    const { formatDate } = useDate();
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
    useEffect(() => {
        let mounted = true;
        const getNovedades = async () => {
            setLoading(true)
            const posts = []
            const querySnapshot = await getDocs(collection(db, "novedades"));
            querySnapshot.forEach((doc) => {

                posts.push({ ...doc.data(), id: doc.id });
            });

            setPosts(posts.reverse());
            setLoading(false)
        }
        if (mounted) {
            getNovedades();
        }

        return () => mounted = false;
    }, [setLoading, posts, setPosts]);

    return <>
        <div>
            {loading ? <LoadingSpinner text="Obteniendo posts..." /> : <>
                {posts.length !== 0 ? <div>

                    {posts.map((post) => <div className=' m-4'>
                        <div className=' border rounded-t-lg' key={post.id}>
                            <div className='p-4'>
                                <div className='d-flex border-b mb-2'>
                                    <img src={post.submitByPhotoUrl ? post.submitByPhotoUrl : UserIcon} alt="User foto comment" className='img-profile-min-boxComment border' />

                                    <p className='m-2 font-bold main-color'>{post.submitBy}</p>

                                </div>

                                <CardTitle>
                                    {post.title}
                                </CardTitle>
                                <CardText>
                                    {detectUrls(post.description)}
                                </CardText>
                                <CardText>
                                    <small className="text-muted">
                                        Subido el: {formatDate(post.submitAt)}
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
