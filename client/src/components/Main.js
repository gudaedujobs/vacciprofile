import React from 'react';

import NavigationTable from './NavigationTable';
import Virus from './virus/Virus';
import Vaccine from './vaccine/Vaccine';
import Manufacturer from './manufacturer/Manufacturer';
import Accreditation from './accreditation/Accreditation';

const Main = ({
    viruses, 
    activeFilters, 
    filterViruses, 
    selectedVirus, 
    selectedVaccine, 
    selectedManufacturer,
    selectedAccreditation, 
    detailsType, 
    handleSelectVirus, 
    handleSelectVaccine, 
    handleSelectManufacturer, 
    handleSelectAccreditation, 
    getCountriesByVaccine, 
    getVaccineNames, 
    getVaccinesByManufacturer,
    getManufacturerByVaccine, 
    getVaccinesByAccreditation,
    getRecommendationByVaccine,
    italizeScientificNames,
    convertCamelCaseToReadable
}) => {
    return <div className='view-container bg-white col-6 col-sm-8 col-lg-9 p-0'>
        <div className='border border-primary border-1 rounded-4'>
            { filterViruses(viruses).length === 0 ? <div className='empty-view d-flex justify-content-center align-items-center'>
                    {/* <a>Clear filters</a> */}
                </div> : (activeFilters.firstAlphabet || JSON.stringify(selectedVirus) === '{}') ? <div className='empty-view position-relative'>
                <img className='arrow-image position-absolute' src="/images/arrow.png" alt="Arrow" width={100} height={100}/>
                <span className='select-prompt position-absolute'>Select a vaccine to begin</span>
            </div> : <>
                <h1 className='heading text-primary px-3 pt-2'>Updated Virus-Reported Data</h1>
                <NavigationTable 
                    detailsType={detailsType}
                    selectedVirus={selectedVirus}
                    selectedVaccine={selectedVaccine}
                    selectedAccreditation={selectedAccreditation}
                    handleSelectVirus={handleSelectVirus} 
                    handleSelectVaccine={handleSelectVaccine}
                    handleSelectManufacturer={handleSelectManufacturer}
                    handleSelectAccreditation={handleSelectAccreditation}
                    getCountriesByVaccine={getCountriesByVaccine}
                    getVaccineNames={getVaccineNames}
                    getManufacturerByVaccine={getManufacturerByVaccine}
                    getRecommendationByVaccine={getRecommendationByVaccine}
                />
                <div className='details-container px-3 pt-2 pb-3'>
                    {detailsType==="Virus" 
                    ? <Virus 
                        selectedVirus={selectedVirus} 
                        italizeScientificNames={italizeScientificNames}
                    /> : detailsType==="Vaccine" 
                    ? <Vaccine 
                        selectedVaccine={selectedVaccine}
                        italizeScientificNames={italizeScientificNames}
                    />: detailsType==="Manufacturer" 
                    ? <Manufacturer
                        selectedManufacturer={selectedManufacturer}
                        handleSelectVaccine={handleSelectVaccine}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                    /> : detailsType==="Accreditation" 
                    ? <Accreditation
                        handleSelectVaccine={handleSelectVaccine}
                        selectedAccreditation={selectedAccreditation}
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                    /> 
                    : <></>}
                </div>
            </>}
        </div>
    </div>
}

export default Main;