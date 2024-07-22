import React, { useState } from 'react';
import './App.css';
import manufactuers from './assets/data/manufacturers.json';

const App = () => {

    const [ activeManufacturer , setActiveManufacturer ] = useState({});

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
                    {manufactuers.map((m,i)=><div key={i}>{m.name}</div>)}
                </div>
            </div>
            <div className='view-container col-9 border border-primary border-1 rounded-0 p-0'>
                <h1 className='heading text-primary px-3 pt-2'>Updated Virus-Reported Data</h1>
                <div className='view-header row bg-primary m-0'>
                    <div className='col-2'></div>
                    <div className='col-2'></div>
                    <div className='col-2'></div>
                    <div className='col-2'></div>
                    <div className='col-2'></div>
                    <div className='col-2'></div>
                </div>
            </div>
        </div>
    </div>
};

export default App;
