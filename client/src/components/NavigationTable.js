import React from 'react';

const NavigationTable = ({
    detailsType, 
    selectedVirus, 
    selectedVaccine, 
    selectedAccreditation,
    handleSelectVirus, 
    handleSelectVaccine, 
    handleSelectManufacturer, 
    handleSelectAccreditation, 
    getCountriesByVaccine, 
    getManufacturerByVaccine, 
    getRecommendationByVaccine, 
    getVaccineNames
}) => {
    return <div className='view-header table-responsive m-0'>
        <table className='table table-success w-100 m-0'>
            <thead>
                <tr>
                    <th>Virus</th>
                    <th>Vaccine(s)</th>
                    <th>Manufacturer</th>
                    <th>Accreditation</th>
                    <th className=''>Countries</th>
                    <th>Recommendation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='virus-cell'>
                        <span 
                            className={`${detailsType==="Virus" ? `selected` : `selectable`}`} 
                            onClick={()=>{handleSelectVirus(selectedVirus)}}>{selectedVirus.name}
                        </span>
                    </td>
                    <td className='vaccine-cell'>
                        {getVaccineNames(selectedVirus.vaccines).map((vaccine, index)=>
                        <span key={index}>
                            <span
                                className={`${detailsType==="Vaccine" && selectedVaccine.name === vaccine ? `selected` : `selectable`}`} 
                                onClick={()=>handleSelectVaccine(vaccine)}>
                                {vaccine}
                            </span>
                            {index < selectedVirus.vaccines.length-1 
                            ? <span className='text-decoration-none'>, </span> 
                            : ``}
                        </span>)}
                    </td>
                    <td className='manufacturer-cell'>
                        <span 
                            className={`${detailsType==="Manufacturer" ? `selected` : `selectable`}`} 
                            onClick={()=>handleSelectManufacturer()}>
                            {getManufacturerByVaccine()}
                        </span>
                    </td>
                    <td className='accreditation-cell'>
                        {selectedVaccine.accreditation.map((accreditation, index)=>
                        <span>
                            <span key={index} 
                                className={`${detailsType==="Accreditation" && selectedAccreditation === accreditation ? `selected` : `selectable`}`} 
                                onClick={()=>handleSelectAccreditation(accreditation)}>
                                {accreditation}
                            </span>{index<selectedVaccine.accreditation.length-1 ? <span className='text-decoration-none'>, </span> : ``}
                        </span>)}
                    </td>
                    <td className='country-cell'>
                        {<span className='text-muted'>
                            {getCountriesByVaccine()}
                        </span>}
                    </td>
                    <td className='recommendation-cell'>
                        {getRecommendationByVaccine()}
                    </td>
                </tr> 
            </tbody>
        </table>
    </div>
}

export default NavigationTable;