import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AvatarService } from '../services/avatar.service';

export interface Profile {
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  profile: Profile = {
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    image: '',
  };

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private avatarService: AvatarService
  ) {
    this.getUserProfile();
  }

  async getUserProfile() {
    const user = this.auth.currentUser;
    if (user) {
      const userRef = collection(this.firestore, 'comptes');
      const q = query(userRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.profile = doc.data() as Profile;
      });
    }
  }

  async chooseBetweenCameraOrGallery() {
    const alert = await this.alertController.create({
      header: "Changer l'image de profil",
      message: 'Choisissez une option',
      buttons: [
        {
          text: 'Galerie',
          handler: () => {
            this.changeProfileImage();
          },
        },
        {
          text: 'Appareil photo',
          handler: () => {
            this.captureProfileImage();
          },
        },
      ],
    });

    await alert.present();
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
        this.auth.currentUser?.email || ''
      );
      loading.dismiss();

      if (result) {
        this.profile.image = result;
      } else {
        const alert = await this.alertController.create({
          header: 'Erreur',
          message: "Une erreur est survenue lors du chargement de l'image",
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
    // await alert.onDidDismiss().then(() => {
    //   window.location.reload();
    // });
  }

  async updateProfile() {
    const user = this.auth.currentUser;
    const userRef = collection(this.firestore, 'comptes');
    const q = query(userRef, where('email', '==', user?.email));

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          nom: this.profile.nom,
          prenom: this.profile.prenom,
          phone: this.profile.phone,
          email: this.profile.email,
        });
      });
    });

    const alert = await this.alertController.create({
      header: 'Profile mis à jour',
      message: 'Votre profile a été mis à jour avec succès',
      buttons: ['OK'],
    });

    await alert.present();
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
        this.auth.currentUser?.email || ''
      );
      loading.dismiss();

      if (result) {
        this.profile.image = result;
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
}
