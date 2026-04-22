import { Component } from '@angular/core';
import {SpecialtyCenter} from '../../components/specialty-center/specialty-center';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CentrosService} from '../../services/centros';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-center-page',
  imports: [
    SpecialtyCenter,
    Footer,
    Header,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './center-page.html',
  styleUrl: './center-page.css',
})
export class CenterPage {
  center: any;

  constructor(
    private route: ActivatedRoute,
    private centersService: CentrosService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.centersService.getCenterById(id).subscribe(center => {
        this.center = center;
      });}
  }
}
