import {Component} from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {FormsModule} from '@angular/forms';
import {ColaboraBase} from '../../components/colabora-base/colabora-base';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth';
import {User} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-work-with-us',
  standalone: true,
  imports: [Header, Footer, FormsModule, ColaboraBase],
  templateUrl: './work-with-us.html',
  styleUrl: './work-with-us.css',
})
export class WorkWithUs {

  user$!: Observable<User | null>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }


  onSubmit(form: any) {
    if (form.invalid) return;
  }

  goHome() {
    this.router.navigate([""]);
  }

  goRegister() {
    this.router.navigate(["/register-edit"]);
  }
}
