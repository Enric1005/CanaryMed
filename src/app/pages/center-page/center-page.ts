import {Component, Input, input, OnDestroy, OnInit} from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { setLogLevel, LogLevel } from "@angular/fire";
import {CommonModule} from '@angular/common';
import {map, Observable} from 'rxjs';
import {CentrosService} from '../../services/centros';
import { SpecialtyCenter } from '../../components/specialty-center/specialty-center';
import {LoadingSpinner} from '../../components/loading-spinner/loading-spinner';

setLogLevel(LogLevel.VERBOSE);

@Component({
  selector: 'app-center-page',
  imports: [
    Footer,
    Header,
    CommonModule,
    SpecialtyCenter,
    RouterLink,
    LoadingSpinner
  ],
  templateUrl: './center-page.html',
  styleUrl: './center-page.css',
})
export class CenterPage implements OnInit, OnDestroy {
  centro$!: Observable<any>;

  constructor(private centroService: CentrosService, private route: ActivatedRoute) {
  }

  private sub: any;

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.centro$ = this.centroService.getCenterById(id);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }




}
