import { BookingService } from './booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  constructor(private bookingsService: BookingService) { }

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // cancel booking with id offerId
  }

}
