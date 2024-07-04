import GoogleMapReact from 'google-map-react';
// import DodoLogo from "~/assets/logos/logo-dodo-simple.svg?react"
import dodoLogoLink from "~/assets/logos/logo-dodo-simple.svg"

// const Marker = ({text}: { text: string; lat: number; lng: number; }) => (
//     <div className="size-16">
//         <DodoLogo
//             className="w-full h-full object-contain"
//         />
//     </div>
// );


interface MapProps {
    pointsList: {
        label: string;
        name: string;
        address: string;
        coordinates: GoogleMapReact.Coords
    }[],
    center: GoogleMapReact.Coords
    zoom?: number,
}

const Map = ({pointsList, center, zoom}: MapProps) => {
    const defaultProps = {
        center,
        zoom: zoom ?? 13
    };

    const handleApiLoaded = ({map, maps}: {maps: any; map: any}) => {
        const infoWindow = new maps.InfoWindow();

        pointsList.forEach((point) => {
            const marker = new maps.Marker({
                map,
                position: {
                    lat: point.coordinates.lat,
                    lng: point.coordinates.lng
                },
                icon: {
                    url: dodoLogoLink.src,
                    scaledSize: new maps.Size(60, 60)
                }
            });

            marker.addListener('click', () => {
                infoWindow.setContent(`
                    <div>
                        <p><span class="font-black">Unit:</span> ${point.label}</h3>
                        <p><span class="font-black">Address:</span> ${point.address}</p>
                    </div>
                `);
                infoWindow.open(map, marker);
            });
        });
    };

    return (
        <div className="h-svh md:h-[550px]">
            <GoogleMapReact
                bootstrapURLKeys={{key: import.meta.env.PUBLIC_GOOGLE_API_KEY}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={handleApiLoaded}
            >
                {/* {
                    pointsList.map((point) => (
                        <Marker
                            key={point.coordinates.lat + point.coordinates.lng}
                            lat={point.coordinates.lat}
                            lng={point.coordinates.lng}
                            text="My Marker"
                        />
                    ))
                } */}

            </GoogleMapReact>
        </div>
    );
}

export default Map;
