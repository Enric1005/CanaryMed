import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {FormsModule, NgForm} from '@angular/forms';
import {CrudService} from '../../services/crudService';

export interface User {
  id?: string;
  name: string;
  surname: string;
  email: string;
  DNI: string;
  phoneNumber: string;
  role: 'paciente' | 'empresa' | null;
}

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.html',
  styleUrl: './register-edit.css',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class RegisterEdit {
  users: User[] = [];
  user: User = {name: '', surname: '', email: '', DNI: '', phoneNumber: '', role: null};

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  private crudService = inject(CrudService);

  async onSubmit(form: NgForm) {
    console.log("valor", form.value);
    console.log("invalido", form.invalid);
    if (form.invalid) {
      alert("Completa todos los campos");
      return;
    }

    const {
      email,
      email_confirm,
      password,
      password_confirmed
    } = form.value;

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

      console.log("USUARIO CREADO:", userCredential.user.uid);

      // 👉 guardar en Firestore
      await this.crudService.add<User>("users", {
        name: form.value.name,
        surname: form.value.surname,
        email: form.value.email,
        DNI: form.value.DNI,
        phoneNumber: form.value.phone,
        role: form.value.role
      });

      await this.router.navigate(['/login']);

    } catch (error: any) {
      console.log("ERROR FIREBASE:", error.code, error.message);
    }
  }
}
