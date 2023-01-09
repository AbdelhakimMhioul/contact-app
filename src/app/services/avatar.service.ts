import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  async uploadImage(cameraFile: Photo, id: string) {
    const user = this.auth.currentUser;
    const filePath = `avatars/contacts/${user?.uid}.png`;
    const fileRef = ref(this.storage, filePath);
    try {
      await uploadString(fileRef, cameraFile.base64String!, 'base64');
      const imageUrl = await getDownloadURL(fileRef);

      const userDoc = doc(this.firestore, 'contacts/' + id);
      await setDoc(userDoc, { src: imageUrl }, { merge: true });

      return imageUrl;
    } catch (error) {
      return null;
    }
  }

  async uploadProfileImage(cameraFile: Photo, email: string) {
    const user = this.auth.currentUser;
    const filePath = `avatars/comptes/${user?.uid}.png`;
    const fileRef = ref(this.storage, filePath);
    try {
      await uploadString(fileRef, cameraFile.base64String!, 'base64');
      const imageUrl = await getDownloadURL(fileRef);

      const userDoc = doc(this.firestore, 'comptes/' + email);
      await setDoc(userDoc, { image: imageUrl }, { merge: true });

      return imageUrl;
    } catch (error) {
      return null;
    }
  }
}
