import { Component, OnInit } from '@angular/core';
import {CovidDataService} from '../covid-data.service'
import {  map } from 'rxjs/operators';

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
  StateKeys:any;
  districtKeys:any;
  Searchvalue:string;
  gridColumnApi:any;
  temp="Andaman and Nicobar Islands"
  gridAPI:any;
  autoGroupColumnDef:any;
  detailCellRendererParams:any;
  NewData=[];
  columnDefs:any;
  constructor(private db:CovidDataService) {
    this.columnDefs = [
      {
        field: 'statename',
        headerName:"State",
        rowGroup: true,
        sortable: true,
        hide: true,
      },
      { field: 'districtname', headerName:"District"  },
      {headerName: 'Confirmed', field: 'confirmed',aggFunc: 'sum',sortable: true},
    {headerName: 'Active', field: 'active',aggFunc: 'sum',sortable: true},
    {headerName: 'Recovered', field: 'recovered',aggFunc: 'sum',sortable: true},
    {headerName: 'Deceased', field: 'deceased',aggFunc: 'sum',sortable: true}
    ];
    
    
    this.autoGroupColumnDef = {
      minWidth: 200,
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

    this.db.getDistrictData().pipe(map(data=>{
      this.StateKeys=Object.keys(data);
      this.districtKeys=Object.keys(data[this.StateKeys[1]].districtData)
      
        console.log(this.StateKeys.length);
      
      let k=0;
      for(let i=0;i<this.StateKeys.length;i++)
      {
        this.districtKeys=Object.keys(data[this.StateKeys[i]].districtData)
        
        for(let j=0;j<this.districtKeys.length;j++)
        {
          data[this.StateKeys[i]].districtData[this.districtKeys[j]]['statename']=this.StateKeys[i];
          data[this.StateKeys[i]].districtData[this.districtKeys[j]]['districtname']=this.districtKeys[j];
          this.NewData[k]=(data[this.StateKeys[i]].districtData[this.districtKeys[j]]);
              k++;
        }
      }
      console.log(this.StateKeys[1]);
      console.log(data[this.StateKeys[1]].districtData);
      return this.NewData
    })).subscribe(
      (data)=> {this.DistrictData=data;
      
      }
    )

    this.db.getStatewiseData().pipe(map(data=>{ return data['statewise']})).subscribe(
      data=>{this.StateData=data;      
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
