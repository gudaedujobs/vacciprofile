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
</div>
}

export default Manufacturer;