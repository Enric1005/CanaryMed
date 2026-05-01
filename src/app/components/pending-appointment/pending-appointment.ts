import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pending-appointment',
  imports: [],
  templateUrl: './pending-appointment.html',
  styleUrl: './pending-appointment.css',
})
export class PendingAppointment {
  @Input() item: any;
}
