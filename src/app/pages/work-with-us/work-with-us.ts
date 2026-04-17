import {Component, OnInit} from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {FormsModule} from '@angular/forms';
import {ColaboraBase} from '../../components/colabora-base/colabora-base';

@Component({
  selector: 'app-work-with-us',
  standalone: true,
  imports: [Header, Footer, FormsModule, ColaboraBase],
  templateUrl: './work-with-us.html',
  styleUrl: './work-with-us.css',
})

export class WorkWithUs {
  onSubmit(form: any) {
    if (form.invalid) return;
    console.log(form.value);
  }
}
