import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {ReadSong, SaveSong} from "./model/song.model";
import {State} from "./model/state.model";
import {environment} from '../../environments/environment';
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  http: HttpClient = inject(HttpClient);

 toastService = inject(ToastService);


  private add$: WritableSignal<State<SaveSong, HttpErrorResponse>> =
    signal(State.Builder<SaveSong, HttpErrorResponse>().forInit().build());
  // addSig is a computed signal, which means it reactively derives its value from add$.
  addSig = computed(() => this.add$());

  private getAll$: WritableSignal<State<Array<ReadSong>, HttpErrorResponse>> =
    signal(State.Builder<Array<ReadSong>, HttpErrorResponse>().forInit().build());
  getAllSig = computed(() => this.getAll$());


  add(song: SaveSong) {
    const formData: FormData = new FormData();
    formData.append('cover', song.cover!);
    formData.append('file', song.file!);
    const clone = structuredClone(song);
    clone.file = undefined;
    clone.cover = undefined;
    formData.append('dto', JSON.stringify(clone));

    this.http.post<SaveSong>(`${environment.API_URL}/api/songs`, formData)
      .subscribe({
        // If the request succeeds, add$ is updated with a success state containing the saved song.
        next: savedSong => this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forSuccess(savedSong).build()),
        // If the request fails, add$ is updated with an error state containing the error.
        error: err => this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forError(err).build())
      })
  }

  // resets the add$ signal to its initial state
  reset(): void {
    this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forInit().build());
  }







  constructor() { }
}
