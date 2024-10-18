import React from 'react';

interface Props {
    nombre:string
}


const Convocatoria: React.FC<Props> = ({nombre}) => {
    return (
        <h2> {nombre} </h2> 
    )
}

export default Convocatoria