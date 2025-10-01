import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceSignal } from '@demo/shared/util-common';
import { FlightService } from '@demo/ticketing/data';
import { BookingStore } from '../booking.store';
import { FlightCardComponent } from '../flight-card/flight-card.component';

// import { CheckinService } from '@demo/checkin/data/checkin.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [CommonModule, FormsModule, FlightCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);
  private bookingStore = inject(BookingStore);

  from = linkedSignal(() => this.bookingStore.from());
  to = linkedSignal(() => this.bookingStore.to());
  // flights = this.bookingStore.flightsValue;
  flights = this.bookingStore.flightsWithDelay;

  filter = computed(() => ({
    from: this.from(),
    to: this.to(),
  }));

  basket = this.bookingStore.basket;
  selected = this.bookingStore.selected;

  debouncedFilter = debounceSignal(this.filter, 300);

  constructor() {
    this.bookingStore.updateFilter(this.debouncedFilter);
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
