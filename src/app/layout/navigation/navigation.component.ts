import { Component } from '@angular/core';
import {RouterLinkActive} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLinkActive,
    FaIconComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
