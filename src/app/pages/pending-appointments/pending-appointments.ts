import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PendingAppointment } from '../../components/pending-appointment/pending-appointment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { CrudService } from '../../services/crudService';
import { Auth } from '@angular/fire/auth';
import { AppUser } from '../profile/profile';
import { Subscription } from 'rxjs';
import { NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SqliteService } from '../../services/sqlite';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pending-appointments',
  imports: [PendingAppointment, RouterLink, Header, IonContent, IonButton],
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
  private sqlite = inject(SqliteService);
  private userSub!: Subscription;
  private authUnsub!: () => void;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.titulo = this.route.snapshot.queryParams['titulo'];

    // En Android los favoritos viven en SQLite, no en Firestore
    if (Capacitor.isNativePlatform() && this.titulo === 'Favoritos') {
      this.authUnsub = this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.items = await this.sqlite.getFavoritos(user.uid);
          this.cd.detectChanges();
        }
      });
      return;
    }

    // Web: cargar desde Firestore
    this.authUnsub = this.auth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (user) {
          if (this.userSub) this.userSub.unsubscribe();

          this.userSub = this.crudService
            .getWhere<AppUser>('users', 'uid', '==', user.uid)
            .subscribe((res) => {
              const userData = res[0];
              this.userId = userData.id!;
              console.log('TITULO REAL:', this.titulo);
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
    // En Android los favoritos se borran de SQLite
    if (Capacitor.isNativePlatform() && this.titulo === 'Favoritos') {
      const user = this.auth.currentUser;
      if (!user) return;
      await this.sqlite.removeFavorito(user.uid, item);
      this.items = this.items.filter((i) => i !== item);
      this.cd.detectChanges();
      return;
    }

    // Web: borrar de Firestore
    const field =
      this.titulo === 'Favoritos' ? 'favs' : this.titulo === 'Pendientes' ? 'pendientes' : 'hist';

    await this.crudService.removeFromArray('users', this.userId, field, item);
  }
}
