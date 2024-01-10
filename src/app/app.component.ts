import { Component, ViewChild } from '@angular/core';
import { CountdownTimerComponent } from '../../projects/countdown-timer/src/lib/countdown-timer.component'; // Ajusta la ruta según la ubicación real de tu componente CountdownTimer


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('countdownTimer', { static: false }) countdownTimer!: CountdownTimerComponent;

  title = 'Dados';
  
  numero1: number = 1;
  numero2: number = 2;
  dadoIzquierda = '../assets/img/dice1.png';
  dadoDerecha = '../assets/img/dice5.png';

  isCountDown: boolean = false;

  //  crear funcion random para que de por resultado entre 1-6
  tirarDados(): void {
  // Random tira numeros entre 0.01 y 0.99
    this.numero1 = Math.round(Math.random() * 5)+1;
    this.numero2 = Math.round(Math.random() * 5)+1;

    this.dadoIzquierda = `../assets/img/dice${this.numero1}.png`;
    this.dadoDerecha = `../assets/img/dice${this.numero2}.png`;

    this.isCountDown = true;
    this.resetTimer(1);
    setTimeout(() => {
    }, 800);
  }

  resetTimer(time:number): void {
    this.countdownTimer.resetCountdownToMinutes(time); // Añade 1 minuto (60 segundos) al contador
  }
  
}
