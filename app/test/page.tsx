"use client";

import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Input } from "@/components/ui/input";

const libraries = ["places"] as any;

const center = {
  lat: 10.8231, // 호치민 위도
  lng: 106.6297, // 호치민 경도
};

export default function GoogleMapApi() {
  const [mapCenter, setMapCenter] = useState(center); // 지도 중심 좌표 상태
  const [markerPosition, setMarkerPosition] = useState(center); // 마커 위치 상태
  const [inputValue, setInputValue] = useState(""); // 입력 필드의 값 상태
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null); // Autocomplete 참조를 위한 useRef
  const geocoderRef = useRef<google.maps.Geocoder | null>(null); // Geocoder 참조를 위한 useRef
  const validPlaceSelected = useRef(false); // 유효한 장소가 선택되었는지 확인하는 플래그

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
      setInputValue(place.formatted_address || ""); // 선택된 주소로 입력 필드 업데이트
      validPlaceSelected.current = true; // 유효한 장소가 선택됨을 표시
    }
  };

  // 사용자가 입력한 값이 올바르지 않은 경우 초기화
  const handleInputBlur = () => {
    if (!validPlaceSelected.current) {
      // 유효한 장소가 선택되지 않은 경우 입력 필드를 비움
      setInputValue("");
    }
  };

  // 사용자가 입력 필드에서 값을 직접 입력할 때마다 발생
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    validPlaceSelected.current = false; // 유효한 장소가 선택되지 않음을 표시
  };

  // 지도 클릭 시 마커 위치를 업데이트하고 해당 위치의 주소를 Input에 표시
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const clickedLatLng = event.latLng;
    if (clickedLatLng && geocoderRef.current) {
      const newMarkerPosition = {
        lat: clickedLatLng.lat(),
        lng: clickedLatLng.lng(),
      };

      setMarkerPosition(newMarkerPosition); // 마커 위치 업데이트
      setMapCenter(newMarkerPosition); // 지도 중심 업데이트

      // 역지오코딩을 통해 클릭한 위치의 주소를 가져옴
      geocoderRef.current.geocode(
        { location: newMarkerPosition },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            setInputValue(results[0].formatted_address); // 입력 필드에 주소 업데이트
            validPlaceSelected.current = true; // 유효한 장소 선택됨
          }
        }
      );
    }
  };

  if (loadError) {
    return <div>Error</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        <div className="w-full">
          <Input
            id="pickup-location"
            type="text"
            placeholder="픽업 위치를 검색 및 선택 하세요"
            className="w-full"
            value={inputValue}
            onChange={handleInputChange} // 입력 필드가 변경될 때마다 호출
            onBlur={handleInputBlur} // 입력 필드가 포커스를 잃을 때 호출
          />
        </div>
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        center={mapCenter}
        zoom={15}
        onClick={handleMapClick} // 사용자가 지도를 클릭할 때 호출
        onLoad={(map) => {
          // Geocoder 객체 초기화
          geocoderRef.current = new google.maps.Geocoder();
        }}
        options={{
          draggableCursor: "default", // 기본 커서 모양 유지
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </>
  );
}
