import React from 'react'
import {Row,Card} from 'react-bootstrap';


export default function Advertisements () {

    return (
        <>
                <Row  className="justify-content-md-center">
                    <Card style={{ width: '50rem' }}>
                            <Card.Body>
                            <Card.Title className="text-center">Anuncios</Card.Title>
                            <Card.Text className="text-center">
                            Lopez es un wachin que le hizo la aplicación a Meng de Flutter
                            </Card.Text>
                            <br />
                            <Card.Text className="text-right">
                                Por: Castro Tomás (Desarrollador)
                            </Card.Text>
                            </Card.Body>
                        </Card>
                </Row>
        </>
    )
}