"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"] as any;

type GoogleMapApiSimpleProps = {
  lat: number;
  lng: number;
};

export default function GoogleMapApiSimple({
  lat,
  lng,
}: GoogleMapApiSimpleProps) {
  // Google Maps API를 로드하기 위한 useJsApiLoader 사용
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Google Maps API Key
    libraries: libraries,
  });

  if (loadError) {
    return <div>Error</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        center={{
          lat,
          lng,
        }}
        zoom={15}
      >
        <Marker
          position={{
            lat,
            lng,
          }}
        />
      </GoogleMap>
    </>
  );
}
