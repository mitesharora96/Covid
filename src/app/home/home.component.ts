import { Component, OnInit } from '@angular/core';
import {CovidDataService} from '../covid-data.service'
import {  map } from 'rxjs/operators';
import {CellRendererComponent} from '../cell-renderer/cell-renderer.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  activeCases:any;
  confirmedCases:any;
  recoveredCases:any;
  deceasedCases:any;
  DistrictData:any;
  StateData:any;
  StateKeys:any;
  districtKeys:any;
  Searchvalue:string;
  gridColumnApi:any;
  domLayout:any;
  getRowHeight:any; 
  gridAPI:any;
  autoGroupColumnDef:any;
  detailCellRendererParams:any;
  
  NewData=[];
  columnDefs:any;
  constructor(private db:CovidDataService) {
    this.columnDefs = [
      {
        field: 'statename',
        headerName:"State/UT",
        rowGroup: true,
        sortable: true,
        hide: true,
        cellRendererFramework:CellRendererComponent
      },
      { field: 'districtname', headerName:"District",width: 100,sortable: true },
      {headerName: 'C', field: 'confirmed',aggFunc: 'sum',sortable: true,width: 97},
    {headerName: 'A', field: 'active',aggFunc: 'sum',sortable: true,width: 97},
    {headerName: 'R', field: 'recovered',aggFunc: 'sum',sortable: true,width: 97},
    {headerName: 'D', field: 'deceased',aggFunc: 'sum',sortable: true,width: 97}
    ];
    
    this.domLayout='autoHeight';
    this.getRowHeight=100;
    this.autoGroupColumnDef = {
      minWidth: 150,
      filterValueGetter: function(params) {
        var colGettingGrouped = params.colDef.showRowGroup;
        var valueForOtherCol = params.api.getValue(
          colGettingGrouped,
          params.node
        );
        return valueForOtherCol;
      },
    };

   }

  ngOnInit(): void {

    this.db.getDistrictData().subscribe(
      (data)=> {this.DistrictData=data;}
    )

    this.db.getStatewiseData().pipe(map(data=>{ return data['statewise']})).subscribe(
      data=>{this.StateData=data; 
        this.activeCases=this.StateData[0].active ;
        this.confirmedCases=this.StateData[0].confirmed;
        this.deceasedCases=this.StateData[0].deaths;
        this.recoveredCases=this.StateData[0].recovered;    
        }
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
