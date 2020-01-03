import { Component, OnInit } from '@angular/core';
import { LostItemService } from '../../app/sdk/custom/lostitems.service';
import { AlertController, ModalController } from '@ionic/angular';
import {AddnewlostitemsComponent} from '../addnewlostitems/addnewlostitems.component';
@Component({
  selector: 'app-lostitems',
  templateUrl: './lostitems.page.html',
  styleUrls: ['./lostitems.page.scss'],
})
export class LostitemsPage implements OnInit {

  loading = false;
  lostitems: LostItems[] = [];
  deleteLoading = false;
  selectedLostItem: LostItems;
  constructor(private lostitemService: LostItemService, private modalController: ModalController,
              private alertController: AlertController) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;

    this.lostitemService.getAllLostItems().subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
        this.lostitems = data.data.docs;
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }
  async delete(lostitems) {
    this.selectedLostItem = lostitems;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete the book "${lostitems.item_name}"`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteLostitem();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteLostitem() {
    this.deleteLoading = true;
    this.lostitemService.deletelostitem(this.selectedLostItem._id).subscribe(
      data => {
        console.log('got response from server', data);
        this.deleteLoading = false;
        this.getAll();
      },
      error => {
        this.deleteLoading = false;
        console.log('error', error);
      }
    );
  }

  openEditPopup(lostitems: LostItems) {
    console.log('lostitems ', lostitems);
    this.openAddModal(lostitems);
  }

  async openAddModal(lostitems?: LostItems ) {

    const modal = await this.modalController.create({
      component: AddnewlostitemsComponent,
      componentProps: { lostitems }
    });
    modal.onDidDismiss().then(data => {
      console.log('dismissed', data);
      this.getAll();
    });
    await modal.present();
  }
}

// Intefacing is Optional

interface LostItems {
  _id: string;
  item_name: string;
  location: string;
  description: string;
  date: string;
  image_url: string;
  is_deleted: boolean;
}
