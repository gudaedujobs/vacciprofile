import React from 'react';

const Vaccine = ({ selectedVaccine, italizeScientificNames }) => {
    return <div className='position-relative'>
        <h4 className='report-heading'>{selectedVaccine.name}</h4>
        <p className='mb-3'>{italizeScientificNames(selectedVaccine.description)}</p>
        <p className='mb-0'><a className='read-more' target="_blank" rel="noopener noreferrer" href={`${selectedVaccine.link}`}>Learn more...</a></p>
        <span className='last-updated text-muted position-absolute end-0 bottom-0'>Last updated: {selectedVaccine.lastUpdated}</span>
    </div> 
}

export default Vaccine;