import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.html',
  styleUrl: './register-edit.css',
  standalone: true
})
export class RegisterEdit {

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  async register(event: Event) {
    console.log("REGISTER CLICK");
    event.preventDefault();

    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    const apellidos = (document.getElementById("apellidos") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const emailConfirm = (document.getElementById("email_confirm") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const passwordConfirm = (document.getElementById("password_confirmed") as HTMLInputElement).value;
    const dni = (document.getElementById("NIF") as HTMLInputElement).value;
    const tel = (document.getElementById("tel") as HTMLInputElement).value;

    console.log(email, password);

    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (email !== emailConfirm) {
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

      // aquí podrías guardar datos extra en Firestore si quieres
      // (nombre, apellidos, dni, tel)

      await this.router.navigate(['/login']);

    } catch (error: any) {
      console.log("ERROR FIREBASE:", error.code, error.message);
    }
  }
}
