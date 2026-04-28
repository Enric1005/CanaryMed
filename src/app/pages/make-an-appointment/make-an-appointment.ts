import { Component } from '@angular/core';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';

@Component({
  selector: 'app-make-an-appointment',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './make-an-appointment.html',
  styleUrl: './make-an-appointment.css',
})
export class MakeAnAppointment {}
