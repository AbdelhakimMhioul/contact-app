import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

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

  constructor(private auth: Auth, private firestore: Firestore) {
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

  updateProfile() {
    console.log('updateProfile()');
  }
}
