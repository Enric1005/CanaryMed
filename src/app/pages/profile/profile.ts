import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Header } from '../../components/header/header';
import { ProfileSection } from '../../components/profile-section/profile-section';
import { Router, RouterLink } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { CrudService } from '../../services/crudService';
import {ChangeDetection} from '@angular/cli/lib/config/workspace-schema';

interface AppUser {
  id?: string;
  name: string;
  surname: string;
  email: string;
  DNI: string;
  phoneNumber: string;
  role: 'paciente' | 'empresa' | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Header, ProfileSection, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, OnDestroy {

  user!: AppUser;
  subscription!: Subscription;

  private crudService = inject(CrudService);
  private cd = inject(ChangeDetectorRef)

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {

        this.subscription = this.crudService
          .getWhere<AppUser>("users", "email", "==", user.email)
          .subscribe(res => {
            this.user = res[0];
            this.cd.detectChanges();
          });

      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}
