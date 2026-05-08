import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crudService';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {
  IonHeader, IonContent, IonFooter, IonItem, IonLabel,
  IonTextarea, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-clients-asist',
  imports: [FormsModule, CommonModule, Header, Footer,
    IonHeader, IonContent, IonFooter, IonItem, IonLabel,
    IonTextarea, IonButton
  ],
  templateUrl: './clients-asist.html',
  styleUrl: './clients-asist.css',
})
export class ClientsAsist {
  private crud = inject(CrudService);
  private router = inject(Router);

  consulta = '';
  cargando = false;

  async enviar() {
    if (!this.consulta.trim()) return;

    this.cargando = true;
    try {
      await this.crud.add('quejas', {
        texto: this.consulta.trim(),
        fecha: new Date().toISOString(),
      });
      this.router.navigate([""]);
    } catch (e) {
      console.error('Error al guardar:', e);
    } finally {
      this.cargando = false;
    }
  }
}
