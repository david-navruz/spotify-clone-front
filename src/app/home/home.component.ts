import {Component, effect, inject} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SongCardComponent} from './song-card/song-card.component';
import {SongService} from '../service/song.service';
import {ToastService} from '../service/toast.service';
import {ReadSong} from '../service/model/song.model';
import {SongContentService} from '../service/song-content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FontAwesomeModule,
    SongCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private songService: SongService = inject(SongService);
  private toastService: ToastService = inject(ToastService);
  private songContentService: SongContentService = inject(SongContentService);


  allSongs: Array<ReadSong> | undefined;

  isLoading = false;

  /** effect() tracks signals and re-runs automatically whenever getAllSig() changes.
   *
   */
  constructor() {
    this.isLoading = true;
    effect(() => {
      const allSongsResponse = this.songService.getAllSig();
        if (allSongsResponse.status === "OK") {
          this.allSongs = allSongsResponse.value;
        }
        else if (allSongsResponse.status === "ERROR") {
          this.toastService.show('An error occured when fetching all songs', "DANGER");
        }
        this.isLoading = false;
    });
  }

  onPlaySong(songToPlayFirst: ReadSong) {
    this.songContentService.createNewQueue(songToPlayFirst, this.allSongs!);
  }

}
