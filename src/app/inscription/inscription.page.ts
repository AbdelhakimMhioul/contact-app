import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { ContactAuthService } from '../services/contact-auth.service';
import { AvatarService } from './../services/avatar.service';
import { ContactAccessService } from './../services/contact-access.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
})
export class InscriptionPage {
  inscriptionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactAuthService: ContactAuthService,
    private contactAccessService: ContactAccessService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
      image: [''],
    });
  }

  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.contactAuthService.register(
      this.inscriptionForm.value
    );

    const contact = await this.contactAccessService.addCompte({
      nom: this.getNom(),
      prenom: this.getPrenom(),
      email: this.getEmail(),
      password: this.getPassword(),
      phone: this.getPhone(),
      image: this.getImage(),
    });

    console.log(contact);

    loading.dismiss();

    user !== null
      ? this.navCtrl.navigateForward('/authentification', { replaceUrl: true })
      : this.contactAuthService.showAlert(
          'Erreur',
          'Email ou mot de passe incorrect'
        );
  }

  async chooseBetweenCameraOrGallery() {
    if (this.inscriptionForm.valid) {
      const alert = await this.alertController.create({
        header: 'Choix',
        message: 'Voulez-vous prendre une photo ou choisir une image ?',
        buttons: [
          {
            text: 'Prendre une photo',
            handler: async () => await this.captureProfileImage(),
          },
          {
            text: 'Choisir une image',
            handler: async () => await this.changeProfileImage(),
          },
        ],
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veuillez remplir tous les champs',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async changeProfileImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (image) {
      const loading = await this.loadingController.create({
        message: 'Chargement...',
      });
      await loading.present();

      const result = await this.avatarService.uploadProfileImage(
        image,
        this.inscriptionForm.get('email')?.value
      );
      await this.register();
      loading.dismiss();

      if (result) {
        this.inscriptionForm.patchValue({ image: result });
      } else {
        const alert = await this.alertController.create({
          header: 'Erreur',
          message: "Une erreur est survenue lors du chargement de l'image",
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  async captureProfileImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    if (image) {
      const loading = await this.loadingController.create({
        message: 'Chargement...',
      });
      await loading.present();

      const result = await this.avatarService.uploadProfileImage(
        image,
        this.inscriptionForm.get('email')?.value
      );
      loading.dismiss();

      if (result) {
        this.inscriptionForm.patchValue({ image: result });
      } else {
        const alert = await this.alertController.create({
          header: 'Erreur',
          message: "Une erreur est survenue lors du chargement de l'image",
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
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

  getImage() {
    return this.inscriptionForm.get('image')?.value;
  }

  login() {
    this.navCtrl.navigateForward('/authentification', { replaceUrl: true });
  }
}
