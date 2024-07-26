import React from 'react';

const NavigationTable = ({
    detailsType, 
    selectedVirus, 
    selectedVaccine, 
    selectedAccreditation,
    handleSelectVirus, 
    handleSelectVaccine, 
    handleSelectAccreditation, 
    getVaccinesByManufacturer,
    getCountriesByVaccine, 
    getRecommendationByVaccine, 
    getVirusByVaccine
}) => {
    return <div className='view-header table-responsive m-0'>
        <table className='table table-success w-100 m-0'>
            <thead>
                <tr>
                    <th>Vaccine</th>
                    <th>Virus/ Bacteria</th>
                    <th>Accreditation</th>
                    <th>Countries</th>
                    <th>Recommendation</th>
                </tr>
            </thead>
            <tbody>
                {getVaccinesByManufacturer().map((vaccine, key)=><tr key={key}>
                    <td className='vaccine-cell'>
                        <span
                            className={`${detailsType==="Vaccine" && selectedVaccine.name === vaccine.name ? `selected` : `selectable`}`} 
                            onClick={()=>handleSelectVaccine(vaccine)}>
                            {vaccine.name}
                        </span>
                    </td>
                    <td className='virus-cell'>
                        <span 
                            className={`${detailsType==="Virus" && selectedVirus.name === getVirusByVaccine(vaccine).name ? `selected` : `selectable`}`} 
                            onClick={()=>{handleSelectVirus(getVirusByVaccine(vaccine))}}>{getVirusByVaccine(vaccine).name}
                        </span>
                    </td>
                    <td className='accreditation-cell'>
                        {vaccine.accreditation.map((accreditation, index)=>
                        <span>
                            <span key={index} 
                                className={`${detailsType==="Accreditation" && selectedAccreditation === accreditation ? `selected` : `selectable`}`} 
                                onClick={()=>handleSelectAccreditation(accreditation)}>
                                {accreditation}
                            </span>{index<vaccine.accreditation.length-1 ? <span className='text-decoration-none'>, </span> : ``}
                        </span>)}
                    </td>
                    <td className='country-cell'>
                        {<span className='text-muted'>
                            {getCountriesByVaccine(vaccine)}
                        </span>}
                    </td>
                    <td className='recommendation-cell'>
                        <span>
                            {getRecommendationByVaccine(vaccine)}
                        </span>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}

export default NavigationTable;