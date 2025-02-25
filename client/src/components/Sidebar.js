import React from 'react';

const Sidebar = ({ 
    setDetailsType,
    manufacturersList,  
    selectedManufacturer,
    setSelectedManufacturer, 
    handleSelectManufacturer, 
    handleSearch,
    setChangedFrom
}) => {
    
    const handleChangeManufacturer = manufacturer => {
        if(manufacturer!==selectedManufacturer) {
            setChangedFrom('Sidebar');
            setTimeout(() => {
                handleSelectManufacturer(manufacturer);
                setDetailsType("Manufacturer");
                setChangedFrom('');
            }, 0);
        } else {
            setSelectedManufacturer({});
        }
    }

    return <div className='sidebar col-6 col-sm-4 col-lg-3 pe-3 slide-right'>
        <div className='search-container'>
            <span className="position-relative">
                <input type="text" className="text-center bg-info rounded-2 border-dark border-0 w-100" id="search" name="search" placeholder="Search" onChange={e => handleSearch(e.target.value)}/>
                <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted" aria-hidden="true"></i>
            </span>
        </div>
        <div className='Manufacturer-list mt-3'>
            {manufacturersList.map((manufacturer, i) => (
                <div key={i} className={`sidebar-item bg-light text-dark rounded-3 py-1 mt-2 ${selectedManufacturer === manufacturer ? 'active' : 'inactive'}`} onClick={() =>handleChangeManufacturer(manufacturer)}>{manufacturer.name}</div>
            ))}
        </div>
    </div>
}

export default Sidebar;