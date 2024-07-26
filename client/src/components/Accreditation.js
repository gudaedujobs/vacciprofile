import React from 'react';

const Accreditation = ({
    handleSelectVaccine,
    selectedAccreditation,
    getVaccinesByAccreditation
}) => {
    return <div className='slide-left'>
        <h4 className='report-heading'>{selectedAccreditation}-approved Vaccines</h4>
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
                    {getVaccinesByAccreditation().map((vaccine, index) => (
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

export default Accreditation;