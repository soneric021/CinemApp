import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from "../modal-page/modal-page.page";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  
  items = [];
  tickets = [];
  constructor(private modalCtrl: ModalController) {
    this.items = [{ src: 'assets/008-popcorn.png', text: 'Agrega un bocao' }];
    this.tickets = [{src: 'assets/003-tickets.png', title: 'Avengers End-Game', time: '4:00 P.M. - 7:00 P.M.'},
    {src: 'assets/003-tickets.png', title: 'Avengers End-Game', time: '4:00 P.M. - 7:00 P.M.'},
    {src: 'assets/003-tickets.png', title: 'Avengers End-Game', time: '4:00 P.M. - 7:00 P.M.'}]
    
  }
  async OpenModel(modo){
    const presentModel = await this.modalCtrl.create({
      component: ModalPagePage,
      componentProps: {
        modo:modo
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'change-address-shipping-modal'
    });

    presentModel.onWillDismiss().then((data)=>{
      console.log(data);
      //custom code
    });

    return await presentModel.present();
  }
  
}
