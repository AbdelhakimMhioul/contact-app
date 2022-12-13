import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Compte from 'src/interfaces/Compte';
import Contact from 'src/interfaces/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactAccessService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  getComptes(): Observable<Compte[]> {
    const comptesRef = collection(this.firestore, 'comptes');
    return collectionData(comptesRef, {
      idField: 'id',
    }) as unknown as Observable<Compte[]>;
  }

  getCompteById(id: string): Observable<Compte> {
    const compteRef = doc(this.firestore, 'comptes', id);
    return docData(compteRef, {
      idField: 'id',
    }) as unknown as Observable<Compte>;
  }

  async getContacts(): Promise<Observable<Contact[]>> {
    const user = this.auth.currentUser;
    const contactsRef = collection(this.firestore, 'contacts');
    const q = query(
      contactsRef,
      where('compte_email', '==', doc(this.firestore, 'comptes', user!.uid))
    );
    const querySnapshot = await getDocs(q);
    let contacts: Contact[] = [];
    querySnapshot.forEach((doc) => {
      contacts.push(doc.data() as Contact);
    });
    return new Observable((observer) => {
      observer.next(contacts);
    });
  }

  getContactById(id: string): Observable<Contact> {
    const contactRef = doc(this.firestore, 'contacts', id);
    return docData(contactRef, {
      idField: 'id',
    }) as unknown as Observable<Contact>;
  }

  addContact(contact: Contact) {
    const contactsRef = collection(this.firestore, 'contacts');
    return addDoc(contactsRef, contact);
  }

  addCompte(compte: Compte) {
    const comptesRef = collection(this.firestore, 'comptes');
    return addDoc(comptesRef, compte);
  }

  updateCompteById(id: string, contact: Contact) {
    const contactRef = doc(this.firestore, 'contacts', id);
    return setDoc(contactRef, contact);
  }

  deleteCompteById(id: string) {
    const contactRef = doc(this.firestore, 'contacts', id);
    return deleteDoc(contactRef);
  }
}
