import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from './shared/font-awesome-icons';
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {HeaderComponent} from './layout/header/header.component';
import {LibraryComponent} from './layout/library/library.component';
import {ToastService} from './service/toast.service';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {AddSongComponent} from './add-song/add-song.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavigationComponent, HeaderComponent, LibraryComponent, NgbToast, AddSongComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'spotify-clone-front';

  private faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  toastService: ToastService = inject(ToastService);



  ngOnInit(): void {
    this.initFontAwesome();
  }


  private initFontAwesome(){
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }


  protected readonly faCirclePlay = faCirclePlay;
}
