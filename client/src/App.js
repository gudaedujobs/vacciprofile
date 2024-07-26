import React, { useState, useEffect } from 'react';
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
        firstAlphabet: '',
        searchKeyword: ''
    })
    const [selectedVirus, setSelectedVirus] = useState({});
    const [selectedVaccine, setSelectedVaccine] = useState(vaccines[0]);
    const [selectedManufacturer, setSelectedManufacturer] = useState({});
    const [selectedAccreditation, setSelectedAccreditation] = useState(vaccines[0].accreditation[0])
    const [detailsType, setDetailsType] = useState("");
    const [manufacturersList, setManufacturersList] = useState(manufacturers);
    const [changedFrom, setChangedFrom] = useState('');

    const handleSearch = keyword => {
        setActiveFilters({...activeFilters, 
            searchKeyword: keyword
        })
    };

    const handleSelectVirus = virus => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === virus.vaccines[0].vaccineId);
        setSelectedVaccine(vaccine);
        setSelectedVirus(virus);
        setDetailsType("Virus");
        setActiveFilters({...activeFilters, firstAlphabet: ''});
    };

    const handleSelectVaccine = vx => {
        const vaccine = vaccines.find(vaccine=> vaccine.name === vx.name);
        setSelectedVaccine(vaccine);
        setDetailsType("Vaccine");
    };

    const handleSelectManufacturer = manufacturer => {
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

    const getVirusByVaccine = vaccine => {
        return viruses.find(virus => virus.virusId === vaccine.virusId);
    };

    const getCountriesByVaccine = vx => {
        const vaccine = getVaccineById(vx.vaccineId);
        return vaccine.countries.join(', ');
    };    

    const getRecommendationByVaccine = vx => {
        return vx.recommendation;
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

    useEffect(() => {
        const filterManufacturersList = () => {
            let filteredManufacturersList;
            if (activeFilters.searchKeyword) {
                filteredManufacturersList = manufacturers.filter(manufacturer =>
                    manufacturer.name.toLowerCase().includes(activeFilters.searchKeyword.toLowerCase()) ||
                    manufacturer.description.toLowerCase().includes(activeFilters.searchKeyword.toLowerCase())
                );
            } else {
                filteredManufacturersList = manufacturers;
            }

            if (activeFilters.firstAlphabet) {
                filteredManufacturersList = filteredManufacturersList.filter(manufacturer =>
                    manufacturer.name.startsWith(activeFilters.firstAlphabet)
                );
            }
            setManufacturersList(filteredManufacturersList);
        };

        filterManufacturersList();
    }, [activeFilters]);
    
    return (
        <div className='vacciprofile-page'>
            <div className='container'>
                <Header/>
                <div className='row py-4'>
                    <Sidebar
                        manufacturersList={manufacturersList}
                        selectedManufacturer={selectedManufacturer}
                        setSelectedManufacturer={setSelectedManufacturer}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSearch={handleSearch}
                        setChangedFrom={setChangedFrom}
                        changedFrom={changedFrom}
                        setDetailsType={setDetailsType}
                    />
                    <Main
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                        manufacturersList={manufacturersList}
                        selectedVirus={selectedVirus}
                        selectedVaccine={selectedVaccine}
                        selectedManufacturer={selectedManufacturer}
                        selectedAccreditation={selectedAccreditation}
                        detailsType={detailsType}
                        handleSelectVirus={handleSelectVirus}
                        handleSelectVaccine={handleSelectVaccine}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSelectAccreditation={handleSelectAccreditation}
                        getVirusByVaccine={getVirusByVaccine}
                        getCountriesByVaccine={getCountriesByVaccine}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                        getRecommendationByVaccine={getRecommendationByVaccine}
                        italizeScientificNames={italizeScientificNames}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                        changedFrom={changedFrom}
                    />
                    <Alphabets 
                        activeFilters={activeFilters} 
                        setActiveFilters={setActiveFilters}
                        setSelectedManufacturer={setSelectedManufacturer}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
