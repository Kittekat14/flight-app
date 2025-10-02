import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { Luggage, LuggageService } from '@demo/luggage/data';
import { mapResponse } from '@ngrx/operators';
import { signalStore, withProps, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { switchMap } from 'rxjs';
import { checkinEvents } from './checkin.events';

export const LuggageStore = signalStore(
  { providedIn: 'root' },
  withState({
    loading: false,
    luggage: [] as Luggage[],
    error: '',
  }),
  withProps(() => ({
    events: inject(Events),
    luggageService: inject(LuggageService),
  })),
  withReducer(
    on(checkinEvents.loadLuggage, () => {
      return { luggage: [], loading: true };
    }),
    on(checkinEvents.loadLuggageSuccess, (event) => {
      return { luggage: event.payload.luggage, loading: false };
    }),
    on(checkinEvents.loadLuggageError, (event) => {
      return { error: event.payload.error, loading: false };
    })
  ),
  withEffects((store) => ({
    loadLuggage$: store.events.on(checkinEvents.loadLuggage).pipe(
      switchMap((event) =>
        store.luggageService.load(event.payload.passengerId)
      ),
      mapResponse({
        next: (luggage) => checkinEvents.loadLuggageSuccess({ luggage }),
        error: (error) =>
          checkinEvents.loadLuggageError({ error: String(error) }),
      })
    ),
  })),
  withDevtools('booking')
);
