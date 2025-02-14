import {Component, effect, inject, OnInit} from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {SmallSongCardComponent} from '../../shared/small-song-card/small-song-card.component';
import {SongService} from '../../service/song.service';
import {ReadSong, SongContent} from '../../service/model/song.model';
import {ToastService} from '../../service/toast.service';
import {SongContentService} from '../../service/song-content.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterModule,
    FontAwesomeModule,
    SmallSongCardComponent
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {

  private songContentService: SongContentService = inject(SongContentService);
  private songService: SongService = inject(SongService);
  private toastService: ToastService = inject(ToastService);

  isLoading:boolean = false;

  songs: Array<ReadSong> | undefined = [];


  constructor() {
    effect(() => {
      if (this.songService.getAllSig().status === 'OK') {
        this.songs = this.songService.getAllSig().value;
      } else if (this.songService.getAllSig().status === 'ERROR') {
        this.toastService.show('An error occured when fetching all songs', "DANGER");
      }
      this.isLoading = false;
    });
  }


  ngOnInit(): void {
    this.fetchSongs();
  }


  private fetchSongs() {
    this.isLoading = true;
    this.songService.getAllSig();
  }


  onPlaySong(songToPlayFirst: ReadSong) {
    this.songContentService.createNewQueue(songToPlayFirst, this.songs!);
  }

}
