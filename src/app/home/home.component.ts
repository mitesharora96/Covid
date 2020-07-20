import { Component, OnInit } from '@angular/core';
import {CovidDataService} from '../covid-data.service'

export interface RowData{
  state:string;
  confirmed:string;
  active:string;
  recovered:string;
  deaths:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  DistrictData:any;
  StateData:any;
  rowData:RowData[]=[];
  Searchvalue:string;
  gridAPI:any;
  constructor(private db:CovidDataService) { }

  columnDefs = [
    {headerName: 'State', field: 'state', sortable: true},
    {headerName: 'Confirmed', field: 'confirmed', sortable: true},
    {headerName: 'Active', field: 'active', sortable: true},
    {headerName: 'Recovered', field: 'recovered', sortable: true},
    {headerName: 'Deceased', field: 'deaths', sortable: true}
];

  ngOnInit(): void {

    this.db.getDistrictData().subscribe(
      (data)=> {this.DistrictData=data;
      console.log(this.DistrictData["State Unassigned"].statecode)
      }
    )

    this.db.getStatewiseData().subscribe(
      data=>{this.StateData=data;      
        }
    )
  }

  OnGridReady(parsar){
    this.gridAPI=parsar.api;
  }

  quickSearch(){
    this.gridAPI.setQuickFilter(this.Searchvalue);
  }
}
