import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { CitaService } from '../../services/cita';
import {getAuth} from '@angular/fire/auth';
import {CrudService} from '../../services/crudService';
import {take} from 'rxjs';
import {
  IonCard, IonCardContent, IonCardTitle, IonCardSubtitle,
  IonButton, IonText, IonModal,
  IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [FormsModule, RouterLink,
    IonCard, IonCardContent, IonCardTitle, IonCardSubtitle,
    IonButton, IonText, IonModal,
    IonHeader, IonToolbar, IonTitle, IonContent
  ],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  @Input() center: any;
  showLoginPopup = false;

  constructor(private cita: CitaService, private router: Router, private crudService: CrudService) {}

  handleFavoriteClick(event: MouseEvent, center: any) {
    const user = getAuth().currentUser;

    if (!user) {
      event.preventDefault();
      this.showLoginPopup = true;
      return;
    }

    const favoritoString = `${center.name} - ${this.center.sitio} - ${this.center.precio}`;
    try {
      this.crudService.getWhere<any>('users', 'uid', '==', user.uid)
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
        });
    } catch (error) {
      console.error('Error al guardar su centro como favorito:', error);
      alert('Hubo un error al guardar su centro como favorito');
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
