import React from 'react';

import './App.css';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            maptype: 'roadmap',
        }
    }
    componentDidMount() {
        let map;
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -33.8688, lng: 151.2195},
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