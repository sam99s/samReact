import React, { useState } from 'react';
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

    return(
        <div className="container-fluid">
            <div className="container-fluid SoloEstudios d-flex align-items-center justify-content-center">
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
                
                <CartasContainer key={study.id} {...study}/> 

                :

                /* Sin Cards */

                <div className="col-12 mt-5" key={study.id}>
                    <h2 className="text-center mb-5 text-decoration-underline">{study.title}</h2>
                    <div className="container d-block d-sm-flex justify-content-between align-items-center">
                        <img src={study.image} alt={study.title} className="col-12 col-sm-4 imageStudy"/>
                        <p className="col-12 col-sm-6 fs-5 text-center">{study.description}</p>
                    </div>
                    <div>
                        {study.vista ? 
                        <div className="container">

                            <div className="d-flex align-items-center justify-content-center gifContainer">
                                <img src={study.vista} alt={study.title} className="col-8 col-md-6 gifImage"/>
                            </div>

                            <div className="container d-flex align-items-center justify-content-center">
                                <a href={study.repositorio} target="_blank" rel="noreferrer"><button type="button" className="btn btn-outline-light repositorio">Visitar Repositorio</button></a>
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
