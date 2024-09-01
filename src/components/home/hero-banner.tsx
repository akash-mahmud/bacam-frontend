'use client';

import Image from 'next/image';
import FindTripForm from '@/components/home/search-form/search-form';
import { CSSProperties, useState } from 'react';
import { GoogleMap, Marker, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import GoogleMapReact, { MapOptions } from 'google-map-react';

const containerStyle:CSSProperties = {
  width: '100%',
  // height: '100%',
  position:'relative'
};

const center = {
  lat: 41.8719,
  lng: 12.5674,
};
const avatarData = [
  {
    id: 1,
    name: 'Avatar 1',
    latitude: 	41.8719,
    longitude: 12.5674,
    image: 'https://cdn-icons-png.flaticon.com/512/2175/2175193.png',
  },
  {
    id: 2,
    latitude: 45.08,
    longitude: 9.53,
    image: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
  },
  {
    id: 3,
    latitude: 45.09,
    longitude: 12.20,
    image: 'https://raw.githubusercontent.com/mallowigi/a-file-icon-idea/master/icon.png',
  },
  // Add more avatar data objects as needed
];

// const AvatarMarker = ({ avatar }) => {
//   console.log( 'I am rendering');
  
//   return(
 
  
//   <OverlayView 
//     position={{ lat: avatar.latitude, lng: avatar.longitude }}
//     mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//   >
//     <div onClick={()=> {
//       console.log('hi');
      
//     }} style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
//       <img src={'/images/banner/1.jpg'} alt={avatar.name} style={{ width: '40px', height: '40px' }} />
//     </div>
//   </OverlayView>
// );}


export default function HeroBanner() {
  interface location{
		lat:number
		lng:number
	}
	const [selectedLocation, setSelectedLocation] = useState<null|location>(null);

	const { isLoaded } = useJsApiLoader({
	  googleMapsApiKey: 'AIzaSyBU9Sja1_zSeP3oQySDLYZ7FVYWrq-kGKU',
	});
  
	const handleMapClick = (event:google.maps.MapMouseEvent) => {
	  setSelectedLocation({
		lat: event?.latLng?.lat() as number,
		lng: event?.latLng?.lng() as number,
	  });
	};

  const [mapType, setMapType] = useState('roadmap');

  const handleMapChange = (event:GoogleMapReact.ChangeEventValue) => {
    const zoom = event.zoom;
    const getmapType = () => {
      console.log(zoom);
      
      if (zoom>=14) {
        return 'hybrid'
      }else if(zoom>= 15){
return 'terrain'
      }else{
return 'roadmap'
      }
    }
    console.log(zoom);
    
    const newMapType = zoom>=14?'hybrid':zoom>=12?'terrain':'roadmap'
    setMapType(newMapType);
  };
	const mapOptions:MapOptions = {
		fullscreenControl: false,
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false,
    mapTypeId: mapType,
tilt:0,
gestureHandling: 'cooperative', // or 'cooperative'



	  };

    
  return (
    <>
    
    {/* <div className="relative flex  h-1/2 items-end justify-center px-4 pt-48 pb-28 before:absolute before:top-0 before:left-0 before:z-[1] before:block before:h-1/4 before:w-full before:bg-gradient-to-b before:from-black/60 sm:flex-none sm:justify-start sm:px-0 sm:pb-20 sm:pt-[120px] sm:pl-6 md:pl-16 3xl:pt-[142px] 3xl:pb-[132px] 4xl:pl-[200px]">
      <Image
        src="/images/banner/1.jpg"
        alt="Home banner 1"
        fill
        priority
        className="aspect-[2/1] h-full bg-gray-lighter object-cover"
      />
      <FindTripForm />
    </div> */}




{/* !Map version */}



  {										isLoaded ? (
    <GoogleMap  mapContainerClassName='aspect-[2/1] h-80 bg-gray-lighter object-cover mt-24'  
    // onLoad={(map) => {
    //   map.addListener('zoom_changed', () => handleZoomChanged(map));
    // }} 
    options={{...mapOptions,        

   }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onClick={handleMapClick}
    >
      {/* {selectedLocation && <Marker position={selectedLocation} />} 
      {avatarData.map((avatar) => (
        <AvatarMarker key={avatar.id} avatar={avatar} />
      ))} */}
    </GoogleMap>
  ) : (
    <>
    <div className="relative flex  h-1/2 items-end justify-center px-4 pt-48 pb-28 before:absolute before:top-0 before:left-0 before:z-[1] before:block before:h-1/4 before:w-full before:bg-gradient-to-b before:from-black/60 sm:flex-none sm:justify-start sm:px-0 sm:pb-20 sm:pt-[120px] sm:pl-6 md:pl-16 3xl:pt-[142px] 3xl:pb-[132px] 4xl:pl-[200px]">
      <Image
        src="/images/banner/1.jpg"
        alt="Home banner 1"
        fill
        priority
        className="aspect-[2/1] h-full bg-gray-lighter object-cover"
      />
      {/* <FindTripForm /> */}
    </div>
    </>

  )}
    </>

  );
}
    // <div className="relative flex min-h-full items-end justify-center before:absolute before:top-0 before:left-0 before:z-[1] before:block before:h-1/4 before:w-full before:bg-gradient-to-b before:from-black/60 sm:flex-none sm:justify-start sm:px-0  ">
    //   <Image
    //     src="/images/banner/1.jpg"
    //     alt="Home banner 1"
    //     fill
    //     priority
    //     className="aspect-[2/1] h-full bg-gray-lighter object-cover"
    //   />
     {/* {										isLoaded ? (
    <GoogleMap  mapContainerClassName='aspect-[2/1] h-full bg-gray-lighter object-cover'  onLoad={(map) => {
      map.addListener('zoom_changed', () => handleZoomChanged(map));
    }} options={{...mapOptions,        

   }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={20}
      onClick={handleMapClick}
    >
      {selectedLocation && <Marker position={selectedLocation} />} 
      {avatarData.map((avatar) => (
        <AvatarMarker key={avatar.id} avatar={avatar} />
      ))}
    </GoogleMap>
  ) : (
    <></>

  )} */}





  {/* <div style={containerStyle}>
  <GoogleMapReact 
      defaultCenter={center}
      defaultZoom={10}
      options={mapOptions}
    >
      Add your markers here
    </GoogleMapReact>
  </div> */}
          {/* <div style={{ height: '100vh', width: '100%',  }} className='px-0'>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: "AIzaSyBU9Sja1_zSeP3oQySDLYZ7FVYWrq-kGKU" }}
        defaultCenter={center}
        defaultZoom={10}
        options={mapOptions}
        yesIWantToUseGoogleMapApiInternals
        onChange={handleMapChange}

      > */}
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
      {/* </GoogleMapReact>
    </div>
    </div> */}