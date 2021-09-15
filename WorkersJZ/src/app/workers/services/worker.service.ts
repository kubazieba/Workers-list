import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Worker} from "../models/worker";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private workerApiUrl = "http://localhost:3000/workers";

  constructor(private http: HttpClient) { }

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.workerApiUrl);
  }

  addWorker(worker: Worker) {
    return this.http.post(this.workerApiUrl, worker);
  }
}
