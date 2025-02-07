import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  isLoading:boolean = false;

  songs = [];



}
