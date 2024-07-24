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
                    <th>Countries</th>
                    <th>Manufacturer</th>
                    <th>Accreditation</th>
                    <th>Recommendation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='virus-cell'>
                        <span 
                            className={`hover-pill ${detailsType==="Virus" ? `fw-bold text-selected` : ``}`} 
                            onClick={()=>{handleSelectVirus(selectedVirus)}}>{selectedVirus.name}
                        </span>
                    </td>
                    <td className='vaccine-cell'>
                        {getVaccineNames(selectedVirus.vaccines).map((vaccine, index)=>
                        <span key={index}>
                            <span
                                className={`hover-pill ${detailsType==="Vaccine" && selectedVaccine.name === vaccine ? `pill-unselected badge` : ``}`} 
                                onClick={()=>handleSelectVaccine(vaccine)}>
                                {vaccine}
                            </span>
                            {index < selectedVirus.vaccines.length-1 
                            ? <span className='text-decoration-none'>, </span> 
                            : ``}
                            </span>)}
                        </td>
                    <td className='country-cell'>
                        {<span className='text-muted'>
                            {getCountriesByVaccine()}
                        </span>}
                    </td>
                    <td className='manufacturer-cell'>
                        <span 
                            className={`hover-pill ${detailsType==="Manufacturer" ? `fw-bold text-selected` : ``}`} 
                            onClick={()=>handleSelectManufacturer()}>
                            {getManufacturerByVaccine()}
                        </span>
                    </td>
                    <td className='accreditation-cell'>
                        {selectedVaccine.accreditation.map((accreditation, index)=>
                        <span key={index} 
                            className={`hover-pill ${detailsType==="Accreditation" && selectedAccreditation === accreditation ? `pill-unselected badge` : ``}`} 
                            onClick={()=>handleSelectAccreditation(accreditation)}>
                                {accreditation}{index<selectedVaccine.accreditation.length-1 ? `, ` : ``}
                        </span>)}
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