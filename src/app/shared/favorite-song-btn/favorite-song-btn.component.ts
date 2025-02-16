import {Component, effect, inject, input} from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SongService} from '../../service/song.service';
import {AuthService} from '../../service/auth.service';
import {ReadSong} from '../../service/model/song.model';

@Component({
  selector: 'app-favorite-song-btn',
  standalone: true,
  imports: [
    FaIconComponent,
    FontAwesomeModule
  ],
  templateUrl: './favorite-song-btn.component.html',
  styleUrl: './favorite-song-btn.component.scss'
})
export class FavoriteSongBtnComponent {

  song = input.required<ReadSong>();

  authService = inject(AuthService);
  songService = inject(SongService);


  constructor() {
    effect(() => {
      let favoriteSongState = this.songService.addOrRemoveFavoriteSongSig();
      if (favoriteSongState.status === "OK" && favoriteSongState.value
        && this.song().publicId === favoriteSongState.value.publicId) {
        this.song().favorite = favoriteSongState.value.favorite;
      }
    });
  }

  onFavorite(song: ReadSong) {
    this.songService.addOrRemoveAsFavorite(!song.favorite, song.publicId!);
  }


}
