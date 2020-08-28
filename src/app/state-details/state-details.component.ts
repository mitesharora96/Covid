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
  //below are for analytics
  DailyCounts=[];
  ConfirmedDailyCounts=[];
  ConfirmedDates=[];
  CumalativeConfirmCounts=[];
  RecoveredDailyCounts=[];
  RecoveredDates=[];
  CumalativeRecoveredCounts=[];
  DeathDailyCounts=[];
  DeathDates=[];
  CumalativeDeathCounts=[];

  ConfirmedData:any;
  RecoveredData:any;
  DeathData:any;
  
  constructor(private activatedRoute:ActivatedRoute,private db:CovidDataService) {

    this.columnDefs = [
     
    { field: 'districtname', headerName:"District",sortable: true, width:150 },
    {headerName: 'Confirmed', field: 'confirmed',sortable: true,width:130},
    {headerName: 'Active', field: 'active',sortable: true,width:130},
    {headerName: 'Recovered', field: 'recovered',sortable: true,width:130},
    {headerName: 'Death', field: 'deceased',sortable: true,width:130}
    ];
    
    this.domLayout='autoHeight';

    setTimeout(() =>this.OnClick("Daily"),2500)
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

        //For analytics, retriving data and filtering in confirm,recovered and deaths
        setTimeout(() => this.db.getDailyPatientCount().subscribe(
      (data)=>{this.DailyCounts=data.states_daily;

        let a=0;
        let b=0;
        let c=0;
        let s=(this.DistrictData[0].statecode)
        let sc=s.toLowerCase();
        for(let i=0;i<this.DailyCounts.length;i++){
          if(this.DailyCounts[i].status=='Confirmed')
          { 
              
              this.ConfirmedDailyCounts[a]=this.DailyCounts[i][sc]; 
              this.ConfirmedDates[a]=this.DailyCounts[i].date;
              if(a>0)
                this.CumalativeConfirmCounts[a]=parseInt(this.ConfirmedDailyCounts[a])+parseInt(this.CumalativeConfirmCounts[a-1])
              else
                this.CumalativeConfirmCounts[a]=parseInt(this.ConfirmedDailyCounts[a])
              a++;
          }

          else if(this.DailyCounts[i].status=='Recovered')
          {
            this.RecoveredDailyCounts[b]=this.DailyCounts[i][sc];
            this.RecoveredDates[b]=this.DailyCounts[i].date;
            if(b>0)
              this.CumalativeRecoveredCounts[b]=parseInt(this.RecoveredDailyCounts[b])+parseInt(this.CumalativeRecoveredCounts[b-1]);
            else
              this.CumalativeRecoveredCounts[b]=parseInt(this.RecoveredDailyCounts[b]);  
            b++;
          }

          else if(this.DailyCounts[i].status=='Deceased')
          {
            this.DeathDailyCounts[c]=this.DailyCounts[i][sc];
            this.DeathDates[c]=this.DailyCounts[i].date;
            if(c>0)
              this.CumalativeDeathCounts[c]=parseInt(this.DeathDailyCounts[c])+parseInt(this.CumalativeDeathCounts[c-1]);
            else
              this.CumalativeDeathCounts[c]=parseInt(this.DeathDailyCounts[c]);
            c++;
          }

        }

        

      }
    ),2000)



  }

  OnGridReady(parsar){
    this.gridAPI=parsar.api;
    this.gridColumnApi = parsar.columnApi;
  }

  quickSearch(){
    this.gridAPI.setQuickFilter(this.Searchvalue);
  }

  OnClick(value){
  
  
    console.log(value);
    let conf;
    let reco;
    let death;
  
    if(value=='Daily'){
      conf=this.ConfirmedDailyCounts;
      reco=this.RecoveredDailyCounts;
      death=this.DeathDailyCounts;
    }
    else if(value=='Cumalative'){
      conf=this.CumalativeConfirmCounts;
      reco=this.CumalativeRecoveredCounts;
      death=this.CumalativeDeathCounts;
    }
  
  
  
    this.ConfirmedData = {
      labels: this.ConfirmedDates,
      datasets: [
          { 
              label: 'Confirmed '+ value + ' Counts',
              data: conf,
              fill: false,
              borderColor: 'rgb(255, 109, 109)'
          }
          
      ]
  }
  
  this.RecoveredData = {
    labels: this.RecoveredDates,
    datasets: [
        { 
            label: 'Recovered '+ value + ' Counts',
            data: reco,
            fill: false,
            borderColor: 'rgb(111, 250, 111)'
        }
        
    ]
  }
  
  this.DeathData = {
  labels: this.DeathDates,
  datasets: [
      { 
          label: 'Death '+ value + ' Counts',
          data: death,
          fill: false,
          borderColor: 'rgb(182, 180, 180)'
      }
      
  ]
  }
  
  
  
  }

}
