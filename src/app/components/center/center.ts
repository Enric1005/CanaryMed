import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita';
import { getAuth } from '@angular/fire/auth';
import { SqliteService } from '../../services/sqlite';
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonText,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonText,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  @Input() center: any;
  showLoginPopup = false;

  constructor(
    private cita: CitaService,
    private router: Router,
    private sqlite: SqliteService,
  ) {}

  async handleFavoriteClick(event: MouseEvent, center: any) {
    const user = getAuth().currentUser;

    if (!user) {
      event.preventDefault();
      this.showLoginPopup = true;
      return;
    }

    const favoritoString = `${center.name} - ${center.sitio} - ${center.precio}`;

    try {
      const yaEsFavorito = await this.sqlite.isFavorito(user.uid, favoritoString);

      if (yaEsFavorito) {
        await this.sqlite.removeFavorito(user.uid, favoritoString);
      } else {
        await this.sqlite.addFavorito(user.uid, favoritoString);
      }

      center.isFavorite = !yaEsFavorito;
    } catch (error) {
      console.error('Error al guardar favorito:', error);
      alert('Hubo un error al guardar el favorito');
    }
  }

  goToLogin() {
    this.showLoginPopup = false;
    this.router.navigate(['/login']);
  }

  seleccionarCentro(centro: any) {
    this.cita.centroId = centro.id;
    this.cita.centroNombre = centro.name;
    this.cita.origen = 'centro';
  }
}
