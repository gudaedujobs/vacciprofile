import React, { useState, useEffect, useRef } from 'react';

import NavigationTable from './NavigationTable';
import Virus from './Virus';
import Vaccine from './Vaccine';
import Manufacturer from './Manufacturer';
import Accreditation from './Accreditation';

const Main = ({
    activeFilters,
    setActiveFilters,
    manufacturersList, 
    selectedVirus, 
    selectedVaccine, 
    selectedManufacturer,
    selectedAccreditation, 
    detailsType, 
    handleSelectVirus, 
    handleSelectVaccine, 
    handleSelectAccreditation, 
    getCountriesByVaccine,
    getVirusByVaccine,
    getVaccinesByManufacturer,
    getVaccinesByAccreditation,
    getRecommendationByVaccine,
    italizeScientificNames,
    convertCamelCaseToReadable,
    changedFrom
}) => {
    const detailsRef = useRef(null);
    const prevChangedFrom = useRef(changedFrom);

    const [slideClass, setSlideClass] = useState('slide-left');

    useEffect(() => {
        if (prevChangedFrom.current !== 'Sidebar' && changedFrom !== 'Sidebar') {
            if (detailsRef.current) {
                detailsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
        prevChangedFrom.current = changedFrom;
    }, [selectedVirus, selectedVaccine, selectedManufacturer, selectedAccreditation, changedFrom]);

    useEffect(() => {
        setSlideClass(''); 
        const timeout = setTimeout(() => {
            setSlideClass('slide-left'); 
        }, 0); 
        return () => clearTimeout(timeout);
    }, [selectedManufacturer]);

    return <div className={`view-container bg-white col-6 col-sm-8 col-lg-9 p-0 ${slideClass}`}>
        <div className='border border-primary border-1 rounded-4 slide-left'>
            { manufacturersList.length === 0 ? <div className='empty-view d-flex justify-content-center align-items-center'>
                    <span className='clear-filters text-decoration-underline' onClick={()=>setActiveFilters({...activeFilters, searchString: '', firstAlphabet: ''})}>
                        Clear filters
                    </span>
                </div> : ( manufacturersList.length!==0 && JSON.stringify(selectedManufacturer) === '{}') 
                ? <div className='empty-view position-relative'>
                <img className='arrow-image position-absolute' src="/images/arrow.png" alt="Arrow" width={100} height={100}/>
                <span className='select-prompt position-absolute'>Select a Manufacturer</span>
            </div> : <>
                <h1 className='heading text-primary px-3 pt-2'>Updated {selectedManufacturer.name} Reported Data</h1>
                {getVaccinesByManufacturer().length>0 
                ? <NavigationTable 
                    detailsType={detailsType}
                    selectedVirus={selectedVirus}
                    selectedVaccine={selectedVaccine}
                    selectedAccreditation={selectedAccreditation}
                    handleSelectVaccine={handleSelectVaccine}
                    handleSelectVirus={handleSelectVirus} 
                    handleSelectAccreditation={handleSelectAccreditation}
                    getVaccinesByManufacturer={getVaccinesByManufacturer}
                    getVirusByVaccine={getVirusByVaccine}
                    getCountriesByVaccine={getCountriesByVaccine}
                    getRecommendationByVaccine={getRecommendationByVaccine}
                /> : ``}
                <div className='details-container px-3 pt-2 pb-3' ref={detailsRef}>
                    {detailsType==="Virus" 
                    ? <Virus 
                        selectedVirus={selectedVirus} 
                        italizeScientificNames={italizeScientificNames}
                    /> : detailsType==="Vaccine" 
                    ? <Vaccine 
                        selectedVaccine={selectedVaccine}
                        italizeScientificNames={italizeScientificNames}
                    /> : detailsType==="Manufacturer" 
                    ? <Manufacturer
                        selectedManufacturer={selectedManufacturer}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                    /> : detailsType==="Accreditation" 
                    ? <Accreditation
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                        handleSelectVaccine={handleSelectVaccine}
                        selectedAccreditation={selectedAccreditation}
                    /> 
                    : <></>}
                </div>
            </>}
        </div>
    </div>
}

export default Main;