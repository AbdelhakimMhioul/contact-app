import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage {
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactAuthService: ContactAuthService,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getEmail() {
    return this.authForm.get('email')?.value;
  }
  getPassword() {
    return this.authForm.get('password')?.value;
  }

  async login() {
    const user = await this.contactAuthService.login(this.authForm.value);

    user !== null
      ? this.router.navigateByUrl('/profile', { replaceUrl: true })
      : this.contactAuthService.showAlert(
          'Erreur',
          'Email ou mot de passe incorrect'
        );
  }

  register() {
    this.navCtrl.navigateForward('/inscription', { replaceUrl: true });
  }
}
