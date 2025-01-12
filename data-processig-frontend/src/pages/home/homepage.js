import { useState } from "react";
import Statistics from "./statistics.js";
import CountryStatistics from "./countryStatistics.js";
import WorldMap from "./worldmap.js";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const navigate = useNavigate()

    const handleCountrySelect = (country) => {
        if (!selectedCountry) {
            setSelectedCountry(country);
        } else {
            setSelectedCountry(null);
        }
    }
    
    const renderStatisticsComponent = () => {
        if (!selectedCountry) {
            return <Statistics />;
        } else {
            return <CountryStatistics country={selectedCountry} />;
        }
    };

    return(
        <div className="homepage-container">
            <h1 className="homepage-title">STATISTICS</h1>
            <WorldMap onSelect={handleCountrySelect} />
            {renderStatisticsComponent()}
        </div>
    );
}

export default Homepage;