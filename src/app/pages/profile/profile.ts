import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Header } from '../../components/header/header';
import { ProfileSection } from '../../components/profile-section/profile-section';
import { Router, RouterLink } from '@angular/router';
import {Auth, deleteUser, signOut} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { CrudService } from '../../services/crudService';
import {LoadingSpinner} from '../../components/loading-spinner/loading-spinner';

export interface AppUser {
  id?: string;
  uid?: string;
  name: string;
  surname: string;
  email: string;
  DNI: string;
  phoneNumber: string;
  role: 'Paciente' | 'Empresa' | null;
  favs: [],
  pendientes: [],
  hist: []
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Header, ProfileSection, RouterLink, LoadingSpinner],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, OnDestroy {

  user!: AppUser;
  userLoaded = false;
  subscription!: Subscription;
  private authUnsub!: () => void;

  private crudService = inject(CrudService);
  private cd = inject(ChangeDetectorRef);

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.authUnsub = this.auth.onAuthStateChanged(user => {
      if (user) {
        this.subscription = this.crudService
          .getWhere<AppUser>("users", "uid", "==", user.uid)
          .subscribe(res => {
            this.user = res[0];
            this.userLoaded = true;
            this.cd.detectChanges();
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.authUnsub) this.authUnsub();
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  async deleteMode() {
    if (!this.user.id) {
      alert("No se encontró al usuario");
      return;
    }

    const confirmado = confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (!confirmado) return;

    try {
      const user = this.auth.currentUser;
      if (user) {
        if (this.subscription) this.subscription.unsubscribe();
        if (this.authUnsub) this.authUnsub();
        await this.crudService.delete("users", this.user.id);
        await deleteUser(user);
      }
      alert("Cuenta eliminada correctamente");
      await this.router.navigate(['/login']);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/requires-recent-login':
          alert("Sesión expirada, vuelve a iniciar sesión antes de eliminar la cuenta");
          break;
        default:
          alert("Error: " + error.message);
      }
    }
  }
}
