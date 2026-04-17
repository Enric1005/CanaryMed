import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logo = 'LOR';

  socialLinks: {
    url: string;
    icon: string;
  }[] = [];

  sections: {
    title: string;
    links: {
      text: string;
      url: string;
    }[];
  }[] = [];

  constructor() {}

  ngOnInit(): void {
    const DATA = this.getMockData();
    this.loadFooter(DATA);
  }

  private loadFooter(DATA: any): void {
    const footer = DATA.footer;
    this.logo = footer.logo;

    this.socialLinks = footer.logos.map((logo: any) => ({
      url: logo.url,
      icon: logo.icon
    }));

    this.sections = footer.titulos_nav.map((section: any) => ({
      title: section.name,
      links: section.navs.map((nav: any) => ({
        text: nav.nav,
        url: nav.src
      }))
    }));
  }

  private getMockData() {
    return {
      footer: {
        logo: 'LOR',
        logos: [
          { url: 'https://instagram.com', icon: 'assets/ig.png' },
          { url: 'https://facebook.com', icon: 'assets/fb.png' },
          { url: 'https://x.com', icon: 'assets/x.png' }
        ],
        titulos_nav: [
          {
            name: 'Sección 1',
            navs: [
              { nav: 'Inicio', src: '/home' },
              { nav: 'Servicios', src: '/services' }
            ]
          },
          {
            name: 'Sección 2',
            navs: [
              { nav: 'Contacto', src: '/contact' },
              { nav: 'Ayuda', src: '/help' }
            ]
          },
          {
            name: 'Sección 3',
            navs: [
              { nav: 'Legal', src: '/legal' },
              { nav: 'Privacidad', src: '/privacy' }
            ]
          }
        ]
      }
    };
  }
}
