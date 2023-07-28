import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Image,
    Alert,
    Platform
} from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .et("https://api.nasa.gov/neo/rest/v1/feed?api_key=eswrdtfygujeshguidytlyitd")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects})
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    render() {
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
             
            let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
                return(this.state.meteors[meteor_date])
            })
            let meteors = [].concat.apply([],meteor_arr);
            meteors.forEach(function(element){
                let diameter =(element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
                let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000000
                element.threatScore=threatScore;
            })
            return(
                <View
                style = {{
                    flex:1,
                    justifyContent:"center",
                    allignItems:"center"
                }}>
                <Text>MeteorScreen</Text>
                </View>
            )
            
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    }
})
