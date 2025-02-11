import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from './shared/font-awesome-icons';
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {HeaderComponent} from './layout/header/header.component';
import {LibraryComponent} from './layout/library/library.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavigationComponent, HeaderComponent, LibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'spotify-clone-front';


  private faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  ngOnInit(): void {
    this.initFontAwesome();
  }


  private initFontAwesome(){
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }


  protected readonly faCirclePlay = faCirclePlay;
}
