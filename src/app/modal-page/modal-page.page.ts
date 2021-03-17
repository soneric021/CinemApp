import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../api/user.service';
import { ConfirmarOrdenPagePage } from '../confirmar-orden-page/confirmar-orden-page.page';
import { bebidas, comidas, Orden, Pedido } from '../models/Interfaces';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})

export class ModalPagePage implements OnInit {
  pedido:Pedido;
  cantidad:number;

  @Input() modo:number;
  data = [];
  dataselected:Orden[] = [];
  datashowed:Orden[] = [];
  
 
  constructor(public navCtrl: NavController, private storage:Storage, private modalCtrl:ModalController) { }
  
  ngOnInit() {
    this.storage.get("pedido").then(val => {
      if(val == null || val == undefined){
        this.dataselected = [];
      } else{
        this.dataselected = val;
        console.log(this.dataselected);
      
        this.datashowed = this.dataselected.filter(x => x.bought == false);
        console.log(this.datashowed);
      }
    });
  
    if(this.modo == 1){
      this.data.push(...bebidas);
    }else{
      this.data.push(...comidas);
    }
    
  }
  agregarOrden(){
      this.dataselected.push({
        pedido:this.pedido,
        cantidad: this.cantidad, 
        bought:false
      })
      this.storage.set("pedido", this.dataselected);
      this.datashowed = this.dataselected.filter(x => x.bought == false);
      console.log(this.data);
      console.log(this.dataselected);
  }
  async confirmarOrden(){
    this.navCtrl.navigateRoot('confirmar-orden-page');
    this.dismiss()
  }
  showSelectValue(mySelect){
   this.pedido = mySelect;
  }
  deleteItem(value){
    this.datashowed = this.arrayRemove(this.datashowed, value);
    this.dataselected = this.arrayRemove(this.dataselected, value);
    this.storage.set("pedido", this.dataselected);
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}


}
