import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactAuthService {
  constructor(
    private auth: Auth,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async login(value: any) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        value.email,
        value.password
      );
      return user;
    } catch (error) {
      return null;
    }
  }

  async register(value: any) {
    console.log('value', value);
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        value.email,
        value.password
      );
      await updateProfile(user.user, {
        displayName: value.nom + ' ' + value.prenom,
        phoneNumber: value.phone,
      } as User);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout = () => {
    signOut(this.auth);
    this.navCtrl.navigateForward('/authentification', { replaceUrl: true });
  };

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  getUser() {
    return this.auth.currentUser;
  }

  isAuth(): Observable<boolean> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }
}
