import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import { CrudService } from '../../services/crudService';
import { AppUser } from '../../pages/profile/profile';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-appointment',
  templateUrl: './pending-appointment.html',
  styleUrl: './pending-appointment.css',
})

export class PendingAppointment implements OnInit, OnDestroy {
  @Input() item: any;
  @Input() titulo: string = '';
  @Output() delete = new EventEmitter<any>();

  user!: AppUser & { id: string };
  private authUnsub!: () => void;
  subscription!: Subscription;

  constructor(
    private crudService: CrudService,
    private auth: Auth,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.authUnsub = this.auth.onAuthStateChanged(user => {
      if (user) {
        this.subscription = this.crudService
          .getWhere<AppUser>('users', 'uid', '==', user.uid)
          .subscribe((res: any[]) => {
            const doc = res[0];
            this.user = {
              ...doc.data,
              id: doc.id
            };
            this.cd.detectChanges();
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.authUnsub) this.authUnsub();
  }

  async removeItem() {
    if (!this.user?.id || !this.item) return;

    if (this.titulo === "Favoritos") {
      try {
        await this.crudService.removeFromArray(
          'users',
          this.user.id,
          'favs',
          this.item
        );
        this.delete.emit(this.item);

      } catch (err) {
        console.error('Error eliminando favorito:', err);
      }
    }
    else if (this.titulo === "Pendientes") {
      try {
        await this.crudService.removeFromArray(
          'users',
          this.user.id,
          'pendientes',
          this.item
        );
        this.delete.emit(this.item);
      }
      catch (err) {
        console.error('Error eliminando cita pendiente:', err);
      }
    }
  }
}
