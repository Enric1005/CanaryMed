import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {FormsModule} from '@angular/forms';
import {ColaboraBase} from '../../components/colabora-base/colabora-base';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth';
import {Auth, User} from '@angular/fire/auth';
import {Observable, Subscription} from 'rxjs';
import {AppUser} from '../profile/profile';
import {CrudService} from '../../services/crudService';

@Component({
  selector: 'app-work-with-us',
  standalone: true,
  imports: [Header, Footer, FormsModule, ColaboraBase],
  templateUrl: './work-with-us.html',
  styleUrl: './work-with-us.css',
})
export class WorkWithUs implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private auth: Auth,
  ) {}

  user: AppUser | null = null;
  private userSub!: Subscription;
  private authUnsub!: () => void; // onAuthStateChanged devuelve una función para desuscribirse
  private crudService = inject(CrudService);

  ngOnInit() {
    this.authUnsub = this.auth.onAuthStateChanged(user => {

      // limpia la suscripción anterior si el usuario cambia
      if (this.userSub) this.userSub.unsubscribe();

      if (user) {
        this.userSub = this.crudService
          .getWhere<AppUser>("users", "email", "==", user.email)
          .subscribe(res => {
            console.log("Datos", res);
            this.user = res[0];
          });
      } else {
        this.user = null; // usuario cerró sesión
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.authUnsub) this.authUnsub(); // desuscribe el listener de Firebase
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
