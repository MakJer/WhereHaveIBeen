import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { selectOrCreateRenderHostElement } from '@angular/core/src/linker/view_utils';

declare var jvm: any;
declare var $: any;

var map: any;

@Injectable()
export class MapService {

  private static readonly COLORS = [
    'deeppink', 'deepskyblue', 'lightcoral', 'steelblue', 'limegreen', 'tomato', 'orange', 'chocolate'
  ];

  private static readonly STORAGENAME = 'selCtrys';

  private selected: Array<string> = [];

  constructor(
    @Inject(CookieService) private cookieService: CookieService) {

    this.reload();
  }

  save(): void {
    this.cookieService.putObject(MapService.STORAGENAME, this.selected);
  }

  reload() {
    this.loadFromCookie();
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

  private loadFromCookie(): void {
    const saved = this.cookieService.getObject(MapService.STORAGENAME);
    if (saved &&
      (saved instanceof Array) &&
      ((<Array<any>>saved).every(i => typeof i === 'string'))) {

      this.selected = saved;
    }
  }

  private getCountryColors(): any {
    let value = {};
    this.selected.forEach((country) => {
      const colorIdx = country.split('').map(i => i.charCodeAt(0)).reduce((acc, val) => acc+val, 0);
      value[country] = MapService.COLORS[colorIdx % (MapService.COLORS.length-1)];
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
