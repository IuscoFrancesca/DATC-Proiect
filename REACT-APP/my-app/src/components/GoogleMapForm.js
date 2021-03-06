import React,{useState} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { Marker } from "react-google-maps";
import Geocode from "react-geocode";
import axios from "axios";

import * as locations from "../locations.json";
export default function GoogleMapForm(){

  
function Map()
{

  const [location,setLocation] =useState({latitudeMe:"",longitudeMe:""});
  const [locationToDataBase,setLocationToDataBase]=useState({lat:"",long:""});
  const [locationToMap,setLocationToMap]= useState({latitudine:"",longitudine:""});
  const latitudine = [];
  const longitudine =[];
  
  
  const loadLocation= async()=>
  {
    axios.get('https://apiambrosia.azurewebsites.net/request')
    .then((response) => {
                console.log(response.data);
                setLocationToMap({...locationToMap, latitudine: response.data[0].partitionKey, longitudine:response.data[0].rowKey});
  
                for (var i=0; i <response.data.length; i++)
            {
  
                  setLocationToMap({...locationToMap, latitudine: response.data[i].partitionKey, longitudine:response.data[i].rowKey});
                  console.log("Latitude1:"+locationToMap.latitudine);
                  console.log("Longitude1:"+locationToMap.longitudine);
                  latitudine.push(response.data[i].partitionKey);
                  longitudine.push(response.data[i].rowKey);
            }
            console.log(latitudine[2]);
            console.log(longitudine[2]);
            console.log("s-a executat");
            
                      }
                    
    );
    
    
  }
  const putLocationToDataBase= async () => {

    const data = {
      PartitionKey: locationToDataBase.lat.toString(),
      RowKey: locationToDataBase.long.toString(),
      Adresa: location1,
      Status: "invalid",
      
    };

    await axios
      .post("https://apiambrosia.azurewebsites.net/request",data,

      )
      .then((response) => response)
      .then((json) => {
        console.log(json.data);
        return json.data;
      });

     
  };
  
  
  const getLocation=()=>
  {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);}
      else{
        alert("Nu este suportata de acest browser");
      }
    }
  
    const showPosition=(position)=>
    {
      setLocation({...location, latitudeMe: position.coords.latitude, longitudeMe:position.coords.longitude});
  
    }
    
    getLocation();

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
  Geocode.setLanguage("ro");
  Geocode.setRegion("ro");
  Geocode.setLocationType("ROOFTOP");
    
  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  const [markers, setMarkers]= React.useState([]);
  
  const [location1,setLocation1] =useState([]);
  
 
    return(
    
      <div>
      < GoogleMap
      
      zoom={18}
      center={
        { lat: Number(location.latitudeMe),
          lng: Number(location.longitudeMe)}
        }
      
       
      onClick={(event)=>{
        
       loadLocation();
      putLocationToDataBase();


      console.log([locationToDataBase.lat,locationToDataBase.long]);

       Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
        (response) => {
          const address = response.results[0].formatted_address;

          setLocation1(address);
          console.log(location1);
          setLocationToDataBase({...locationToDataBase, lat : response.results[0].geometry.location.lat, long : response.results[0].geometry.location.lng});
        },
        (error) => {
          console.error(error);
        }
      );


        setMarkers((current) =>[
          ...current,
        {
          lat:event.latLng.lat(),
          lng:event.latLng.lng(),
          time: new Date(),
    
        },
      ]);
      }}
      >
        
{
  locations.features.map(loc => (
        <Marker
          key={loc.properties.LOCATION_ID}
          position={{
            lat: loc.geometry.coordinates[0],
            lng: loc.geometry.coordinates[1]
          }}
         
        />
      ))}
     
      
        {
     
        markers.map((marker) =>
        (
          
        < Marker
                   key={marker.time.toISOString()} 
                   position={  {lat:marker.lat,lng: marker.lng}}
                   set icon={{
                   url:"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                  }
                }
       />

      
        )
        )
        }
         
        </GoogleMap>
        </div>
      
    );
}

  const WrappedMap = withScriptjs(withGoogleMap(Map));
 


  return (
    
    <div style={{ width: "100%", height: "100%" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        
      ></WrappedMap>
     
       
    </div>
  );
};

