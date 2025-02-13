import { Routes } from '@angular/router';
import {AddSongComponent} from './add-song/add-song.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: "add-song",
    component: AddSongComponent
  }




];
