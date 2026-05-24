import { Component, Input, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita';
import { Auth } from '@angular/fire/auth';
import { CrudService } from '../../services/crudService';
import { SqliteService } from '../../services/sqlite';
import { take } from 'rxjs';
import { Capacitor } from '@capacitor/core';
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

  private auth = inject(Auth);
  private cita = inject(CitaService);
  private router = inject(Router);
  private crudService = inject(CrudService);
  private sqlite = inject(SqliteService);
  private cd = inject(ChangeDetectorRef);

  async handleFavoriteClick(event: MouseEvent, center: any) {
    event.preventDefault(); // evitar que el checkbox cambie solo antes de confirmar

    const user = this.auth.currentUser;

    if (!user) {
      this.showLoginPopup = true;
      return;
    }

    const favoritoString = `${center.name} - ${center.sitio} - ${center.precio}`;

    if (Capacitor.isNativePlatform()) {
      try {
        const yaEsFavorito = await this.sqlite.isFavorito(user.uid, favoritoString);
        if (yaEsFavorito) {
          await this.sqlite.removeFavorito(user.uid, favoritoString);
        } else {
          await this.sqlite.addFavorito(user.uid, favoritoString);
        }
        // Actualizar el estado y forzar detección de cambios
        center.isFavorite = !yaEsFavorito;
        this.cd.detectChanges();
      } catch (error) {
        console.error('Error al guardar favorito en SQLite:', error);
        alert('Hubo un error al guardar el favorito');
      }
    } else {
      try {
        this.crudService
          .getWhere<any>('users', 'uid', '==', user.uid)
          .pipe(take(1))
          .subscribe(async (users) => {
            if (users.length === 0) {
              alert('No se encontró tu usuario');
              return;
            }
            const userId = users[0].id;
            const favs: string[] = users[0].favs ?? [];
            const yaEsFavorito = favs.includes(favoritoString);

            if (!yaEsFavorito) {
              await this.crudService.addToArray('users', userId, 'favs', favoritoString);
            } else {
              await this.crudService.removeFromArray('users', userId, 'favs', favoritoString);
            }

            center.isFavorite = !yaEsFavorito;
            this.cd.detectChanges();
          });
      } catch (error) {
        console.error('Error al guardar favorito en Firestore:', error);
        alert('Hubo un error al guardar el favorito');
      }
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
