import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LostItemService } from '../../app/sdk/custom/lostitems.service';
import { ModalController } from '@ionic/angular';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-addnewlostitems',
  templateUrl: './addnewlostitems.component.html',
  styleUrls: ['./addnewlostitems.component.scss'],
})
export class AddnewlostitemsComponent implements OnInit {
  lostitem: any;

  constructor( private lostitemService: LostItemService,
               private modalCtrl: ModalController,
               private formBuilder: FormBuilder,
               private toastController: ToastController
  ) {}

  addNewLostItemForm: FormGroup;
  loading = false;

  @Input() lostitems;
  ngOnInit() {
    console.log(this.lostitems);
    this.formInitializer();
    if (this.lostitems) {
      console.log('got lostitem', this.lostitems);
      this.addNewLostItemForm.patchValue(this.lostitems);
    }
  }

  formInitializer() {
    this.addNewLostItemForm = this.formBuilder.group({
      _id: [null],
      item_name: [null, [Validators.required]],
      location: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
      is_deleted: [false, [Validators.required]],
      image_url: ['']
    });
  }

  save() {
    this.loading = true;

    if(this.lostitem){
       this.updatelostitem();
    } else{
      this.addNew();
    }


  }
  addNew() {
    this.lostitemService.addNewLostItem(this.addNewLostItemForm.value).subscribe(
      async data => {
        console.log('got response from server', data);
        const name = this.addNewLostItemForm.controls.item_name.value;
        const toast = await this.toastController.create({
          message: `${name} has been added successfully.`,
          duration: 3500
        });
        toast.present();
        this.loading = false;
        this.addNewLostItemForm.reset();
        // optional
        this.modalCtrl.dismiss();
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }
  updatelostitem(){
    this.lostitemService.updatelostitem(this.addNewLostItemForm.value).subscribe (
      async data => {
        console.log('got response from server', data);
        const name = this.addNewLostItemForm.controls.item_name.value;
        const toast = await this.toastController.create({
          message: `${name} has been updated successfully.`,
          duration: 3500
        });
        toast.present();
        this.loading = false;
        this.addNewLostItemForm.reset();
        this.modalCtrl.dismiss();
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }


  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
// Intefacing is Optional

interface LostItems {
  item_name: string;
  location: string;
  description: string;
  date: string;
  image_url: string;
  is_deleted: boolean;
}