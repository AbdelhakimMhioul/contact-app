import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ContactAuthService } from '../services/contact-auth.service';
import { ContactAccessService } from './../services/contact-access.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage {
  inscriptionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactAuthService: ContactAuthService,
    private contactAccessService: ContactAccessService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private firestore: Firestore
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
    });
  }

  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.contactAuthService.register(
      this.inscriptionForm.value
    );

    await this.contactAccessService.addCompte({
      nom: this.getNom(),
      prenom: this.getPrenom(),
      email: this.getEmail(),
      password: this.getPassword(),
      phone: this.getPhone(),
    });

    loading.dismiss();

    user !== null
      ? this.navCtrl.navigateForward('/authentification', { replaceUrl: true })
      : this.contactAuthService.showAlert(
          'Erreur',
          'Email ou mot de passe incorrect'
        );
  }

  getNom() {
    return this.inscriptionForm.get('nom')?.value;
  }

  getPrenom() {
    return this.inscriptionForm.get('prenom')?.value;
  }

  getEmail() {
    return this.inscriptionForm.get('email')?.value;
  }

  getPassword() {
    return this.inscriptionForm.get('password')?.value;
  }

  getPhone() {
    return this.inscriptionForm.get('phone')?.value;
  }

  login() {
    this.navCtrl.navigateForward('/authentification', { replaceUrl: true });
  }
}
