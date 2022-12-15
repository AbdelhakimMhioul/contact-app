import { Component } from '@angular/core';
import { ContactAuthService } from './services/contact-auth.service';

interface IPageRoute {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  email?: string;
  isAuthenticated = false;

  public appPages: IPageRoute[] = [];
  constructor(private contactAuthService: ContactAuthService) {
    this.email = this.getUserEmail() || '';
    this.isAuth().subscribe((isAuth) => {
      if (!isAuth) {
        this.isAuthenticated = false;
        this.appPages = [
          {
            title: 'Home',
            url: '/home',
            icon: 'home',
          },
          { title: 'Liste des contacts', url: '/liste-contacts', icon: 'list' },
          {
            title: 'Authentification',
            url: '/authentification',
            icon: 'log-in',
          },
          { title: 'Inscription', url: '/inscription', icon: 'infinite' },
          { title: 'Ajouter contact', url: '/ajouter-contact', icon: 'add' },
        ];
      } else {
        this.isAuthenticated = true;
        this.appPages = [
          {
            title: 'Home',
            url: '/home',
            icon: 'home',
          },
          { title: 'Liste des contacts', url: '/liste-contacts', icon: 'list' },
          { title: 'Ajouter contact', url: '/ajouter-contact', icon: 'add' },
          {
            title: 'Profile',
            url: '/profile',
            icon: 'person',
          },
        ];
      }
    });
  }

  getUserEmail = () => this.contactAuthService.getUser()?.email;

  isAuth = () => this.contactAuthService.isAuth();

  logout = () => this.contactAuthService.logout();
}
