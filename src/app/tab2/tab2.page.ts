import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  tickets = [];
  message:string;
  
  constructor(public storage:Storage, private navCtrl:NavController) {}

  ngOnInit(){
    this.storage.get('tickets').then(val => val == null || val == undefined ? this.tickets : this.tickets = this.fillArray(val, val.cantidad) );
    if(this.tickets.length == 0){
      this.message = "No hay Tickets comprados todavia"
    }
  }

  fillArray(value, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      arr.push(value);
    }
    return arr;
  }
  goToCancelar(){
    this.navCtrl.navigateRoot('cancelar-orden');
  }

}
