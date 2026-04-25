import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { setPersistence, browserLocalPersistence } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(
    private location: Location,
    private auth: Auth,
    private router: Router
  ) {}

  async login(event: Event) {
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {

      await setPersistence(this.auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      console.log("Usuario logueado:", userCredential.user);

      await this.router.navigate(['/profile']);

    } catch (error: any) {
      console.log(error.code);
      alert("Correo o contraseña incorrectos");
    }
  }

  goBack() {
    this.location.back();
  }
}
