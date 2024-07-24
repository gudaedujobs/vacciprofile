import React, { useState } from 'react';
import './App.scss';

import Header from './components/Header';
import Alphabets from './components/Alphabets';
import NavigationTable from './components/NavigationTable';
import Sidebar from './components/Sidebar';
import Virus from './components/virus/Virus';
import Vaccine from './components/vaccine/Vaccine';
import Manufacturer from './components/manufacturer/Manufacturer';

import manufacturers from './assets/data/manufacturers.json';
import viruses from './assets/data/viruses.json';
import vaccines from './assets/data/vaccines.json';
import scientificNames from './assets/scientificNames';

const App = () => {
    const [activeFilters, setActiveFilters] = useState({
        firstAlphabet: ''
    })
    const [selectedVirus, setSelectedVirus] = useState({});
    const [selectedVaccine, setSelectedVaccine] = useState(vaccines[0]);
    const [selectedManufacturer, setSelectedManufacturer] = useState({});
    const [selectedAccreditation, setSelectedAccreditation] = useState(vaccines[0].accreditation[0])
    const [detailsType, setDetailsType] = useState("Virus");

    const filterViruses = virusList => {
        return activeFilters.firstAlphabet !== '' ? filterVirusesByAlphabet(virusList) : virusList;
    }

    const filterVirusesByAlphabet = virusList => {
        return virusList.filter(virus => virus.name.startsWith(activeFilters.firstAlphabet));
    }

    const handleSearch = keyword => {
        // Handle search logic here
    };

    const handleSelectVirus = virus => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === virus.vaccines[0].vaccineId);
        setSelectedVaccine(vaccine);
        setSelectedVirus(virus);
        setDetailsType("Virus");
        setActiveFilters({...activeFilters, firstAlphabet: ''});
    };

    const handleSelectVaccine = name => {
        const vaccine = vaccines.find(vaccine=> vaccine.name === name);
        setSelectedVaccine(vaccine);
        setDetailsType("Vaccine");
    };

    const handleSelectManufacturer = () => {
        const manufacturer = manufacturers.find(manufacturer=> manufacturer.manufacturerId === selectedVaccine.manufacturerId);
        setSelectedManufacturer(manufacturer);
        setDetailsType("Manufacturer");
    };

    const handleSelectAccreditation = accreditation => {
        setSelectedAccreditation(accreditation);
        setDetailsType("Accreditation");
    }

    const getVaccineById = vaccineId => {
        return vaccines.find(vaccine => vaccine.vaccineId === vaccineId);
    };

    const getCountriesByVaccine = () => {
        const vaccine = getVaccineById(selectedVaccine.vaccineId);
        return vaccine.countries.join(', ');
    };    

    const getManufacturerByVaccine = () => {
        const manufacturer = manufacturers.find(manufacturer=>manufacturer.manufacturerId===selectedVaccine.manufacturerId)
        return manufacturer.name;
    };

    const getRecommendationByVaccine = () => {
        return selectedVaccine.recommendation;
    };

    const getVaccineNames = vaccinesArray => {
        if (!vaccinesArray || vaccinesArray.length === 0) return ['-'];
    
        return vaccinesArray.map(vaccine => {
            const vaccineDetail = getVaccineById(vaccine.vaccineId);
            return vaccineDetail ? vaccineDetail.name : '-';
        });
    };

    const getVaccinesByAccreditation = () => {
        return vaccines.filter(vaccine => vaccine.accreditation.includes(selectedAccreditation));
    }

    const getVaccinesByManufacturer = () => {
        return vaccines.filter(vaccine => vaccine.manufacturerId === selectedManufacturer.manufacturerId);
    }

    const convertCamelCaseToReadable = string => {
        return string==="ceo" ? "CEO" : string.replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase());
    };

    const italizeScientificNames = text => {
        const parts = text.split(new RegExp(`(${scientificNames.join('|')})`, 'gi'));
    
        return (
            <span>
                {parts.map((part, index) => {
                    const isScientificName = part && scientificNames.some(name => name.toLowerCase() === part.toLowerCase());
                    return isScientificName ? (
                        <i key={index}>{part}</i>
                    ) : (
                        part
                    );
                })}
            </span>
        );
    };
    
    return (
        <div className='vacciprofile-page'>
            <div className='container'>
                <Header/>
                <div className='row py-4'>
                    <Sidebar
                        viruses={viruses}
                        filterViruses={filterViruses}
                        selectedVirus={selectedVirus}
                        handleSelectVirus={handleSelectVirus}
                        handleSearch={handleSearch}
                    />
                    <div className='view-container bg-white col-6 col-sm-8 col-lg-9 p-0'>
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
                                    /> : detailsType==="Accreditation" ? <div>
                                        <h4 className='report-heading text-center'>{selectedAccreditation}</h4>
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
                                    </div> : <></>}
                                </div>
                            </>}
                        </div>
                    </div>
                    <Alphabets activeFilters={activeFilters} setActiveFilters={setActiveFilters}/>
                </div>
            </div>
        </div>
    );
};

export default App;
