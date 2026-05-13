import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {FormsModule, NgForm} from '@angular/forms';
import {ColaboraBase} from '../../components/colabora-base/colabora-base';
import {Router} from '@angular/router';
import {Auth, signOut} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {AppUser} from '../profile/profile';
import {CrudService} from '../../services/crudService';
import {NgZone} from '@angular/core';
import {
  IonHeader, IonContent, IonItem, IonLabel,
  IonInput, IonSelect, IonSelectOption, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-work-with-us',
  standalone: true,
  imports: [Header, Footer, FormsModule, ColaboraBase,
    IonHeader, IonContent, IonItem, IonLabel,
    IonInput, IonSelect, IonSelectOption, IonButton
  ],
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
  private authUnsub!: () => void;
  private crudService = inject(CrudService);
  private cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.authUnsub = this.auth.onAuthStateChanged(user => {
      this.ngZone.run(() => {
        if (this.userSub) this.userSub.unsubscribe();
        if (user) {
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
    if (this.authUnsub) this.authUnsub();
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Completa todos los campos");
      return;
    }

    const { institucion, correo, telefono, direccion, tipoEspecialidad, especialidad } = form.value;

    try {
      await this.crudService.add("colaboraciones", {
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
      form.resetForm();
    } catch (error: any) {
      alert("Error al enviar el colaborador: " + error.message);
    }
  }

  async goRegister() {
    await signOut(this.auth);
    this.router.navigate(['/register-edit']);
  }
}
