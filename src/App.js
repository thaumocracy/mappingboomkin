import React, { Component } from 'react';

import './App.css';
import ListItem from "./components/ListItem";

class App extends Component {
        state = {
            query: "",
            map : {},
            zoom: 12,
            infoWindow : new window.google.maps.InfoWindow(),
            maptype: 'roadmap',
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
            ]
        };

    getExactVenue () {
        // checking current target and populate infoWindow with according content
        if(this.state.currentMarker){
            let { infoWindow } = this.state;
            let venueID = this.state.currentMarker.id;
            let clientID = "AZREHK4CD0M2LQ0S0WDTBURVJL3USHZFFXK4EJYBNA3BUZ42";
            let clientSecret = "CFEODDWIQNMOOUSLPIU4IAIRP2O0KIKIEXPTRA21345BI1MC";
            let url = `https://api.foursquare.com/v2/venues/${venueID}/likes?client_id=${clientID}&client_secret=${clientSecret}&v=20180505`;
            fetch(url).then(response => response.json()).then((data) => {
                infoWindow.setContent(data.response.likes.summary);
                infoWindow.open(this.state.map,this.state.currentMarker);
            }).catch(function () {
               infoWindow.setContent("Sorry data can't be loaded");
            });
        }
    }
    useLikes () {
        if(this.state.currentMarker){
            this.getExactVenue();
        }
    }

    makeMarkers (locations , map) {
        // making and adding listeners to all markers
        let { infoWindow } = this.state;
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

            marker.addListener('click', function() {
                if(joystick.state.currentMarker !== marker) {
                    marker.setAnimation(null);
                }
                joystick.setState({
                    currentMarker : marker,
                });
                joystick.useLikes();
            });

            marker.addListener('closeclick', function() {
                infoWindow.close();
                joystick.setState({
                    currentMarker : null,
                });
            });

            markers.push(marker);
        }
        map.addListener('click',function () {
            infoWindow.close();
            joystick.setState({
                currentMarker : null,
            });
        });
        this.setState({markers});
    };

    displayInfowindow = (event) => {
        // finding the clicked marker and serve it with infoWindow
        const { markers } = this.state;
        const markerIndex = markers.findIndex(marker => marker.title.toLowerCase() === event.target.innerText.toLowerCase());
        this.setState({
            currentMarker: markers[markerIndex]
        }, function () {
            this.useLikes();
        });
    };

    handleValueChange = (event) => {
        const { infoWindow } = this.state;
        this.setState({query: event.target.value});
        infoWindow.close();
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
    }
    render() {
        let { query , markers , currentMarker , locations} = this.state;
        // renders (or not ) markers with correct query
        if (query) {
            locations.forEach((location, index) => {
                if (location.name.toLowerCase().includes(query.toLowerCase())) {
                    markers[index].setVisible(true)
                } else {
                    if (currentMarker === markers[index]) {
                        this.setState({
                            currentMarker:null
                        })
                    }
                    markers[index].setVisible(false)
                }
            })
        } else {
            locations.forEach((location, index) => {
                if (markers.length && markers[index]) {
                    markers[index].setVisible(true)
                }
            })
        }
        return (
            <div id='app' role={'application'}>
                <div id='state'>
                    <input role="search" type='text'
                           value={this.state.value}
                           onChange={this.handleValueChange}
                           className={'search__bar'}
                           placeholder={'Search ... '}
                    />
                    <nav>
                        <ul className={'locations__list'}>
                        {this.state.markers.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map((marker) => {
                            return (
                                <ListItem
                                    key = {marker.id}
                                    title = {marker.title}
                                    clickHandler = {(e) => this.displayInfowindow(e)}
                                />
                            )
                        })}
                        </ul>
                    </nav>
                </div>
                <div id='map' />
            </div>
        );
    }
}

export default App