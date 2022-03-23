import { useEffect, useRef, useState } from "react";


import dhmap from "./dhmap.jpg"


export default function GPS() {
  /*
    const [position, setPosition] = useState<GeolocationPosition>()

    const canvas = useRef<HTMLCanvasElement>(null);

    const ctx = canvas.current?.getContext('2d');
    
    useEffect(() => {
      const img = new Image();   // Create new img element
      img.src = dhmap; // Set source path
      ctx?.drawImage(img, 0, 0);
    }, [ctx]);

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        
      }
    }
    
    function showPosition(position: GeolocationPosition) {
        setPosition(position)
        const img = new Image();   // Create new img element
        img.src = 'dhmap.jpg'; // Set source path
        if (ctx) {
          
          ctx.fillStyle = "green";
          ctx.fillRect(10, 10, 100, 100);
          ctx.drawImage(img, 0, 0);
        }

    }*/
    const myPosition = [51.505, -0.09]
    
    return (
<></>
    )

}

