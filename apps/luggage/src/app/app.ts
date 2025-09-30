import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LuggageFeatureCheckin } from '@flight-demo/luggage/feature-checkin';

@Component({
  imports: [RouterModule, LuggageFeatureCheckin],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'luggage';
}
