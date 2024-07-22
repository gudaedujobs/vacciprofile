import React, { useState } from 'react';
import './App.css';
import manufactuers from './assets/data/manufacturers.json';
import viruses from './assets/data/viruses.json';
import vaccines from './assets/data/vaccines.json';

const App = () => {

    const [ selectedManufacturer , setSelectedManufacturer ] = useState({});
    const [ selectedVirus , setSelectedVirus ] = useState({});
    const [ selectedVaccine , setSelectedVaccine ] = useState({});
    const [ activeViewDetails, setActiveViewDetails ] = useState("Blank");

    const handleSearch = keyword => {}

    return <div className='container'>
        <div className='row bg-primary text-white py-4'>
            <div className='col-12'>
                <h3 className='subheading mb-0'>Welcome to</h3>
                <h1 className='heading'>VacciPROFILE</h1>
            </div>
        </div>
        <div className='row mt-4'>
            <div className='sidebar col-3'>
                <div className='search-container'>
                    <span className="position-relative">
                        <input type="text" className="text-center bg-info rounded-2 border-dark border-0" id="search" name="search" placeholder="Search" onChange={e=>handleSearch(e.target.value)}/>
                        <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted" aria-hidden="true"></i>
                    </span>
                </div>
                <div className='manufacturer-list'>
                    {viruses.map((v,i)=><div key={i} onClick={()=>setSelectedVirus(v)}>{v.name}</div>)}
                </div>
            </div>
            <div className='view-container col-9 border border-primary border-1 rounded-0 p-0'>
                <h1 className='heading text-primary px-3 pt-2'>Updated Virus-Reported Data</h1>
                <div className='view-header bg-primary m-0'>
                    <table>
                        <thead>
                            <tr>
                                <td>Virus</td>
                                <td>Vaccine</td>
                                <td>Country</td>
                                <td>Manufacturer</td>
                                <td>Accreditation</td>
                                <td>Recommendation</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedVirus.name}</td>
                                <td>{selectedVirus.vaccines ? selectedVirus.vaccines.map((vaccine, index) => <span>{vaccine.name}</span>) :<></>}</td>
                                <td>{selectedVirus.name}</td>
                                <td>{selectedVirus.name}</td>
                                <td>{selectedVirus.name}</td>
                                <td>{selectedVirus.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
};

export default App;
