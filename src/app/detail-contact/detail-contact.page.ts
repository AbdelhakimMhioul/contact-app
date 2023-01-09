import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  EmailComposer,
  EmailComposerOptions,
} from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {
  AlertController,
  IonModal,
  LoadingController,
  NavParams,
} from '@ionic/angular';
import Contact from 'src/interfaces/Contact';
import { AvatarService } from '../services/avatar.service';
import { ContactAccessService } from './../services/contact-access.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
  providers: [NavParams],
})
export class DetailContactPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  contact: Contact = {
    id: '',
    nom: '',
    prenom: '',
    phone: '',
    email: '',
    src: '',
    service: ' ',
    adresse: '',
    ville: '',
    compte_email: '',
    shared: false,
  };
  name: string = this.contact.nom + ' ' + this.contact.prenom;
  subject: string = '';
  message: string = '';

  constructor(
    private router: Router,
    private contactAccessService: ContactAccessService,
    private loadingController: LoadingController,
    private avatarService: AvatarService,
    private alertController: AlertController,
    private emailComposer: EmailComposer,
    private socialSharing: SocialSharing
  ) // private geolocation: Geolocation
  {}

  ionViewWillEnter() {}

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    if (routerState) {
      const contactId = routerState['id'];
      this.contactAccessService
        .getContactById(contactId)
        .subscribe((contact) => (this.contact = contact));
    }
  }

  updateContact(contact: Contact) {
    this.contactAccessService
      .updateContactById(contact.id || '0', contact)
      .then(() =>
        this.router.navigate(['/liste-contacts'], { replaceUrl: true })
      )
      .catch((error) => console.log(error));
  }

  deleteContact(contact: Contact) {
    this.contactAccessService
      .deleteContactById(contact.id || '0')
      .then(() => {
        this.router.navigate(['/home'], { replaceUrl: true });
      })
      .catch((error) => console.log(error));
  }

  async changeImage(id = '') {
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

      const result = await this.avatarService.uploadImage(image, id);
      loading.dismiss();

      if (result) {
        this.contact.src = result;
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.modal.dismiss(this.contact, 'confirm');

    const email: EmailComposerOptions = {
      app: 'gmail',
      to: this.contact.email,
      subject: this.subject,
      body: this.message,
      isHtml: true,
    };

    await this.emailComposer.open(email);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  shareLocation() {
    this.socialSharing.share(
      this.contact.adresse + ' ' + this.contact.ville,
      'Localisation'
    );
  }

  shareContact() {
    this.socialSharing
      .shareWithOptions({
        message:
          'Bonjour , \n je suis ' +
          this.contact.nom +
          ' ' +
          this.contact.prenom +
          ' \n et voici mon téléphone ' +
          this.contact.phone +
          ' et mon email ' +
          this.contact.email +
          '\nCordialement',
        chooserTitle: 'Mon contact ',
      })
      .then((res) => {
        console.log('res => ' + res);
      })
      .catch((e) => {
        console.log('e => ' + e);
      });
  }

  localisationAndSendItByWhatsapp() {
    // this.geolocation
    //   .getCurrentPosition()
    //   .then((resp) => {
    //     const localisationCoordinates =
    //       resp.coords.latitude.toString() +
    //       ',' +
    //       resp.coords.longitude.toString();
    //     //
    //     this.socialSharing
    //       .shareViaWhatsAppToReceiver(
    //         this.contact.phone,
    //         'Ma localisation est  \n  ' +
    //           'https://www.google.com/maps/@' +
    //           localisationCoordinates
    //       )
    //       .then(() => {
    //         // Success!
    //       })
    //       .catch(() => {
    //         // Error!
    //       });
    //   })
    //   .catch((error) => {
    //     console.log('Error getting location', error);
    //   });
  }
}
