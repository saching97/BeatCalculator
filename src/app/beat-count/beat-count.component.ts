import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-beat-count',
  templateUrl: './beat-count.component.html',
  styleUrls: ['./beat-count.component.scss']
})
export class BeatCountComponent implements OnInit {

  public listOfTimestamps: Array<number>  = new Array<number>();
  public listOfRelativeTimestamps: Array<number> = new Array<number>(0);
  public listOfTimeDifferences: Array<number>;
  public listOfTimeRatios: Array<number>;
  public listOfBeats: Array<number>;
  public bpm: number;
  public simplify: boolean;

  constructor() {}

  greatestCommonDivisor(x: number, y: number) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  greatestCommonDivisorArray(array: Array<number>) {
    let a = array[ 0 ];
    for ( let i = 1; i < array.length; i++ ) {
      const b = array[ i ];
      a = this.greatestCommonDivisor(a, b);
    }
    return a;
  }

  ngOnInit() {
    this.listOfTimeDifferences = new Array<number>();
    this.listOfTimestamps = new Array<number>();
    this.listOfRelativeTimestamps = new Array<number>();
    this.listOfRelativeTimestamps.push(0);
    this.listOfTimeRatios = new Array<number>();
    this.listOfBeats = new Array<number>();
    this.bpm = 0;
    this.simplify = false;
  }

  @HostListener('document:keypress')
  clicked() {
    this.listOfTimestamps.push(new Date().getTime());
    this.updateRelativeTimestamps();
    this.updateTimeDifferences();
    this.generateListOfTimeRatios();
    this.generateListOfBeats();
    this.generateBpm();
  }

  updateRelativeTimestamps() {
    if (this.listOfTimestamps.length > 1) {
      this.listOfRelativeTimestamps.push(this.listOfTimestamps[this.listOfTimestamps.length - 1]
        - this.listOfTimestamps[0]);
    }
  }

  updateTimeDifferences() {
    if (this.listOfTimestamps.length > 1) {
      this.listOfTimeDifferences.push(this.listOfTimestamps[this.listOfTimestamps.length - 1]
        - this.listOfTimestamps[this.listOfTimestamps.length - 2]);
    }
  }

  generateListOfTimeRatios() {
    this.listOfTimeRatios = new Array<number>();
    const smallest = Math.min(...this.listOfTimeDifferences);
    this.listOfTimeDifferences.forEach(element => {
      this.listOfTimeRatios.push((element / smallest));
    });
  }

  generateListOfBeats() {
    this.listOfBeats = new Array<number>();
    this.listOfTimeRatios.forEach(element => {
      if (!this.simplify) {
        this.listOfBeats.push(Math.round(element * 4) * 5 / 2);
      } else {
        this.listOfBeats.push(Math.round(element) * 10);
      }
    });
    const gcd = this.greatestCommonDivisorArray(this.listOfBeats);
    for (let i = 0; i < this.listOfTimeRatios.length; i++) {
      this.listOfBeats[i] = this.listOfBeats[i] / gcd;
    }
  }

  generateBpm() {
    let sum = 0;
    for (let i = 0; i < this.listOfTimeDifferences.length; i++) {
      sum += this.listOfTimeDifferences[i] / this.listOfTimeRatios[i];
    }
    if (sum > 0) {
      this.bpm = Math.round(60000 * this.listOfTimeDifferences.length / sum);
    }
  }

  @HostListener('document:keydown.escape')
  reset() {
    this.ngOnInit();
  }

  toggleSimplify() {
    this.simplify = !this.simplify;
    this.generateListOfBeats();
  }
}
