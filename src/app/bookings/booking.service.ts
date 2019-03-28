import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class BookingService {
    private _bookings: Booking[] = new BehaviorSubject<Booking>([]) ;

    get bookings() {
        return [...this._bookings];
    }
}
