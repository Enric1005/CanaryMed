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

export interface User {
  id?: string;
  uid?: string
  name: string;
  surname: string;
  email: string;
  DNI: string;
  phoneNumber: string;
  role: 'Paciente' | 'Empresa' | null;
  favs: string[];
  pendientes: string[];
  hist: string[];
}

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.html',
  styleUrl: './register-edit.css',
  imports: [FormsModule],
  standalone: true
})
export class RegisterEdit implements OnInit, OnDestroy {
  users: User[] = [];
  userSub!: Subscription;
  private authUnsub!: () => void;
  isEditMode: boolean = false;
  userData: User = {uid: '', name:'', surname: '', email:'', DNI: '', phoneNumber: '', role: null, favs: [], pendientes: [], hist: []};

  constructor(
    private router: Router,
    private auth: Auth,
  ) {}

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
      if (this.authUnsub) this.authUnsub();

      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.crudService.add<User>("users", {
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
        if (this.userSub) this.userSub.unsubscribe();
        if (this.authUnsub) this.authUnsub();

        const credential = EmailAuthProvider.credential(user.email!, form.value.currentPassword);
        await reauthenticateWithCredential(user, credential);

        await this.crudService.update<User>("users", this.userData.id, {
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
