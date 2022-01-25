import React, { useEffect, useState } from 'react'
import { CardText, CardTitle } from 'reactstrap';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig';
import { BoxComments } from './BoxComments';
import { useDate } from '../../hooks/useDate';


export const Anuncio = () => {
    const [posts, setPosts] = useState([])
    const { formatDate } = useDate(0, 0);
    useEffect(() => {
        let mounted = true;
        const getNovedades = async () => {
            const posts = []
            const querySnapshot = await getDocs(collection(db, "novedades"), orderBy("submitAt", "desc"));
            querySnapshot.forEach((doc) => {

                posts.push({ ...doc.data(), id: doc.id });
            });
            setPosts(posts);
        }
        if (mounted) {
            getNovedades();
        }

        return () => mounted = false;
    }, []);

    return <>
        <div>
            {posts.map((post) => <div className=' m-4'>
                <div className=' border rounded-t-lg' key={post.id}>
                    <div className='p-4'>
                        <CardTitle>
                            {post.title}
                        </CardTitle>
                        <CardText>
                            {post.description}
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

        </div>
    </>;
};
