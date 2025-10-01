import { withDevtools, withResource } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Criteria, FlightService } from '../data';
import { delayFirstFlight } from './delay-first-flight';

export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState({
    from: 'Graz',
    to: 'London',
    basket: {} as Record<number, boolean>,
    delayInMin: 0,
  }),
  withComputed((store) => ({
    filter: computed(() => ({
      from: store.from(),
      to: store.to(),
    })),
  })),
  withProps((_store) => ({
    _flightService: inject(FlightService),
  })),
  withResource((store) => ({
    flights: store._flightService.createResource(store.filter),
  })),
  withComputed((store) => ({
    selected: computed(() =>
      store.flightsValue().filter((f) => store.basket()[f.id])
    ),
    flightsWithDelay: computed(() =>
      delayFirstFlight(store.flightsValue(), store.delayInMin())
    ),
  })),
  withMethods((store) => ({
    updateFilter: signalMethod((filter: Criteria) => {
      patchState(store, filter);
    }),
    updateBasket: (fid: number, selected: boolean) => {
      patchState(store, (state) => ({
        basket: {
          ...state.basket,
          [fid]: selected,
        },
      }));
    },
    delay: () => {
      patchState(store, (state) => ({
        delayInMin: state.delayInMin + 15,
      }));
    },
    reload: signalMethod(() => {
      store._flightsReload();
    }),
  })),
  withDevtools('booking')
);
