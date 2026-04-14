import { Routes } from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {AboutUs} from './pages/about-us/about-us';
import {Centers} from './pages/centers/centers';
import {Specialtys} from './pages/specialtys/specialtys';
import {WorkWithUs} from './pages/work-with-us/work-with-us';
import {CenterPage} from './pages/center-page/center-page';
import {ClientsAsist} from './pages/clients-asist/clients-asist';
import {Login} from './pages/login/login';
import {MakeAnAppointment} from './pages/make-an-appointment/make-an-appointment';
import {PendingAppointments} from './pages/pending-appointments/pending-appointments';
import {Profile} from './pages/profile/profile';
import {RegisterEdit} from './pages/register-edit/register-edit';
import {SpecialtyPage} from './pages/specialty-page/specialty-page';


export const routes: Routes = [
  {path: "", component: HomePage},
  {path: "about-us", component: AboutUs},
  {path: "centers", component: Centers},
  {path: "specialtys", component: Specialtys},
  {path: "work-with-us", component: WorkWithUs},
  {path: "center_page", component: CenterPage},
  {path: "client-asist", component: ClientsAsist},
  {path: "login", component: Login},
  {path: "make-an-appointment", component: MakeAnAppointment},
  {path: "pending-appointmens", component: PendingAppointments},
  {path: "profile", component: Profile},
  {path: "register-edit", component: RegisterEdit},
  {path: "specialty-page", component: SpecialtyPage},
];
