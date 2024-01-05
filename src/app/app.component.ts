import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dados';
  
  numero1: number = 1;
  numero2: number = 2;
  dadoIzquierda = '../assets/img/dice1.png'
  dadoDerecha = '../assets/img/dice5.png'

  // dadoIzquierda = '../assets/img/dice1.png';
  // dadoIzquierda = '../assets/img/dice' + this.numero1 + '.png';
  // dadoIzquierda = `../assets/img/dice${this.numero1}.png`;

  
  //  crear funcion random para que de por resultado entre 1-6
  tirarDados() {
  // throw new Error('Method not implemented.');
  // Random tira numeros entre 0.01 y 0.99
    this.numero1 = Math.round(Math.random() * 5)+1;
    this.numero2 = Math.round(Math.random() * 5)+1;

    this.dadoIzquierda = `../assets/img/dice${this.numero1}.png`;
    this.dadoDerecha = `../assets/img/dice${this.numero2}.png`;
  }
}
