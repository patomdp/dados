import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ctimer-countdown-timer',
  template: `
    <div class="wrapper">
      <div id="timer">
        <!-- <div>{{ time.days }} <span>Días</span></div>
        <div>{{ time.hours }} <span>Horas</span></div>
        <div>{{ time.minutes }} <span>Minutos</span></div> -->
        <div>{{ time.seconds }} <span>Segundos</span></div>
      </div>
      <!-- <div *ngIf="time.seconds === 0">PENE</div> -->
    </div>
  `,
  styles: [`
    #timer {
      font-size: 3em;
      font-weight: 100;
      color: white;
      padding: 20px;
      width: 700px;
      color: white;
    }

    #timer div {
      display: inline-block;
      min-width: 90px;
      padding: 15px;
      background: #020b43;
      border-radius: 10px;
      border: 2px solid #030d52;
      margin: 15px;
    }
    
    #timer div span {
      color: #ffffff;
      display: block;
      margin-top: 15px;
      font-size: .35em;
      font-weight: 400;
    }
  `],
})
export class CountdownTimerComponent implements OnInit, OnChanges {
  time!: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  @Input() finishDateString: string = '';
  finishDate: Date = new Date();
  timerSubscription!: Subscription;

  ngOnInit(): void {
    this.time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    this.finishDate = new Date(this.finishDateString);
    this.startCountdown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['finishDateString'] && !changes['finishDateString'].firstChange) {
      this.initializeTimer();
    }
  }

  private initializeTimer(): void {
    this.time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    this.finishDate = new Date(this.finishDateString);
    this.startCountdown();
  }

  updateTime(): void {
    const now = new Date();
    const diff = this.finishDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    this.time.days = Math.max(days, 0);
    this.time.hours = Math.max(hours, 0);
    this.time.minutes = Math.max(mins, 0);
    this.time.seconds = Math.max(secs, 0);
  }

  resetCountdownToMinutes(minutes: number): void {
    const now = new Date();
    const newFinishDate = new Date(now.getTime() + minutes * 60000); // 60000 milisegundos en un minuto
    this.finishDate = newFinishDate;
    this.startCountdown();
  }

  startCountdown(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).pipe(
      map(() => {
        this.updateTime();
      })
    ).subscribe();
  }
}
