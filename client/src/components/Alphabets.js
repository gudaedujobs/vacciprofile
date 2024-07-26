import React from 'react';

const Alphabets = ({ 
    activeFilters, 
    setActiveFilters,
    setSelectedManufacturer
 }) => {

    const handleAlphabetChange = letter => {
        setActiveFilters({...activeFilters, 
            firstAlphabet: activeFilters.firstAlphabet === letter ? '' : letter
        });
        setSelectedManufacturer({});
    } 

    return <div className="alphabet-container d-flex justify-content-around mx-auto mt-3 slide-up">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
            <span key={letter} 
                className={`alphabet-item ${activeFilters.firstAlphabet===letter ? `bg-primary`:``}`} 
                onClick={()=>handleAlphabetChange(letter)}>
                {letter}
            </span>
        ))}
    </div>
}

export default Alphabets;