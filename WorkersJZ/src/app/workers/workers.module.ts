import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2OrderModule} from "ng2-order-pipe";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {ToastrModule} from "ngx-toastr";
import {WorkersListComponent} from "./workers-list/workers-list.component";
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {FilterPipe} from "../pipes/filter.pipe";

@NgModule({
  declarations: [
    WorkersListComponent,
    HomeComponent,
    FilterPipe
  ],
  exports: [
    WorkersListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ]
})
export class WorkersModule { }
