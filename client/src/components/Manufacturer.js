import React from 'react';

const Manufacturer = ({ selectedManufacturer, getVaccinesByManufacturer, handleSelectVaccine, convertCamelCaseToReadable}) => {
    return <div>
    <h4 className='report-heading'>{selectedManufacturer.name}</h4> 
    <p>{selectedManufacturer.description}</p>
    <div className='table-responsive'>
        <table className='table table-light w-100 m-0'>
            <thead>
                <tr>
                    <th className='text-center' colSpan={2}>Information</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(selectedManufacturer.information).map(([attributeKey, attributeValue], index) => {
                    return attributeKey !== "sources" && attributeKey !== "lastUpdated" ? <tr key={index}>
                        <td className='text-center' style={{ width: '50%' }}>{convertCamelCaseToReadable(attributeKey)}</td>
                        <td className='text-center'>{attributeValue}</td>
                    </tr> : <></> ;
                })}
            </tbody>
        </table>
    </div>
    <span className='sources-list'>Source(s): {selectedManufacturer.information.sources.map((source, index)=><span key={index}>
        <a className='manufacturer-table-source' href={`${source.link}`} target="_blank" rel="noopener noreferrer">{source.title}</a>
        <span> ({source.lastUpdated}){selectedManufacturer.information.sources.length>1 && index<selectedManufacturer.information.sources.length-1 ? ', ' : ''}</span></span>)}
    </span>
    <div className='table-responsive'>
        <table className='table table-light w-100 m-0 mt-3'>
            <thead>
                <tr>
                    <th colSpan={4} className='text-center'><i>Vaccines</i></th>
                </tr>
                <tr>
                    <th><i>Tradename</i></th>
                    <th><i>Vaccine Type</i></th>
                    <th><i>Comments</i></th>
                    <th><i>Revenue</i></th>
                </tr>
            </thead>
            <tbody>
                {getVaccinesByManufacturer().map((vaccine, index) => (
                    <tr key={index}>
                        <td><i>{<span className='text-primary fw-bold hover-underline' onClick={()=>handleSelectVaccine(vaccine.name)}>{vaccine.name}</span>}</i></td>
                        <td><i>{vaccine.vaccineType || '-'}</i></td>
                        <td><i>{vaccine.comments || '-'}</i></td>
                        <td><i>{vaccine.revenue || '-'}</i></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default Manufacturer;