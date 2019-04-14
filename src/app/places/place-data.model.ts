import { PlaceLocation } from './location.model';

export interface PlaceData {
    availableFrom: string;
    availableTo: string;
    description: string;
    imageUrl: string;
    price: number;
    title: string;
    userId: string;
    location: PlaceLocation;
}
