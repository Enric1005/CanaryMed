import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { CitaService } from '../../services/cita';
import {getAuth} from '@angular/fire/auth';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth';
import {CrudService} from '../../services/crudService';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  @Input() center: any;
  showLoginPopup = false

  constructor(private cita: CitaService, private router: Router, private auth: AuthService, private crudService: CrudService,
  ) {}


  handleFavoriteClick(event: MouseEvent, center: any) {
    const user = getAuth().currentUser;

    if (!user) {
      event.preventDefault();
      this.showLoginPopup = true;
      return;
    } else {
      const favoritoString = `${center.name} - ${this.center.sitio} - ${this.center.precio}`;
      try {
        this.crudService.getWhere<any>('users', 'uid', '==', user.uid)
          .subscribe(async (users) => {
            if (users.length === 0) {
              alert('No se encontró tu usuario');
              return;
            }
            const userId = users[0].id;
            await this.crudService.addToArray('users', userId, 'favs', favoritoString);
          });
      } catch (error) {
        console.error('Error al guardar su centro como favorito:', error);
        alert('Hubo un error al guardar su centro como favorito');
      }
    }
    center.isFavorite = !center.isFavorite;
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
