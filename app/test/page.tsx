"use client";

import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Google Maps API에서 사용할 라이브러리
const libraries = ["places"] as any;

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 10.8231, // 호치민 위도
  lng: 106.6297, // 호치민 경도
};

export default function Test() {
  const [mapCenter, setMapCenter] = useState(center); // 지도 중심 좌표 상태
  const [markerPosition, setMarkerPosition] = useState(center); // 마커 위치 상태
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null); // Autocomplete 참조를 위한 useRef

  // Google Maps API를 로드하기 위한 useJsApiLoader 사용
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Google Maps API Key
    libraries: libraries,
  });

  // 장소가 선택될 때 호출되는 함수
  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();

    if (place?.geometry?.location) {
      const location = place.geometry.location;
      const newCenter = {
        lat: location.lat(),
        lng: location.lng(),
      };

      setMapCenter(newCenter); // 지도 중심 업데이트
      setMarkerPosition(newCenter); // 마커 위치 업데이트
    }
  };

  if (loadError) {
    return <div>Error</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1>Google Maps와 Autocomplete 연동</h1>

      {/* 장소 검색용 Autocomplete 입력 */}
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        <div className="w-full max-w-md">
          <Label>픽업 장소</Label>
          <Input
            id="pickup-location"
            type="text"
            placeholder="픽업 장소를 검색하세요"
            className="w-full"
          />
        </div>
      </Autocomplete>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={15}
      >
        {/* 선택된 장소에 마커 표시 */}
        <Marker position={markerPosition} />
      </GoogleMap>

      <Button className="mt-5">가이드 프로필 생성</Button>
    </div>
  );
}
