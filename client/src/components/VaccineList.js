import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VaccineList = () => {
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vaccines');
                setVaccines(response.data);
            } catch (error) {
                console.error('Error fetching vaccines:', error.response ? error.response.data : error.message);
            }
        };
        

        fetchVaccines();
    }, []);

    return (
        <div>
            <h1>Vaccines</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Vaccine name</td>
                        <td>Trade name</td>
                        <td>Manufacturer</td>
                    </tr>
                </thead>
                <tbody>
                    {vaccines.map((v, i)=>(
                        <tr key={i}>
                            <td>
                                <a href={v.link} target="_blank" rel="noopener noreferrer">
                                {v.vaccineName}</a>
                            </td>
                            <td>{v.tradeName}</td>
                            <td>{v.manufacturer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VaccineList;
