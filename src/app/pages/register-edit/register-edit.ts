import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signOut
} from '@angular/fire/auth';
import {FormsModule, NgForm} from '@angular/forms';
import {CrudService} from '../../services/crudService';
import {AppUser} from '../profile/profile';
import {Subscription} from 'rxjs';
import { EmailAuthProvider} from 'firebase/auth';
import {
  IonContent, IonItem, IonLabel, IonInput, IonSelect,
  IonSelectOption, IonCheckbox, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.html',
  styleUrl: './register-edit.css',
  imports: [FormsModule,
    IonContent, IonItem, IonLabel, IonInput, IonSelect,
    IonSelectOption, IonCheckbox, IonButton
  ],
  standalone: true
})
export class RegisterEdit implements OnInit, OnDestroy {
  userSub!: Subscription;
  private authUnsub!: () => void;
  isEditMode: boolean = false;
  userData: AppUser & { id?: string } = {uid: '', name:'', surname: '', email:'', DNI: '', phoneNumber: '', role: null, favs: [], pendientes: [], hist: []};

  constructor(
    private router: Router,
    private auth: Auth,
  ) {}
  termAccepted: boolean = false;
  private crudService = inject(CrudService);
  private cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.authUnsub = this.auth.onAuthStateChanged(user => {
      if (user) {
        this.isEditMode = true;
        this.userSub = this.crudService
          .getWhere<AppUser>("users", "uid", "==", user.uid)
          .subscribe(res => {
            this.userData = res[0];
            this.cd.detectChanges();
          });
      } else {
        this.isEditMode = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.authUnsub) this.authUnsub();
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Completa todos los campos");
      console.log(form.value);
      return;
    }

    if (!this.termAccepted) {
      alert("Debes de aceptar los terminos");
      return;
    }

    const { email, email_confirm, password, password_confirmed } = form.value;

    if (password !== password_confirmed) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (email !== email_confirm) {
      alert("El correo no coincide");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.crudService.add<AppUser>("users", {
        uid: userCredential.user.uid,
        name: form.value.name,
        surname: form.value.surname,
        email: form.value.email,
        DNI: form.value.DNI,
        phoneNumber: form.value.phone,
        role: form.value.role,
        favs: [],
        pendientes: [],
        hist: []
      });

      await signOut(this.auth);
      await this.router.navigate(['/login']);

    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert("Este correo ya está registrado");
          break;
        case 'auth/invalid-email':
          alert("El correo no es válido");
          break;
        default:
          alert("Error: " + error.message);
      }
    }
  }

  async updateMode(form: NgForm) {
    if (!this.userData.id) {
      alert("No se encontró al usuario");
      return;
    }

    if (form.invalid) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const user = this.auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(user.email!, form.value.currentPassword);
        await reauthenticateWithCredential(user, credential);

        await this.crudService.update<AppUser>("users", this.userData.id, {
          name: form.value.name,
          surname: form.value.surname,
          DNI: form.value.DNI,
          phoneNumber: form.value.phone,
        });
      }

      await this.router.navigate(['/profile']);
    } catch (error: any) {
      alert("Error" + error.message);
    }
  }
}
