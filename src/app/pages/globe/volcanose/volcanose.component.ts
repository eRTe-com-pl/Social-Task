import { Component, OnInit } from '@angular/core';
import * as data from '../../../../assets/data/world_voulcanoes.json';

declare const Globe: any;
declare const d3: any;
declare const polished: any;

interface Data {
  name: string;
  country: string;
  type: string;
  lat: number;
  lon: number;
  elevation: number;
}


@Component({
  selector: 'app-volcanose',
  templateUrl: './volcanose.component.html',
  styleUrls: ['./volcanose.component.scss']
})
export class VolcanoseComponent implements OnInit {

  data: Data[] = (data as any).default;

  ngOnInit(): void {
    const catColor = d3.scaleOrdinal(d3.schemeCategory10.map((col: any) => polished.transparentize(0.2, col)));
  
      const getAlt = (d: { elevation: number; }) => d.elevation * 5e-5;
  
      const getTooltip = (d: { name: any; country: any; type: any; elevation: any; }) => `
        <div style="text-align: center">
          <div><b>${d.name}</b>, ${d.country}</div>
          <div>(${d.type})</div>
          <div>Elevation: <em>${d.elevation}</em>m</div>
        </div>
      `;
  
      const globeViz = document.getElementById('globeViz') as HTMLElement;
      const myGlobe = Globe();
      myGlobe(globeViz)
        .globeImageUrl('../../../../assets/img/earth-night.jpeg')
        // .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .backgroundColor("rgba(20,20,20,0)")
        .pointLat('lat')
        .pointLng('lon')
        .pointAltitude(getAlt)
        .pointRadius(0.12)
        // .pointColor('#ffffaa')//(d: { type: any; }) => catColor(d.type))
        .pointLabel(getTooltip)
        .labelLat('lat')
        .labelLng('lon')
        .labelAltitude((d: { elevation: number; }) => getAlt(d) + 1e-6)
        .labelDotRadius(0.12)
        .labelDotOrientation(() => 'bottom')
        .labelColor((d: { type: any; }) => catColor(d.type))
        .labelText('name')
        .labelSize(0.15)
        .labelResolution(1)
        .labelLabel(getTooltip)
        .width('700')
        .height('700')
        .pointsData(this.data);
      myGlobe.controls().autoRotate = false;
      myGlobe.controls().autoRotateSpeed = 0.9;
  }

}
