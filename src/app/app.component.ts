import {Component, effect, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fontAwesomeIcons} from './shared/font-awesome-icons';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {HeaderComponent} from './layout/header/header.component';
import {LibraryComponent} from './layout/library/library.component';
import {ToastService} from './service/toast.service';
import {NgbModal, NgbModalRef, NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {PlayerComponent} from './layout/player/player.component';
import {AuthPopupState, AuthService} from './service/auth.service';
import {AuthPopupComponent} from './layout/auth-popup/auth-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavigationComponent, HeaderComponent, LibraryComponent,
    NgbToast, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'spotify-clone-front';

  private faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  toastService: ToastService = inject(ToastService);

  private authService: AuthService = inject(AuthService);

  private modalService: NgbModal = inject(NgbModal);

  private authModalRef: NgbModalRef | null = null;


  constructor() {
    effect(() => {
      this.openOrCloseAuthModal(this.authService.authPopupStateChange())
    }, {allowSignalWrites: true});
  }


  ngOnInit(): void {
    this.initFontAwesome();
  }


  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  //  Opens or closes the authentication modal based on the provided state.
  private openOrCloseAuthModal(state: AuthPopupState) {
    if (state === 'OPEN') {
      this.openAuthPopup();
    } else if (this.authModalRef !== null && state === "CLOSE" && this.modalService.hasOpenModals()) {
      this.authModalRef?.close();
    }
  }

  private openAuthPopup() {
    this.authModalRef = this.modalService.open(AuthPopupComponent, {
      ariaDescribedBy: 'authentication-model',
      centered: true
    });

    // dismissed: Listens for when the modal is dismissed (e.g., by clicking outside the modal or pressing the escape key).
    this.authModalRef.dismissed.subscribe({
      next: () => {
        this.authService.openOrCloseAuthPopup("CLOSE");
      }
    });

    // closed: Listens for when the modal is closed (e.g., by a button inside the modal).
    this.authModalRef.closed.subscribe({
      next: () => {
        this.authService.openOrCloseAuthPopup("CLOSE");
      }
    })
  }

}
