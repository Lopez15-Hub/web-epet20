import React from 'react'
import { DiscussionEmbed } from 'disqus-react';

export default function BoxComments () {
    return (
        <section>
            <DiscussionEmbed
                shortname='e-p-e-t-n20'
                config= {
                    {
                        url: "http://localhost:3000/novedades",
                        identifier: 0,
                        title: "Comentarios para los anuncios",
                        language: 'es_MX' 
                    }
                }
            />
        </section>
    )
}
