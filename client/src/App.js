import React, { useState } from 'react';
import './App.scss';
import './assets/animations/animations.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main.js';
import Alphabets from './components/Alphabets';

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
                    <Main
                        viruses={viruses}
                        activeFilters={activeFilters}
                        filterViruses={filterViruses}
                        selectedVirus={selectedVirus}
                        selectedVaccine={selectedVaccine}
                        selectedManufacturer={selectedManufacturer}
                        selectedAccreditation={selectedAccreditation}
                        detailsType={detailsType}
                        handleSelectVirus={handleSelectVirus}
                        handleSelectVaccine={handleSelectVaccine}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSelectAccreditation={handleSelectAccreditation}
                        getCountriesByVaccine={getCountriesByVaccine}
                        getVaccineNames={getVaccineNames}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                        getManufacturerByVaccine={getManufacturerByVaccine}
                        getRecommendationByVaccine={getRecommendationByVaccine}
                        italizeScientificNames={italizeScientificNames}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                    />
                    <Alphabets 
                        activeFilters={activeFilters} 
                        setActiveFilters={setActiveFilters}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
