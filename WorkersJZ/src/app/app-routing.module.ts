import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkersListComponent} from "./workers/workers-list/workers-list.component";
import {HomeComponent} from "./workers/home/home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'workers',
    component: WorkersListComponent
  },
  { path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
