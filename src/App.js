import React, { Component } from 'react';

import './App.css';

class App extends Component {
        state = {
            map : {},
            zoom: 12,
            infoWindow : new window.google.maps.InfoWindow(),
            maptype: 'roadmap',
            openWindow : false,
            markers : [],
            currentMarker : null,
            locations : [
                {
                    'name': "Mari Vanna",
                    'type': "breakfast",
                    'location' : {lat:51.501816 , lng : -0.162474 },
                    'streetAddress': "116 Knightsbridge London SW1X 7PJ United Kingdom",
                    "id" : "4f2c0acae4b048e466df240b",
                },
                {
                    'name': "Bob Bob Ricard",
                    'type': "bar",
                    'location' : {lat:51.512311 , lng : -0.137207 },
                    'streetAddress': "1 Upper James Street Soho W1F 9DF United Kingdom",
                    "id" : "4ad73a36f964a5200d0921e3",
                },
                {
                    'name': "Mamuśka!",
                    'type': "dinner",
                    'location' : {lat:51.492953 , lng : -0.100232 },
                    'streetAddress': "16 Elephant and Castle London SE1 6TH United Kingdom",
                    "id" : "4b745da9f964a520f2d72de3",
                },
                {
                    'name': "Borshtch ‘N Tears",
                    'type': "dinner",
                    'location' : {lat:51.497554 , lng : -0.164939 },
                    'streetAddress': "46 Beauchamp Place London SW3 1NX United Kingdom",
                    "id" : "4c3f4c4dda3dc928eeacc5b9",
                },
                {
                    'name': "Vatrushka Russian Bakery & Café",
                    'type': "cafe",
                    'location' : {lat:51.466437 , lng : -0.297305 },
                    'streetAddress': "112 Kew Road Richmond London TW9 2PQ United Kingdom",
                    "id" : "4c276312f1272d7fd30e88c5",
                },
                {
                    'name': "Rasputin",
                    'type': "bar",
                    'location' : {lat:51.508215 , lng : -0.275221 },
                    'streetAddress': "265 High St London W3 9BY United Kingdom",
                    "id" : "527c07e711d255a8e45a3856",
                },
                {
                    'name': "ZIMA",
                    'type': "bar",
                    'location' : {lat:51.513356 , lng : -0.131518 },
                    'streetAddress': "45 Frith Street Soho London W1D 4SD United Kingdom",
                    "id" : "4bf565aaff90c9b6064f5628",
                },
                {
                    'name': "Assorti",
                    'type': "dinner",
                    'location' : {lat:51.500825 , lng : -0.013597 },
                    'streetAddress': "Unit 1 115 Meridian Place Marsh Wall London E14 9FE United Kingdom",
                    "id" : "4b851c53f964a520684c31e3",
                },
                {
                    'name': "The Merchant’s Yard",
                    'type': "bakery",
                    'location' : {lat:51.497431 , lng : -0.164639 },
                    'streetAddress': "Unit 1 115 Meridian Place Marsh Wall London E14 9FE United Kingdom",
                    "id" : "4ac518e0f964a52015aa20e3",
                }
            ]
        }
    getMarkerInfo (marker) {
        let clientID = "AZREHK4CD0M2LQ0S0WDTBURVJL3USHZFFXK4EJYBNA3BUZ42";
        let clientSecret = "CFEODDWIQNMOOUSLPIU4IAIRP2O0KIKIEXPTRA21345BI1MC";
        let url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.position.lat() + "," + marker.position.lng() + "&limit=1";
        console.log(marker.position.lat());
        fetch(url).then(data => data.json()).then(item => console.log(item));
    }

    // getTips (marker) {
    //     let clientID = "AZREHK4CD0M2LQ0S0WDTBURVJL3USHZFFXK4EJYBNA3BUZ42";
    //     let clientSecret = "CFEODDWIQNMOOUSLPIU4IAIRP2O0KIKIEXPTRA21345BI1MC";
    //     let url = "https://api.foursquare.com/v2/venues/4f2c0acae4b048e466df240b/tips?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.position.lat() + "," + marker.position.lng() + "&limit=1";
    //
    //     fetch(url).then(data => data.json()).then(response => response.tips.items[0].text);
    //
    //
    // }
    makeMarkers (locations , map) {
        let markers = [];
        let joystick = this;
        for(let i = 0;i < locations.length;i++){
            let position = locations[i].location;
            let title = locations[i].name;
            let id = locations[i].id;

            let marker = new window.google.maps.Marker({
                map : map,
                position : position,
                title : title,
                animation : window.google.maps.Animation.DROP,
                id : id,
            });

            let info = joystick.populateInfoWindow(marker);

            marker.addListener('click', function() {
                if(joystick.state.currentMarker !== marker) {
                    marker.setAnimation(null);
                }
                info.open(map,marker);
                joystick.getMarkerInfo(marker);
            });

            marker.addListener('closeclick', function() {
                info.close();
            });


            map.addListener('click',function () {
                info.close()
            });
            markers.push(marker);
        }
        this.setState({markers});
    };

    populateInfoWindow = (marker) => {
        let { infoWindow } = this.state;
        let text = this.getMarkerInfo(marker);
        infoWindow.setContent(text);
        return infoWindow;
    };

    openWindow = (marker) => {
            // let marker = this.state.markers.findIndex(event.target. =>)
        this.setState({
            openWindow: true,
            currentMarker: marker,
        });
        console.log("OpenWindow = " + marker);
        // this.getMarkerInfo(marker)
    };
    closeWindow = (marker) => {
        this.setState({
            openWindow: false,
            currentMarker: null
        });
        console.log(marker);
    };

    componentDidMount() {
        let { locations , map } = this.state;
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.507351, lng: -0.127758},
            zoom: this.state.zoom,
            mapTypeId: 'roadmap',
        });
        this.setState({map});

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

        map.addListener('click', () => {
            let array = this.state.markers;
            array.forEach((marker) => marker.setAnimation(null));
            this.setState({
                currentMarker : null,
            });
        });
        this.makeMarkers(locations, map);
        // this.getTips();
    }
    render() {
        const { locations  } = this.state;
        return (
            <div id='app'>
                <div id='state'>
                    <h1 onClick={() => console.log(this.state.markers)}>State</h1>
                    <p>
                        Zoom level: {this.state.zoom}<br />
                        Map type: {this.state.maptype}<br />
                        Map type: {console.log(this.state.markers)}<br />
                        Marker : {this.state.currentMarker ? this.state.currentMarker.title : "Can't load the marker"}
                    </p>
                    <div>
                        {this.state.markers.map( (marker) => {
                            return (
                                <h2
                                    key={marker.id}
                                    onClick={(marker) => this.openWindow(marker)}
                                >{marker.title}</h2>
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