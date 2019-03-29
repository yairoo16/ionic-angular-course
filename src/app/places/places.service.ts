import { HttpClient } from 'selenium-webdriver/http';
import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
    'p1',
    'Manhattan Mansion',
    'In the heart of New York City.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/The_Met_Cloisters.jpg/1200px-The_Met_Cloisters.jpg',
    149.99,
    new Date('2019-01-01'),
    new Date('2019-12-31'),
    'abc'
    ),
    new Place(
    'p2',
    'L\'Amour Toujours',
    'A romantic place in Paris.',
    'https://francetravelplanner.com/assets/paris/hotels/aj_jules_ferry1693.jpg',
    189.99,
    new Date('2019-01-01'),
    new Date('2019-12-31'),
    'abc'
    ),
    new Place('p3',
    'The Foggy Palace',
    'Not your average city trip!',
    'https://static.mansionglobal.com/production/media/article-images/0b91abb1004e6851a03f9a399b790e13/large_DSC_1423.jpg',
    99.99,
    new Date('2019-01-01'),
    new Date('2019-12-31'),
    'abc'
    )
  ]) ;

  get places() {
    return this._places.asObservable();
  }
  constructor(private authService: AuthService, private http: HttpClient ) { }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(title: string,
            description: string,
            price: number,
            dateFrom: Date,
            dateTo: Date) {

    const newPlace = new Place(Math.random().toString(),
      title,
      description,
      'https://francetravelplanner.com/assets/paris/hotels/aj_jules_ferry1693.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId);
    return this._places.pipe(take(1), delay(1000), tap(places => {
      this._places.next(places.concat(newPlace));
    }));
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
