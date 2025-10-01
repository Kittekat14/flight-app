import { CommonModule } from '@angular/common';
import { Component, computed, inject, linkedSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookingStore } from './booking.store';

@Component({
  selector: 'app-flight-booking',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css'],
})
export class FlightBookingComponent {
  private bookingStore = inject(BookingStore);

  // make filter writable through linkedSignals
  from = linkedSignal(() => this.bookingStore.from());
  to = linkedSignal(() => this.bookingStore.to());

  flights = this.bookingStore.flightsValue;
  basket = this.bookingStore.basket;

  filter = computed(() => ({ from: this.from(), to: this.to() }));
  // but why not? filter = computed(() => this.bookingStore.filter());

  constructor() {
    this.search();
  }

  search(): void {
    this.bookingStore.updateFilter(this.filter());
  }

  delay(): void {
    this.bookingStore.delay;
  }

  updateBasket(flightId: number, selected: boolean): void {
    this.bookingStore.updateBasket(flightId, selected);
  }
}
