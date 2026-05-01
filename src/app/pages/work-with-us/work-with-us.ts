import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {FormsModule, NgForm} from '@angular/forms';
import {ColaboraBase} from '../../components/colabora-base/colabora-base';
import {Router} from '@angular/router';
import {Auth} from '@angular/fire/auth';
import { Subscription} from 'rxjs';
import {AppUser} from '../profile/profile';
import {CrudService} from '../../services/crudService';
import { NgZone } from '@angular/core';

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
    private ngZone: NgZone
  ) {}

  user: AppUser | null | undefined = undefined;
  private userSub!: Subscription;
  private authUnsub!: () => void; // onAuthStateChanged devuelve una función para desuscribirse
  private crudService = inject(CrudService);
  private cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.authUnsub = this.auth.onAuthStateChanged(user => {
      this.ngZone.run(() => {  // 👈 envuelve todo aquí
        if (this.userSub) this.userSub.unsubscribe();

        if (user) {
          console.log("User found");
          this.userSub = this.crudService
            .getWhere<AppUser>("users", "uid", "==", user.uid)
            .subscribe(res => {
              this.user = res[0];
              this.cd.detectChanges();
            });
        } else {
          this.user = null;
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.authUnsub) this.authUnsub(); // desuscribe el listener de Firebase
  }


  async onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Completa todos los campos");
      return;
    }

    const { institucion, correo, telefono, direccion, tipoEspecialidad, especialidad } = form.value;

    try {
      await this.crudService.add("centers", {
        uid: this.user?.uid,
        empresa: this.user?.name,
        institucion,
        correo,
        telefono,
        direccion,
        tipoEspecialidad,
        especialidad,
        creadoEn: new Date()
      });

      alert("¡colaborador enviado correctamente!");
      form.resetForm();

    } catch (error: any) {
      console.log("ERROR FIREBASE:", error.code, error.message);
      alert("Error al enviar el colaborador: " + error.message);
    }
  }

  goHome() {
    this.router.navigate([""]);
  }

  goRegister() {
    this.router.navigate(["/register-edit"]);
  }
}
