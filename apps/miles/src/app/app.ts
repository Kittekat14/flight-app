import { Component, inject } from '@angular/core';

import { AuthService } from '@flight-demo/util-auth';

@Component({
  imports: [],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'miles';

  private readonly authService = inject(AuthService);

  constructor() {
    this.authService.userName.subscribe((userName) => {
      console.log('username', userName ? userName : 'unknown');
    });
  }
}

export default App;
