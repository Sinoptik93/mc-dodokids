import GoogleMapReact from 'google-map-react';
import DodoLogo from "~/assets/logos/logo-dodo-simple.svg?react"

const Marker = ({text}: { text: string; lat: number; lng: number; }) => (
    <div className="size-16">
        <DodoLogo
            className="w-full h-full object-contain"
        />
    </div>
);



interface MapProps {
    pointsList: GoogleMapReact.Coords[],
    center: GoogleMapReact.Coords
    zoom?: number,
}

const Map = ({pointsList, center, zoom}: MapProps) => {
    const defaultProps = {
        center,
        zoom: zoom ?? 16
    };

    const handleApiLoaded = ({map, maps}: {maps: any; map: any}) => {
        const infoWindow = new maps.InfoWindow();

        pointsList.forEach((point) => {
            const marker = new maps.Marker({
                position: { lat: point.lat, lng: point.lng },
                map,
                icon: {

                    scaledSize: new maps.Size(80, 80)
                }
            });

            marker.addListener('click', () => {
                infoWindow.setContent(`
                    <div>
                        <h3>Unit</h3>
                        <p>Address</p>
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
                {
                    pointsList.map((point) => (
                        <Marker
                            key={point.lat + point.lng}
                            lat={point.lat}
                            lng={point.lng}
                            text="My Marker"
                        />
                    ))
                }

            </GoogleMapReact>
        </div>
    );
}

export default Map;
