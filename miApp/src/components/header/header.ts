import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {Auth, getAuth} from '@angular/fire/auth';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLink, FormsModule]
})
export class Header implements OnInit, OnDestroy {

  centros: any[] = [];
  especialidades: any[] = [];
  resultados: any[] = [];

  searchText: string = '';
  selectedItem: any = null;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private firestore: Firestore, private auth: Auth, private cd: ChangeDetectorRef) {}

  private authUnsub!: () => void;

  async ngOnInit() {
    this.authUnsub = this.auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
      this.cd.detectChanges();
    });
    await this.cargarDatos();
  }

  ngOnDestroy() {
    if (this.authUnsub) this.authUnsub();
  }

  goToProfile() {
    const user = getAuth().currentUser;

    if (user) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  async cargarDatos() {
    const centrosSnap = await getDocs(collection(this.firestore, 'centers'));
    this.centros = centrosSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      type: 'center'
    }));

    const especialidadesSnap = await getDocs(collection(this.firestore, 'specialities'));
    this.especialidades = especialidadesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      type: 'speciality'
    }));
  }

  onSearch() {
    const texto = this.searchText.toLowerCase();

    this.resultados = [
      ...this.centros.filter(c => c.name?.toLowerCase().includes(texto)),
      ...this.especialidades.filter(e => e.name?.toLowerCase().includes(texto))
    ];
  }

  selectItem(item: any) {
    this.searchText = item.name;
    this.selectedItem = item;
    this.resultados = [];
  }

  buscar() {
    if (!this.selectedItem && this.resultados.length > 0) {
      this.selectedItem = this.resultados[0];
    }

    if (!this.selectedItem) return;

    if (this.selectedItem.type === 'center') {
      this.router.navigate(['/center_page', this.selectedItem.id]);
    }

    if (this.selectedItem.type === 'speciality') {
      this.router.navigate(['/specialty_page', this.selectedItem.id]);
    }
  }

  menuAbierto = false;
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}
