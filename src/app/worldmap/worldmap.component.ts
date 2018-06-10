import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldMapComponent implements OnInit {

  constructor(public mapService: MapService) { }

  ngOnInit() { }    

}
