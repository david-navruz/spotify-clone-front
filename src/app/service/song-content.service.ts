import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ReadSong, SongContent} from './model/song.model';
import {State} from './model/state.model';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SongContentService {


  http: HttpClient = inject(HttpClient);

  private queueToPlay$: WritableSignal<Array<ReadSong>> = signal([]);
  queueToPlay: Signal<ReadSong[]> = computed(() => this.queueToPlay$());


  private play$: WritableSignal<State<SongContent, HttpErrorResponse>> =
    signal(State.Builder<SongContent, HttpErrorResponse>().forInit().build());
  playNewSong = computed( () => this.play$());


  createNewQueue(firstSong: ReadSong, songsToPlay: ReadSong[]): void {
    const updatedSongs = [...songsToPlay.filter(song => song.publicId !== firstSong.publicId)];
    updatedSongs.unshift(firstSong);
    this.queueToPlay$.set(updatedSongs);
  }


  fetchNextSong(songToPlay: SongContent) : void {
    const queryParam = new HttpParams().set('publicId', songToPlay.publicId!);
    this.http.get<SongContent>(`${environment.API_URL}/api/songs/get-content`, {params: queryParam})
      .subscribe({
        next: songContent => {
          this.mapReadSongToSongContent(songContent, songToPlay);
          this.play$.set(State.Builder<SongContent, HttpErrorResponse>().forSuccess(songContent).build())
        },
        error: err => this.play$.set(State.Builder<SongContent, HttpErrorResponse>().forError(err).build())
      })
  }

  private mapReadSongToSongContent(songContent: SongContent, songToPlay: ReadSong) {
    songContent.cover = songToPlay.cover;
    songContent.coverContentType = songToPlay.coverContentType;
    songContent.title = songToPlay.title;
    songContent.author = songToPlay.author;
    songContent.favorite = songToPlay.favorite;
  }

  constructor() { }

}
