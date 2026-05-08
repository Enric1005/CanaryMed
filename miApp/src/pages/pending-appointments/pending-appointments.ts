import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PendingAppointment} from '../../components/pending-appointment/pending-appointment';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Header} from '../../components/header/header';
import {CrudService} from '../../services/crudService';
import {Auth} from '@angular/fire/auth';
import {AppUser} from '../profile/profile';
import {Subscription} from 'rxjs';
import {NgZone} from '@angular/core';

@Component({
  selector: 'app-pending-appointments',
  imports: [PendingAppointment, RouterLink, Header],
  templateUrl: './pending-appointments.html',
  styleUrl: './pending-appointments.css',
})
export class PendingAppointments implements OnInit, OnDestroy {

  titulo: string = '';
  items: string[] = [];
  userId: string = '';

  private crudService = inject(CrudService);
  private cd = inject(ChangeDetectorRef);
  private auth = inject(Auth);
  private ngZone = inject(NgZone);
  private userSub!: Subscription;
  private authUnsub!: () => void;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.titulo = this.route.snapshot.queryParams['titulo'];

    this.authUnsub = this.auth.onAuthStateChanged(user => {
      this.ngZone.run(() => {
        if (user) {
          if (this.userSub) this.userSub.unsubscribe();

          this.userSub = this.crudService
            .getWhere<AppUser>('users', 'uid', '==', user.uid)
            .subscribe(res => {
              const userData = res[0];
              this.userId = userData.id!;

              // Carga el array correcto según el título
              if (this.titulo === 'Favoritos') this.items = userData.favs ?? [];
              else if (this.titulo === 'Pendientes') this.items = userData.pendientes ?? [];
              else if (this.titulo === 'Historial') this.items = userData.hist ?? [];

              this.cd.detectChanges();
            });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.authUnsub) this.authUnsub();
  }

  async deleteItem(item: string) {
    const field =
      this.titulo === 'Favoritos' ? 'favs' :
        this.titulo === 'Pendientes' ? 'pendientes' : 'hist';

    await this.crudService.removeFromArray('users', this.userId, field, item);
  }
}
