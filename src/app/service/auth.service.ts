import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {User} from './model/user.model';
import {State } from './model/state.model';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);

  router: Router = inject(Router);

  location: Location = inject(Location);

  notConnected = 'NOT_CONNECTED';


  private fetchUser$: WritableSignal<State<User, HttpErrorResponse>> =
    signal(State.Builder<User, HttpErrorResponse>().forSuccess({email: this.notConnected}).build());

    fetchUser = computed(() => this.fetchUser$());


  fetch(): void {
    this.http.get<User>(`${environment.API_URL}/api/get-authenticated-user`)
      .subscribe( {
        /** Success Handling (next callback):
         * If the HTTP request is successful and returns a User, the result (user) is processed using a state management object (this.fetchUser$).
         * @param user
         */
          next: user => this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess(user).build()),
          // Error Handling (error callback):
          error: (err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
              this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess({
                firstName: '',
                lastName: '',
                email: this.notConnected}).build());
            } else {
              this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forError(err).build());
            }
          }
      });
  }


  isAuthenticated() {
    if (this.fetchUser$().value){
      return this.fetchUser$().value!.email !== this.notConnected;
    } else {
      return false;
    }
  }

  login(): void {
    location.href = `${location.origin}${this.router.serializeUrl(this.router.createUrlTree(['oauth2/authorization/okta']))
  }`};

  logout(): void {
    this.http.post(`${environment.API_URL}/api/logout`, {}, {withCredentials: true})
      .subscribe({
        next: (response: any) => {
          this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess({email: this.notConnected}).build());
          location.href = response.logoutUrl
        }
      })
  }

  constructor() { }

}
