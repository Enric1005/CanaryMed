import { Routes } from '@angular/router';

import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { RegisterEdit } from './pages/register-edit/register-edit';
import { Centers } from './pages/centers/centers';
import { CenterPage } from './pages/center-page/center-page';
import { Specialtys } from './pages/specialtys/specialtys';
import { SpecialtyPage } from './pages/specialty-page/specialty-page';
import { AboutUs } from './pages/about-us/about-us';
import { WorkWithUs } from './pages/work-with-us/work-with-us';
import { MakeAnAppointment } from './pages/make-an-appointment/make-an-appointment';
import { PendingAppointments } from './pages/pending-appointments/pending-appointments';
import { ClientsAsist } from './pages/clients-asist/clients-asist';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'register-edit', component: RegisterEdit },
  { path: 'centers', component: Centers },
  { path: 'center_page/:id', component: CenterPage },
  { path: 'specialtys', component: Specialtys },
  { path: 'specialty_page/:id', component: SpecialtyPage },
  { path: 'about-us', component: AboutUs },
  { path: 'work-with-us', component: WorkWithUs },
  { path: 'make-an-appointment', component: MakeAnAppointment },
  { path: 'pending-appointments', component: PendingAppointments },
  { path: 'clients-asist', component: ClientsAsist },
];
