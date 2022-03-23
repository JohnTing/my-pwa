

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useLayoutEffect, useState } from "react";




export default function MyMap() {
  const [position, setPosition] = useState<GeolocationPosition>()
  const [myMap, setMyMap] = useState<L.Map>()
  const [myMarker, setMyMarker] = useState<L.Marker>()


  useEffect(() => {
    const map = L.map('map').setView([24.1799, 120.6021], 64);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
      maxNativeZoom:19,
      maxZoom: 20,
    }).addTo(map);

    setMyMap(map);


    const watchID = navigator.geolocation.watchPosition((position) => {
      setPosition(position)

      console.log(position.coords.latitude, position.coords.longitude);
    });

    return () => { navigator.geolocation.clearWatch(watchID) };
  }, [])

  useEffect(() => {

    if (!position || !myMap)
      return;

    const greenIcon = new L.Icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    if (myMarker) {
      myMarker.remove()
    }
    const marker = L.marker([position.coords.latitude, position.coords.longitude], { icon: greenIcon }).addTo(myMap);

    setMyMarker(marker)




  }, [position])


  function setview() {
    if (myMap && position) {
      myMap.setView([position.coords.latitude, position.coords.longitude])
    }

  }



  return (
    <div id="map" style={{ height: "100%", width: "100%" }}>

      <div className="leaflet-bottom">
        <input type="button" id="Btn2" value="Btn2" onClick={() => setview()} className="btnStyle span3 leaflet-control" />
      </div>



    </div>
  )
}