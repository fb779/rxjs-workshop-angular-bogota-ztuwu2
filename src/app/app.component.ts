import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <mat-toolbar color="primary">
      <img [src]="logo" class="logo" /> {{ name }}
    </mat-toolbar>

    <app-giphy></app-giphy>
  `,
  styles: [
    `
      .logo {
        height: 60px;
        width: auto;
      }
    `,
  ],
})
export class AppComponent {
  name = 'Workshop RxJS';
  logo =
    'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg';
  // logo = "https://pappcornbackapp.com/logos/logo_angular_bogota.png";
}
