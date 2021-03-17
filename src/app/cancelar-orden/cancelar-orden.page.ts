import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cancelar-orden',
  templateUrl: './cancelar-orden.page.html',
  styleUrls: ['./cancelar-orden.page.scss'],
})
export class CancelarOrdenPage implements OnInit {
  data = [];
  total;
  cantidad;
  constructor(public storage:Storage, private navCtrl:NavController) { }

  ngOnInit() {
    this.storage.get('pedido').then(val => this.data = val);
    this.storage.get('tickets').then(val => {
      this.data.push(  {
        pedido:val,
        cantidad:val.cantidad
      });
      this.cantidad = val.cantidad;
      this.total = this.data.map(x => x.pedido.price * x.cantidad).reduce((a,b) => a+b);
    });
  }
  cancelarTickets(){
    this.storage.set('pedido', []);
    this.storage.set('tickets', {});
    this.navCtrl.navigateBack('tabs/tab2');
  }

}
