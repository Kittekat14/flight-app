import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Luggage, LuggageService } from '@flight-demo/luggage/domain';

@Component({
  selector: 'lib-luggage-feature-checkin',
  imports: [CommonModule],
  templateUrl: './luggage-feature-checkin.html',
  styleUrl: './luggage-feature-checkin.css',
})
export class LuggageFeatureCheckin implements OnInit {
  private luggageService = inject(LuggageService);
  luggage: Luggage[] = [];

  ngOnInit(): void {
    this.luggageService.load().subscribe((luggage) => {
      this.luggage = luggage;
    });
  }
}
