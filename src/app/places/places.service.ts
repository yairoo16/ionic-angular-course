import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
    'p1',
    'Manhattan Mansion',
    'In the heart of New York City.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/The_Met_Cloisters.jpg/1200px-The_Met_Cloisters.jpg',
    149.99),
    new Place('p2',
    'L\'Amour Toujours',
    'A romantic place in Paris.',
    'https://francetravelplanner.com/assets/paris/hotels/aj_jules_ferry1693.jpg',
    189.99),
    new Place('p3',
    'The Foggy Palace',
    'Not your average city trip!',
    'https://static.mansionglobal.com/production/media/article-images/0b91abb1004e6851a03f9a399b790e13/large_DSC_1423.jpg',
    99.99)
  ];

  get places() {
    return [...this._places];
  }
  constructor() { }
}
