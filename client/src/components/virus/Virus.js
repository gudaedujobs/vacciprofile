import React from 'react';

const Virus = ({selectedVirus, italizeScientificNames}) => {
    return <div>
        <h4 className='report-heading'>{selectedVirus.name}</h4>
        <p>{italizeScientificNames(selectedVirus.description)}</p>
    </div>
}

export default Virus;