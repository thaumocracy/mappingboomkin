import React from 'react';

import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 8,
            maptype: 'roadmap',
            locations : [
                {
                    'name': "Mari Vanna",
                    'type': "breakfast",
                    'location' : {lat:51.501816 , lng : -0.162474 },
                    'streetAddress': "116 Knightsbridge London SW1X 7PJ United Kingdom"
                },
                {
                    'name': "Bob Bob Ricard",
                    'type': "bar",
                    'location' : {lat:51.512311 , lng : -0.137207 },
                    'streetAddress': "1 Upper James Street Soho W1F 9DF United Kingdom"
                },
                {
                    'name': "Mamuśka!",
                    'type': "dinner",
                    'location' : {lat:51.492953 , lng : -0.100232 },
                    'streetAddress': "16 Elephant and Castle London SE1 6TH United Kingdom"
                },
                {
                    'name': "Borshtch ‘N Tears",
                    'type': "dinner",
                    'location' : {lat:51.497554 , lng : -0.164939 },
                    'streetAddress': "46 Beauchamp Place London SW3 1NX United Kingdom"
                },
                {
                    'name': "Vatrushka Russian Bakery & Café",
                    'type': "cafe",
                    'location' : {lat:51.466437 , lng : -0.297305 },
                    'streetAddress': "112 Kew Road Richmond London TW9 2PQ United Kingdom"
                },
                {
                    'name': "Rasputin",
                    'type': "bar",
                    'location' : {lat:51.508215 , lng : -0.275221 },
                    'streetAddress': "265 High St London W3 9BY United Kingdom"
                },
                {
                    'name': "ZIMA",
                    'type': "bar",
                    'location' : {lat:51.513356 , lng : -0.131518 },
                    'streetAddress': "45 Frith Street Soho London W1D 4SD United Kingdom"
                },
                {
                    'name': "Assorti",
                    'type': "dinner",
                    'location' : {lat:51.500825 , lng : -0.013597 },
                    'streetAddress': "Unit 1 115 Meridian Place Marsh Wall London E14 9FE United Kingdom"
                },
                {
                    'name': "The Merchant’s Yard",
                    'type': "bakery",
                    'location' : {lat:51.497431 , lng : -0.164639 },
                    'streetAddress': "Unit 1 115 Meridian Place Marsh Wall London E14 9FE United Kingdom"
                }
            ]
        }
    }
    makeMarkers (locations , map) {
        for(let i = 0;i < locations.length;i++){
            let position = locations[i].location;
            let title = locations[i].name;

            let marker = new window.google.maps.Marker({
                map:map,
                position:position,
                title:title,
                animation: window.google.maps.Animation.DROP,
                id:i
            })
        }
    }
    componentDidMount() {
        let { locations } = this.state;
        let map;
        let markers = [];
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.507351, lng: -0.127758},
            zoom: this.state.zoom,
            mapTypeId: 'roadmap',
        });
        this.makeMarkers(locations, map);

        map.addListener('zoom_changed', () => {
            this.setState({
                zoom: map.getZoom(),
            });
        });

        map.addListener('maptypeid_changed', () => {
            this.setState({
                maptype: map.getMapTypeId(),
            });
        });
    }

    render() {
        const { locations } = this.state;
        return (
            <div id='app'>
                <div id='state'>
                    <h1>State</h1>
                    <p>
                        Zoom level: {this.state.zoom}<br />
                        Map type: {this.state.maptype}
                    </p>
                    <div>
                        {locations.map( (place) => {
                            return (
                                <h2 key={place.name}>{place.name}</h2>
                            )
                        })}
                    </div>
                </div>
                <div id='map' />
            </div>
        );
    }
}

export default App