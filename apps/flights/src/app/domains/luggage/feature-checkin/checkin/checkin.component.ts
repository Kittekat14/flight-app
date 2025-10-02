import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { LuggageCardComponent } from '@demo/luggage/ui-common';
import { Dispatcher } from '@ngrx/signals/events';
import { checkinEvents } from './checkin.events';
import { LuggageStore } from './luggage.store';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, LuggageCardComponent],
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
})
export class CheckinComponent implements OnInit {
  //luggageService = inject(LuggageService);
  store = inject(LuggageStore);
  dispatcher = inject(Dispatcher);

  luggage = this.store.luggage;

  ngOnInit(): void {
    // this.luggageService.load().subscribe((luggage) => {
    //   this.luggage = luggage;
    // });

    this.dispatcher.dispatch(checkinEvents.loadLuggage({ passengerId: 17 }));
  }
}
