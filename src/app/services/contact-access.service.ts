import { Injectable, OnInit } from '@angular/core';
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
export class ContactAccessService implements OnInit {
  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit() {}

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

  async getContacts(shared = false): Promise<Observable<Contact[]>> {
    const user = this.auth.currentUser;
    const contactsRef = collection(this.firestore, 'contacts');
    let contacts: Contact[] = [];
    let q;

    if (user) {
      q = query(
        contactsRef,
        where('compte_email', '==', doc(this.firestore, 'comptes', user!.uid))
      );
    } else {
      q = query(contactsRef, where('shared', '==', shared));
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      contacts.push({
        id: doc.id,
        ...doc.data(),
      } as Contact as Contact);
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

  updateContactById(id: string, contact: Contact) {
    const contactRef = doc(this.firestore, 'contacts', id);
    return setDoc(contactRef, contact);
  }

  updateCompteById(id: string, contact: Contact) {
    const contactRef = doc(this.firestore, 'contacts', id);
    return setDoc(contactRef, contact);
  }

  deleteContactById(id: string) {
    const contactRef = doc(this.firestore, 'contacts', id);
    return deleteDoc(contactRef);
  }

  deleteCompteById(id: string) {
    const contactRef = doc(this.firestore, 'contacts', id);
    return deleteDoc(contactRef);
  }
}
