import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import {Auth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence} from '@angular/fire/auth';
import {
  IonContent, IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  imports: [RouterLink, IonContent, IonItem, IonLabel, IonInput, IonButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private location: Location,
    private auth: Auth,
    private router: Router,
  ){}

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
      await this.router.navigate(['/profile']);
    }
    catch (error: any) {
      alert("Correo o contraseña incorrectos");
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
