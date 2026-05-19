import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})

export class FooterComponent {
  youtube = 'assets/YT.png';
  x = 'assets/tw.png';
  instagram = 'assets/insta.png';
}
