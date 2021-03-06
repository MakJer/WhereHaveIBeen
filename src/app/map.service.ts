import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http } from '@angular/http';

declare var jvm: any;
declare var $: any;

var map: any;

@Injectable()
export class MapService {

  private static readonly COLORS = [
    'deeppink', 'deepskyblue', 'lightcoral', 'steelblue', 'limegreen', 'tomato', 'orange', 'chocolate'
  ];

  private colors: string[];

  private static readonly STORAGENAME = 'WorldMapSelCtrys';

  private selected: Array<string> = [];

  constructor(
    @Inject(Http) private http: Http
    ) {

    http.get('../assets/colors.json').subscribe((resp) => {
      this.colors = Object.getOwnPropertyNames(resp.json());
      this.reload();
    });

  }

  save(): void {
    localStorage.setItem(MapService.STORAGENAME, JSON.stringify(this.selected));
  }

  reload() {
    this.loadFromStorage();
    this.load();
  }

  reset() {
    this.selected = [];
    this.load();
  }

  private load(): void {

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

  private loadFromStorage(): void {
    const saved = JSON.parse(localStorage.getItem(MapService.STORAGENAME));
    if (saved &&
      (saved instanceof Array) &&
      ((<Array<any>>saved).every(i => typeof i === 'string'))) {

      this.selected = saved;
    }
  }

  private getCountryColors(): any {
    let value = {};
    const thisService = this;
    this.selected.forEach((country) => {
      const colorIdx = country.split('').map(i => i.charCodeAt(0)).reduce((acc, val) => acc+val, 0);
      value[country] = thisService.colors[colorIdx % (thisService.colors.length-1)];
    });
    return value;
  }

  private toggleCountry(code: string) {
    let idx;
    if ((idx = this.selected.indexOf(code)) >= 0) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(code);
    }
    this.load();
  }

}
