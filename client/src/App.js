import React, { useState } from 'react';
import './App.css';
// import manufacturers from './assets/data/manufacturers.json';
import viruses from './assets/data/viruses.json';
import vaccines from './assets/data/vaccines.json';

const App = () => {
    // const [selectedManufacturer, setSelectedManufacturer] = useState({});
    const [selectedVirus, setSelectedVirus] = useState({});
    const [selectedVaccine, setSelectedVaccine] = useState({});
    const [detailsType, setDetailsType] = useState("");

    const handleSearch = keyword => {
        // Handle search logic here
    };

    const handleSelectVirus = virus => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === virus.vaccines[0].vaccineId);
        setSelectedVaccine(vaccine);
        setSelectedVirus(virus);
        setDetailsType("Virus");
    };

    const handleSelectVaccine = vaccine => {
        setSelectedVaccine(vaccine);
    };

    const getVaccineById = vaccineId => {
        return vaccines.find(vaccine => vaccine.vaccineId === vaccineId);
    };

    const getCountriesForVaccine = vaccineId => {
        const vaccine = getVaccineById(vaccineId);
        return vaccine && vaccine.country ? vaccine.country.join(', ') : '-';
    };

    const getAccreditationsForVaccine = vaccineId => {
        const vaccine = getVaccineById(vaccineId);
        return vaccine && vaccine.accreditation ? vaccine.accreditation.join(', ') : '-';
    };

    const getManufacturerForVaccine = vaccineId => {
        const vaccine = getVaccineById(vaccineId);
        return vaccine ? vaccine.manufacturer : '-';
    };

    const getRecommendationForVaccine = vaccineId => {
        const vaccine = getVaccineById(vaccineId);
        return vaccine ? vaccine.recommendation : '-';
    };

    const getVaccineNames = vaccinesArray => {
        if (!vaccinesArray || vaccinesArray.length === 0) return '-';
        
        return vaccinesArray.map((vaccine, index) => {
            const vaccineDetail = getVaccineById(vaccine.vaccineId);
            const isSelected = vaccineDetail && selectedVaccine && vaccineDetail.vaccineId === selectedVaccine.vaccineId;
            
            return (
                <React.Fragment key={index}>
                    <span
                        className={isSelected ? 'text-decoration-underline' : ''}
                        onClick={() => handleSelectVaccine(vaccineDetail)}
                    >
                        {vaccineDetail ? vaccineDetail.name : '-'}
                    </span>
                    {index < vaccinesArray.length - 1 && <span>, </span>}
                </React.Fragment>
            );
        });
    };
    

    return (
        <div className='container'>
            <div className='row bg-primary text-white py-4'>
                <div className='col-12'>
                    <h3 className='subheading mb-0'>Welcome to</h3>
                    <h1 className='heading'>VacciPROFILE</h1>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='sidebar col-4 col-lg-3'>
                    <div className='search-container'>
                        <span className="position-relative">
                            <input 
                                type="text" 
                                className="text-center bg-info rounded-2 border-dark border-0 w-100" 
                                id="search" 
                                name="search" 
                                placeholder="Search" 
                                onChange={e => handleSearch(e.target.value)}
                            />
                            <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className='virus-list mt-3'>
                        {viruses.map((v, i) => (
                            <div key={i} className='virus-list-item bg-light' onClick={() => handleSelectVirus(v)}>{v.name}</div>
                        ))}
                    </div>
                </div>
                <div className='view-container col-8 col-lg-9 border border-primary border-1 rounded-4 p-0'>
                    <h1 className='heading text-primary px-3 pt-2'>Updated Virus-Reported Data</h1>
                    <div className='view-header table-responsive m-0'>
                        <table className='table table-success w-100 m-0'>
                            <thead>
                                <tr>
                                    <th>Virus</th>
                                    <th>Vaccine(s)</th>
                                    <th>Country</th>
                                    <th>Manufacturer</th>
                                    <th>Accreditation</th>
                                    <th>Recommendation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='hover-underline'>{selectedVirus.name}</td>
                                    <td className='hover-underline'>{getVaccineNames(selectedVirus.vaccines)}</td>
                                    <td className='hover-underline'>{selectedVirus.vaccines?.[0]?.vaccineId ? getCountriesForVaccine(selectedVirus.vaccines[0].vaccineId) : '-'}</td>
                                    <td className='hover-underline'>{selectedVirus.vaccines?.[0]?.vaccineId ? getManufacturerForVaccine(selectedVirus.vaccines[0].vaccineId) : '-'}</td>
                                    <td className='hover-underline'>{selectedVirus.vaccines?.[0]?.vaccineId ? getAccreditationsForVaccine(selectedVirus.vaccines[0].vaccineId) : '-'}</td>
                                    <td className='hover-underline'>{selectedVirus.vaccines?.[0]?.vaccineId ? getRecommendationForVaccine(selectedVirus.vaccines[0].vaccineId) : '-'}</td>
                                </tr> 
                            </tbody>
                        </table>
                    </div>
                    <div className='details-container px-3 pt-2 pb-3'>
                        {detailsType==="Virus" ? <div>
                            {selectedVirus.description}
                        </div> : detailsType==="Vaccine" ? <div>
                            {selectedVirus.description}
                        </div> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
