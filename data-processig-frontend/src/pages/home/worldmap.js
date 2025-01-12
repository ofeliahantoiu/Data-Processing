import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import worldMap from './countries.json';

const WorldMap = ({ onSelect }) => {
    const handleCountryClick = (geo) => {
        let country = geo.properties.name;
        onSelect(country);
        // console.log('Clicked on:', country);
    };

    return (
        <ComposableMap width={800} height={475}>
        <Geographies geography={worldMap}>
            {({ geographies }) =>
            geographies.map((geo) => (
                <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                />
            ))
            }
        </Geographies>
        </ComposableMap>
    );
};

export default WorldMap;