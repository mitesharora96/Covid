import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {CovidDataService} from '../covid-data.service'
import {  map } from 'rxjs/operators';


@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss']
})
export class StateDetailsComponent implements OnInit {

  State:any;
  DistrictData=[];
  columnDefs:any;
  gridAPI:any;
  gridColumnApi:any;
  Searchvalue:any;
  confirmedCases=0;
  activeCases=0
  recoveredCases=0
  deceasedCases=0 
  domLayout:any;
  constructor(private activatedRoute:ActivatedRoute,private db:CovidDataService) {

    this.columnDefs = [
     
    { field: 'districtname', headerName:"District",sortable: true, width:150 },
    {headerName: 'Confirmed', field: 'confirmed',sortable: true,width:130},
    {headerName: 'Active', field: 'active',sortable: true,width:130},
    {headerName: 'Recovered', field: 'recovered',sortable: true,width:130},
    {headerName: 'Death', field: 'deceased',sortable: true,width:130}
    ];
    
    this.domLayout='autoHeight';
   }

  ngOnInit(): void {
    this.State=this.activatedRoute.snapshot.params['state'];

    this.db.getDistrictData().pipe(map(data=>{
      let mydata=[]
      let j=0;
      for(let i=0;i<data.length;i++)
      {
        if(data[i].statename == this.State)
        {
          mydata[j]=data[i];
          j++;
        }
      }
      return mydata;
    })).subscribe(
      (data)=> {this.DistrictData=data;

        for(let i=0;i<this.DistrictData.length;i++)
        {
          this.confirmedCases+=this.DistrictData[i].confirmed;
          this.activeCases+= this.DistrictData[i].active;
          this.recoveredCases+=this.DistrictData[i].recovered;
          this.deceasedCases+=this.DistrictData[i].deceased
          
        } 
      console.log(this.DistrictData)}
    )
  }

  OnGridReady(parsar){
    this.gridAPI=parsar.api;
    this.gridColumnApi = parsar.columnApi;
  }

  quickSearch(){
    this.gridAPI.setQuickFilter(this.Searchvalue);
  }

}
