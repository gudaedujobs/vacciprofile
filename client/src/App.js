import React, { useState } from 'react';
import './App.scss';
import manufacturers from './assets/data/manufacturers.json';
import viruses from './assets/data/viruses.json';
import vaccines from './assets/data/vaccines.json';

const App = () => {
    const [selectedVirus, setSelectedVirus] = useState(viruses[0]);
    const [selectedVaccine, setSelectedVaccine] = useState(vaccines[0]);
    const [selectedManufacturer, setSelectedManufacturer] = useState({});
    const [selectedAccreditation, setSelectedAccreditation] = useState(vaccines[0].accreditation[0])
    const [detailsType, setDetailsType] = useState("Virus");

    const handleSearch = keyword => {
        // Handle search logic here
    };

    const handleSelectVirus = virus => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === virus.vaccines[0].vaccineId);
        setSelectedVaccine(vaccine);
        setSelectedVirus(virus);
        setDetailsType("Virus");
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

    const getCountriesForVaccine = vaccineId => {
        const vaccine = getVaccineById(vaccineId);
        return vaccine.country;
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
    
    return (
        <div className='vacciprofile-page'>
            <div className='container'>
                <div className='row bg-primary text-white py-4'>
                    <div className='col-12'>
                        <h3 className='subheading mb-0'>Welcome to</h3>
                        <h1 className='heading'>VacciPROFILE</h1>
                    </div>
                </div>
                <div className='row py-4'>
                    <div className='sidebar col-6 col-sm-4 col-lg-3 pe-3'>
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
                            {viruses.map((virus, i) => (
                                <div key={i} className={`sidebar-item bg-light text-dark rounded-3 py-1 mt-2 ${selectedVirus === virus ? 'selected' : ''}`} onClick={() => handleSelectVirus(virus)}>{virus.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className='view-container bg-white col-6 col-sm-8 col-lg-9 border border-primary border-1 rounded-4 p-0'>
                        <h1 className='heading text-primary px-3 pt-2'>Updated Virus-Reported Data</h1>
                        <div className='view-header table-responsive m-0'>
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
                                        <td className='virus-cell'><span className={`pill-unselected badge ${detailsType==="Virus" ? `bg-selected` : ``}`} onClick={()=>{handleSelectVirus(selectedVirus)}}>{selectedVirus.name}</span></td>
                                        <td className='vaccine-cell'>{getVaccineNames(selectedVirus.vaccines).map((vaccine, index)=><span key={index} className={`pill-unselected badge ${detailsType==="Vaccine" && selectedVaccine.name === vaccine ? `bg-selected` : ``}`} onClick={()=>handleSelectVaccine(vaccine)}>{vaccine}</span>)}</td>
                                        <td className='country-cell'>{getCountriesForVaccine(selectedVaccine.vaccineId).map((country, index)=><span key={index} className='pill-unselected pill-unselectable badge bg-muted'>{country}</span>)}</td>
                                        <td className='manufacturer-cell'><span className={`pill-unselected badge ${detailsType==="Manufacturer" ? `bg-selected` : ``}`} onClick={()=>handleSelectManufacturer()}>{getManufacturerByVaccine()}</span></td>
                                        <td className='accreditation-cell'>{selectedVaccine.accreditation.map((accreditation=><span className={`pill-unselected badge ${detailsType==="Accreditation" && selectedAccreditation === accreditation ? `bg-selected` : ``}`} onClick={()=>handleSelectAccreditation(accreditation)}>{accreditation}</span>))}</td>
                                        <td className='recommendation-cell'>{getRecommendationByVaccine()}</td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                        <div className='details-container px-3 pt-2 pb-3'>
                            {detailsType==="Virus" ? <div>
                                <h4 className='report-heading'>{selectedVirus.name}</h4>
                                <p>{selectedVirus.description}</p>
                            </div> : detailsType==="Vaccine" ? <div className='position-relative'>
                                <h4 className='report-heading'>{selectedVaccine.name}</h4>
                                <p className='mb-3'>{selectedVaccine.description}</p>
                                <p className='mb-0'><a className='read-more' target="_blank" rel="noopener noreferrer" href={`${selectedVaccine.link}`}>Learn more...</a></p>
                                <span className='last-updated text-muted position-absolute end-0 bottom-0'>Last updated: {selectedVaccine.lastUpdated}</span>
                            </div> : detailsType==="Manufacturer" ? <div>
                                <h4 className='report-heading'>{selectedManufacturer.name}</h4> 
                                <p>{selectedManufacturer.description}</p>
                                <div className='table-responsive'>
                                    <table className='table table-light w-100 m-0'>
                                        <thead>
                                            <tr>
                                                <th className='text-center' colSpan={2}>Information</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(selectedManufacturer.information).map(([attributeKey, attributeValue], index) => {
                                                return attributeKey !== "sources" && attributeKey !== "lastUpdated" ? <tr key={index}>
                                                    <td className='text-center' style={{ width: '50%' }}>{convertCamelCaseToReadable(attributeKey)}</td>
                                                    <td className='text-center'>{attributeValue}</td>
                                                </tr> : <></> ;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <span className='sources-list'>Source(s): {selectedManufacturer.information.sources.map((source, index)=><span key={index}>
                                    <a className='manufacturer-table-source' href={`${source.link}`} target="_blank" rel="noopener noreferrer">{source.title}</a>
                                    <span> ({source.lastUpdated}){selectedManufacturer.information.sources.length>1 && index<selectedManufacturer.information.sources.length-1 ? ', ' : ''}</span></span>)}
                                </span>
                                <div className='table-responsive'>
                                    <table className='table table-light w-100 m-0'>
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
                                            {getVaccinesByManufacturer().map((vaccine, index) => (
                                                <tr key={index}>
                                                    <td><i>{<span className='pill-unselected badge' onClick={()=>handleSelectVaccine(vaccine.name)}>{vaccine.name}</span>}</i></td>
                                                    <td><i>{vaccine.vaccineType || '-'}</i></td>
                                                    <td><i>{vaccine.comments || '-'}</i></td>
                                                    <td><i>{vaccine.revenue || '-'}</i></td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div> : detailsType==="Accreditation" ? <div>
                                <h4 className='report-heading'>{selectedAccreditation}-Approved Vaccines</h4>
                                {getVaccinesByAccreditation().map((vaccine=><span className='pill-unselected badge' onClick={()=>handleSelectVaccine(vaccine.name)}>{vaccine.name}</span>))}
                            </div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
