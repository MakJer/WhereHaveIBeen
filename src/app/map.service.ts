import { Injectable } from '@angular/core';

declare var jvm: any;
declare var $: any;

var map: any;

@Injectable()
export class MapService {

  private selected: Array<string> = [];
  private readonly COLORS = [
    'deeppink', 'deepskyblue', 'lightcoral', 'steelblue', 'limegreen', 'tomato', 'orange', 'chocolate'
  ];


  constructor() { }


  load(): void {

    const thisService = this;
    $(function(){

      if (!map) {
        map = new jvm.Map({
          map: 'world_mill',
          container: $('#world-map'),
          series: {
            regions: [{
              attribute: 'fill'
            }]
          },
          onRegionClick: (event, code) => thisService.toggleCountry(code)
        });
      }

      map.series.regions[0].clear();
      map.series.regions[0].setValues(thisService.getCountryColors());
      map.applyTransform();
    });

  }

  private getCountryColors(): any {
    let value = {};
    this.selected.forEach((country) => {
      const colorIdx = country.split('').map(i => i.charCodeAt(0)).reduce((acc, val) => acc+val, 0);
      value[country] = this.COLORS[colorIdx % (this.COLORS.length-1)];
    });
    return value;
  }

  toggleCountry(code: string) {
    let idx;
    if ((idx = this.selected.indexOf(code)) >= 0) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(code);
    }
    this.load();
  }

  reset() {
    this.selected = [];
    this.load();
  }

}
