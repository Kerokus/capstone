import React, {
    useState,
    useMemo,
    useRef,
    useCallback,
    useEffect,
    useContext,
  } from "react";
  import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DirectionsService,
  } from "@react-google-maps/api";
  import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  import { toPoint } from "mgrs";
  import "../styling/map.css";
  import { GlobalContext } from "../Context/GlobalContext";
  
  const libraries = ["places"];
  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };

  export default function DashboardMap({ coordinates }) {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyBRK58z-C-6RfjetZE-TA3eNq777nWc2WA",
      libraries,
    });
    const ctx = useContext(GlobalContext);
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    // const [center, setCenter] = useState({lat: 28.871513, lng: 48.163907});
    useEffect(() => {

 ctx.setCenter({lat: 28.871513, lng: 48.163907})

    }, []);
  
    // const countries = [
    //   { name: 'Saudi Arabia',
    //   location: {lat:24.689868, lng:46.735424}},
    //   { name: 'Kuwait',
    //   location: {lat:28.871513, lng:48.163907}},
    //   { name: 'Jordan',
    //   location: {lat:31.967195, lng:35.910519}},
    //   { name: 'Iraq',
    //   location: {lat:36.230501, lng:43.956688}},
    //   { name: 'Bahrain',
    //   location: {lat:26.267288, lng:50.632467}},
    //   { name: 'United Arab Emirates',
    //   location: {lat:24.441709, lng:54.377948}},
    //   { name: 'Qatar',
    //   location: {lat:25.276280, lng:51.525105}},
    // ]
  
    // const onMapClick = useCallback((e) => {
    //   ctx.setGlobalMarkers((current) => [
    //     ...current,
    //     {
    //       id: current.length + 1,
    //       lat: e.latLng.lat(),
    //       lng: e.latLng.lng(),
    //     },
    //   ]);
    // }, []);
  
  
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);
  
    const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(8);
    }, []);
  
    // const handleChoice = () => {
    //   if (countries.name === 'Saudi Arabia'){
    //     setChoice(panTo({lat:24.689868, lng:46.735424}))
    //     console.log(choice)
    //   } else {
    //     console.log('Shit is fucked')
    //   }
  
    // }
  
    // const getDirections = () => {
  
    // }
  
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
  
    return (
      <>
        <div>

          <Search panTo={panTo} />
          
  
          <GoogleMap
            id="map"
            mapContainerClassName="map"
            zoom={3}
            center={coordinates}
            options={options}
            // onClick={onMapClick}
            onLoad={onMapLoad}
            draggable="true"
          >
            {ctx.dashboardMarkers.map(
              (marker) => (
                <Marker
                  key={`${marker.lat}-${marker.lng}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  draggable={false}
                  onClick={() => {
                    setSelected(marker);
                  }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png",
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
  
                />
              ),
              []
            )}
            <Marker />
  
            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <p>
                    {selected.lat}, {selected.lng}
                  </p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </div>
        {/* <div>Converter</div>
      <Mgrs/>
      <div>Notes on how to use map: </div>
        <p>1. Autosearch location by typing at the input box where you want to search. It will zoom to that location.</p>
        <p>2. Drop markers on the map by clicking where you want to go.</p>
        <p>3. Remove markers by right-clicking on the marker.</p>
  
       */}
      </>
    );
  }
  
  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 28.871513, lng: () => 48.163907 },
        radius: 100 * 1000,
      },
    });
  
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (err) {
        console.log("Error: ", err);
      }
    };
  
    return (
      <div className="search">
        <Combobox className="fuck" onSelect={handleSelect}>
          <ComboboxInput className="search-box"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }
  
  // function Mgrs() {
  
  //         const [latLong, setLatLong] = useState({});
  
  //         useEffect(() => {
  //           setLatLong(coordTest());
  //         }, []);
  
  //         const coordTest = () => {
  //           let inputString = "14SQH05239974";
  //           return toPoint(inputString);
  //         };
  
  //         return (
  //             <>
  //                 <div>MGRS Converter</div>
  //                 <input type="text" placeholder="Search" />
  //                     <div>TO</div>
  //                 <div>
  //                   <input type='text'/>
  //                   </div>
  //             </>
  //       )};
  
  // export default function Places() {
  //     const { isLoaded } = useLoadScript({
  //       googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  //       libraries: ["places"],
  //     });
  
  //     if (!isLoaded) return <div>Loading...</div>;
  
  //     return <Mapped />;
  //   }
  
  //   function Mapped() {
  //     const center = useMemo(() => ({ lat: 33.4302, lng: -82.1261}), []);
  //     const [selected, setSelected] = useState(null);
  
  //     return (
  //       <>
  //         <div className="places-container">
  //           <PlacesAutocomplete setSelected={setSelected} />
  //         </div>
  
  //         <GoogleMap zoom={8} center={center} mapContainerClassName="map-container">
  //           {selected && <Marker position={selected} />}
  //         </GoogleMap>
  //       </>
  //     );
  //   }
  
  //   const PlacesAutocomplete = ({ setSelected }) => {
  //     const {ready, value,  setValue,  suggestions: { status, data },  clearSuggestions,} = usePlacesAutocomplete({
  //         requestOptions: {
  //           location: { lat: () => 33.4302, lng: () => -82.1261 },
  //           radius: 100 * 1000,
  //         },
  //       });
  
  //     const handleSelect = async (address) => {
  //       setValue(address, false);
  //       clearSuggestions();
  
  //       const results = await getGeocode({ address });
  //       const { lat, lng } = await getLatLng(results[0]);
  
  //       setSelected({ lat, lng });
  //     };
  
  //     return (
  //       <Combobox onSelect={handleSelect}>
  //         <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className="combobox-input" placeholder="Search..."/>
  //         <ComboboxPopover>
  //           <ComboboxList>
  //             {status === "OK" && data.map(({ id, description }) => (
  //                 <ComboboxOption key={id} value={description} />
  //               ))}
  //           </ComboboxList>
  //         </ComboboxPopover>
  //       </Combobox>
  //     );
  //   };
  
  // <div style={{width: "80vw", height: "80vh"}}>
  //     <WrappedMap
  //     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
  //     loadingElement={<div styles={{height: "100%"}}/>}
  //     containerElement={<div style={{height: "100%"}}/>}
  //     mapElement= {<div style={{height: "100%"}}/>}>
  
  //     </WrappedMap>
  // </div>
  