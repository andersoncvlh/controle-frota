import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { Route } from "@prisma/client";

export class RoutesSerializer implements Omit<Route, 'directions'> {
    source: { name: string; location: { latitude: number; longitude: number; }; };
    destination: { name: string; location: { latitude: number; longitude: number; }; };
    id: string;
    name: string;
    distance: number;
    duration: number;
    created_at: Date;
    updated_at: Date;
    directions: DirectionsResponseData & { request: any }

    constructor(route: Route) {
        this.directions = JSON.parse(route.directions as string);
        this.id = route.id;
        this.created_at = route.created_at;
        this.updated_at = route.updated_at;
        this.destination = route.destination;
        this.distance = route.distance;
        this.duration = route.duration;
        this.source = route.source;
        this.name = route.name;
    }
}