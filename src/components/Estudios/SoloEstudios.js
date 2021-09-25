import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import './SoloEstudios.scss'
import { CartasContainer } from './Cartas/CartasContainer';

export const SoloEstudios = () => {

    const [lerned, setLerned] = useState([])

    
    const allStudies = async() => {
        try{
            const snapshot = db.collection('soloEstudios');
            await snapshot.get()
                .then((response) => {
                    const data = response.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                    
                    setLerned(data)
                })
            
            
        } catch (err) {
            console.error(err)
        }
    }

    if (lerned.length === 0){
        allStudies()
    }

    useEffect(() => {
        console.log("lerned: ", lerned)
    }, [lerned])

    return(
        <div className="container-fluid">
            <div className="container-fluid estudios d-flex align-items-center justify-content-center">
                <div>
                    <span className="tituloSpan">Estudios</span>
                </div>                            
            </div>

            <div className="container">
                <p className="mb-5 mt-5 fs-4 text-center">Esta es la sección donde encontraras más informacion respecto a mis estudios y distintas virtudes aprendidas en las instituciones a las cuales me presente.</p>
                <p className="mb-5 mt-5 fs-4 text-center">¿Listo para conocer más sobre mi? ¡Comencemos!💪</p>
            </div>

            <div className="container lerned">
                {lerned.map((study) =>  study.title === 'Maquetador Web' 

                ?
                
                <CartasContainer {...study}/> 

                :

                /* Sin Cards */

                <div className="col-12 mt-5" id={study.id}>
                    <h2 className="text-center mb-5 text-decoration-underline">{study.title}</h2>
                    <div className="container d-flex justify-content-between align-items-center">
                        <img src={study.image} alt={study.title} className="col-4 imageStudy"/>
                        <p className="col-6 fs-5 text-center">{study.description}</p>
                    </div>
                    <div>
                        {study.vista ? 
                        <div className="container">

                            <div className="d-flex align-items-center justify-content-center">
                                <img src={study.vista} alt={study.title} className="col-4 gifImage"/>
                            </div>

                            <div className="container d-flex align-items-center justify-content-center">
                                <a href={study.repositorio} target="_blank"><button type="button" className="btn btn-info repositorio">Visitar Repositorio</button></a>
                            </div>

                        </div>
                        : 
                        <></>
                        }
                        
                    </div>
                    <p className="col-12 fs-5 text-center">{study.more}</p>                        
                </div>                
                )}
            </div>

        </div>
    )
}