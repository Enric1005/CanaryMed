import {Component, OnInit} from '@angular/core';
import {PendingAppointment} from '../../components/pending-appointment/pending-appointment';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Header} from '../../components/header/header';
import {DataService} from '../../services/dataService';

@Component({
  selector: 'app-pending-appointments',
  imports: [
    PendingAppointment,
    RouterLink,
    Header
  ],
  templateUrl: './pending-appointments.html',
  styleUrl: './pending-appointments.css',
})
export class PendingAppointments implements OnInit {
  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  titulo: string = '';
  items: string[] = [];
  ngOnInit() {
    this.titulo = this.route.snapshot.queryParams['titulo'];
    this.items = this.dataService.items;
    console.log("ITEMS:", this.items); // 👈
  }

}
