import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatCountComponent } from './beat-count.component';

describe('BeatCountComponent', () => {
  let component: BeatCountComponent;
  let fixture: ComponentFixture<BeatCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compute gcd for two numbers', () => {
    expect(component.greatestCommonDivisor(5, 10)).toBe(5);
    expect(component.greatestCommonDivisor(4, 7)).toBe(1);
    expect(component.greatestCommonDivisor(6, 4)).toBe(2);
    expect(component.greatestCommonDivisor(5, 1)).toBe(1);
  });

  it('should compute gcd for array', () => {
    expect(component.greatestCommonDivisorArray(new Array(5, 10, 15))).toBe(5);
    expect(component.greatestCommonDivisorArray(new Array(4, 7))).toBe(1);
  });

  it('should add element on click', () => {
    component.clicked();
    component.clicked();
    expect(component.listOfTimestamps.length).toBe(2);
  });

  it('should update list of relative timestamps', () => {
    component.listOfTimestamps = new Array();
    component.listOfTimestamps.push(1570636542780);
    component.updateRelativeTimestamps();
    expect(component.listOfRelativeTimestamps).toEqual([0]);
    component.listOfTimestamps.push(1570636543780);
    component.updateRelativeTimestamps();
    expect(component.listOfRelativeTimestamps).toEqual([0, 1000]);
    component.listOfTimestamps.push(1570636544780);
    component.updateRelativeTimestamps();
    expect(component.listOfRelativeTimestamps).toEqual([0, 1000, 2000]);
  });

  it('should generate list of time differences', () => {
    component.listOfTimestamps = new Array();
    component.listOfTimestamps.push(1570636542780);
    component.updateTimeDifferences();
    expect(component.listOfTimeDifferences.length).toEqual(0);
    component.listOfTimestamps.push(1570636543780);
    component.updateTimeDifferences();
    expect(component.listOfTimeDifferences).toEqual([1000]);
    component.listOfTimestamps.push(1570636544780);
    component.updateTimeDifferences();
    expect(component.listOfTimeDifferences).toEqual([1000, 1000]);
  });

  it('should generate list of time ratios', () => {
    component.listOfTimeDifferences = new Array(1000, 1000, 1000, 1000);
    component.generateListOfTimeRatios();
    expect(component.listOfTimeRatios).toEqual([1, 1, 1, 1]);
    component.ngOnInit();

    component.listOfTimeDifferences = new Array(500, 1000, 2000, 4000);
    component.generateListOfTimeRatios();
    expect(component.listOfTimeRatios).toEqual([1, 2, 4, 8]);
    component.ngOnInit();

    component.listOfTimeDifferences = new Array(1500, 1000, 2000, 4000);
    component.generateListOfTimeRatios();
    expect(component.listOfTimeRatios).toEqual([1.5, 1, 2, 4]);
  });

  it('should generate list of beats', () => {
    component.listOfTimeRatios = new Array(1.04, 1.01, 0.97, 0.95);
    component.generateListOfBeats();
    expect(component.listOfBeats).toEqual([1, 1, 1, 1]);
    component.ngOnInit();

    component.listOfTimeRatios = new Array(0.49, 1.01, 0.97, 0.95);
    component.generateListOfBeats();
    expect(component.listOfBeats).toEqual([1, 2, 2, 2]);
    component.ngOnInit();

    component.listOfTimeRatios = new Array(1.49, 1.01, 0.97, 0.95);
    component.generateListOfBeats();
    expect(component.listOfBeats).toEqual([3, 2, 2, 2]);
    component.ngOnInit();

    component.listOfTimeRatios = new Array(1.12, 1.01, 0.97, 0.95);
    component.generateListOfBeats();
    expect(component.listOfBeats).toEqual([1, 1, 1, 1]);
  });

  it('should generate bpm', () => {
    component.listOfTimeDifferences = new Array(1000, 1000, 1000, 1000);
    component.listOfTimeRatios = new Array(1, 1, 1, 1);
    component.generateBpm();
    expect(component.bpm).toEqual(60);

    component.listOfTimeDifferences = new Array(1000, 500, 500, 1000);
    component.listOfTimeRatios = new Array(2, 1, 1, 2);
    component.generateBpm();
    expect(component.bpm).toEqual(120);

    component.listOfTimeDifferences = new Array(800, 400, 400, 800);
    component.listOfTimeRatios = new Array(2, 1, 1, 2);
    component.generateBpm();
    expect(component.bpm).toEqual(150);
  });

  // it('should process as a facade', () => {
  //   component.listOfTimestamps = new Array(1570636542780,1570636543780,1570636544780,1570636545780,1570636546780);
  //   expect(component.generateBpm).toHaveBeenCalled();
  //   expect(component.listOfRelativeTimestamps).toEqual([0, 1000, 2000, 3000, 4000]);
  //   expect(component.listOfTimeDifferences).toEqual([1000, 1000, 1000, 1000]);
  //   expect(component.listOfTimeRatios).toEqual([1, 1, 1, 1]);
  //   expect(component.listOfBeats).toEqual([1, 1, 1, 1]);
  // });

});
