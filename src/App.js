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
                    'latitude': 51.501816,
                    'longitude': -0.162474,
                    'streetAddress': "116 Knightsbridge London SW1X 7PJ United Kingdom"
                },
                {
                    'name': "Bob Bob Ricard",
                    'type': "bar",
                    'latitude': 51.512311,
                    'longitude': -0.137207,
                    'streetAddress': "1 Upper James Street Soho W1F 9DF United Kingdom"
                },
                {
                    'name': "Mamuśka!",
                    'type': "dinner",
                    'latitude': 51.492953,
                    'longitude': -0.100232,
                    'streetAddress': "16 Elephant and Castle London SE1 6TH United Kingdom"
                },
                {
                    'name': "Borshtch ‘N Tears",
                    'type': "dinner",
                    'latitude': 51.497554,
                    'longitude': -0.164939,
                    'streetAddress': "46 Beauchamp Place London SW3 1NX United Kingdom"
                },
                {
                    'name': "Vatrushka Russian Bakery & Café",
                    'type': "cafe",
                    'latitude': 51.466437,
                    'longitude': -0.297305,
                    'streetAddress': "112 Kew Road Richmond London TW9 2PQ United Kingdom"
                },
                {
                    'name': "Rasputin",
                    'type': "bar",
                    'latitude': 51.508215,
                    'longitude': -0.275221,
                    'streetAddress': "265 High St London W3 9BY United Kingdom"
                },
                {
                    'name': "ZIMA",
                    'type': "bar",
                    'latitude': 51.513356,
                    'longitude': -0.131518,
                    'streetAddress': "45 Frith Street Soho London W1D 4SD United Kingdom"
                },
                {
                    'name': "Assorti",
                    'type': "dinner",
                    'latitude': 51.500825,
                    'longitude': -0.013597,
                    'streetAddress': "Unit 1 115 Meridian Place Marsh Wall London E14 9FE United Kingdom"
                },
                {
                    'name': "The Merchant’s Yard",
                    'type': "bakery",
                    'latitude': 51.497431,
                    'longitude': -0.164639,
                    'streetAddress': "Unit 1 115 Meridian Place Marsh Wall London E14 9FE United Kingdom"
                }
            ]
        }
    }
    componentDidMount() {
        let map;
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.507351, lng: -0.127758},
            zoom: this.state.zoom,
            mapTypeId: 'roadmap',
        });

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
        return (
            <div id='app'>
                <div id='state'>
                    <h1>State</h1>
                    <p>
                        Zoom level: {this.state.zoom}<br />
                        Map type: {this.state.maptype}
                    </p>
                </div>
                <div id='map' />
            </div>
        );
    }
};

export default App