import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {WorkerService} from "../services/worker.service";
import {Worker} from "../models/worker";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkersListComponent implements OnInit {

  page = 1;

  person = '';

  department = '';

  salaryFrom = '';
  salaryTo = '';

  filteredWorkers: Worker[] = [];

  workers: Worker[] = [
    {
      id: 1,
      imie: "Jan",
      nazwisko: "Kowalski",
      dzial: "IT",
      wynagrodzenieKwota: 3000,
      wynagrodzenieWaluta: "PLN"
    },
    {
      id: 2,
      imie: "Anna",
      nazwisko: "Bąk",
      dzial: "Administracja",
      wynagrodzenieKwota: 2400.50,
      wynagrodzenieWaluta: "PLN"
    },
    {
      id: 3,
      imie: "Paweł",
      nazwisko: "Zabłocki",
      dzial: "IT",
      wynagrodzenieKwota: 3300,
      wynagrodzenieWaluta: "PLN"
    },
    {
      id: 4,
      imie: "Tomasz",
      nazwisko: "Osiecki",
      dzial: "Administracja",
      wynagrodzenieKwota: 2100,
      wynagrodzenieWaluta: "PLN"
    },
    {
      id: 5,
      imie: "Iwona",
      nazwisko: "Leihs-Gutowska",
      dzial: "Handlowiec",
      wynagrodzenieKwota: 3100,
      wynagrodzenieWaluta: "PLN"
    }
  ];

  workerForm = new FormGroup({
    imie: new FormControl('', Validators.required),
    nazwisko: new FormControl('', Validators.required),
    dzial: new FormControl('', Validators.required),
    wynagrodzenieKwota: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    wynagrodzenieWaluta: new FormControl('', Validators.required)
  });

  constructor(private workerService: WorkerService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWorkers();
  }

  clearForm() {
    this.workerForm.reset();
  }

  getWorkers() {
    this.workerService.getWorkers().subscribe((data: Worker[]) => {
      this.workers = this.workers.concat(data);
      this.filteredWorkers = this.workers;
    });
  }

  addWorker() {
    this.workerService.addWorker(this.workerForm.value).subscribe(() => {
      this.clearForm();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/workers']);
      this.toastr.success('Pracownik został dodany');
    });
  }

  sumSalary() {
    let total = 0;
    for(let data of this.filteredWorkers){
      total += data.wynagrodzenieKwota;
    }
    return total;
  }

  filterWorker() {
    if (this.department != '' && this.department != 'All') {
      this.filteredWorkers = this.workers.filter(res => {
        return res.dzial === this.department;
      });
    } else {
      this.filteredWorkers = this.workers;
    }

    if (this.salaryFrom != '' && this.salaryTo != '') {
      this.filteredWorkers = this.filteredWorkers.filter(res => {
        let from: number = +this.salaryFrom;
        let to: number = +this.salaryTo;
        return res.wynagrodzenieKwota >= from && res.wynagrodzenieKwota <= to;
      });
    }

    if (this.person != '') {
      this.filteredWorkers = this.filteredWorkers.filter(res => {
        return res.imie.toLocaleLowerCase().includes(this.person.toLocaleLowerCase().trim()) ||
          res.nazwisko.toLocaleLowerCase().includes(this.person.toLocaleLowerCase().trim());
      });
    }
  }

}
