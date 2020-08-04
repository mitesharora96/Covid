import { Component, OnInit } from '@angular/core';
import {CovidDataService} from '../../covid-data.service'
import {MenuItem} from 'primeng/api';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  ConfirmedData: any;
  RecoveredData:any;
  DeathData:any;
  DailyCounts=[];
  ConfirmedDailyCounts=[];
  ConfirmedDates=[];
  RecoveredDailyCounts=[];
  RecoveredDates=[];
  DeathDailyCounts=[];
  DeathDates=[];
  DateData=[];
  CumalativeConfirmCounts=[];
  CumalativeRecoveredCounts=[];
  CumalativeDeathCounts=[];

  constructor(private db:CovidDataService) {
    
    setTimeout(() =>this.OnClick("Daily"),1500)
   
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

return true;

}


  ngOnInit(): void {
    this.db.getDailyPatientCount().subscribe(
      (data)=>{this.DailyCounts=data.states_daily;

        let a=0;
        let b=0;
        let c=0;
        for(let i=0;i<this.DailyCounts.length;i++){
          if(this.DailyCounts[i].status=='Confirmed')
          {
              this.ConfirmedDailyCounts[a]=this.DailyCounts[i].tt; 
              this.ConfirmedDates[a]=this.DailyCounts[i].date;
              if(a>0)
                this.CumalativeConfirmCounts[a]=parseInt(this.ConfirmedDailyCounts[a])+parseInt(this.CumalativeConfirmCounts[a-1])
              else
                this.CumalativeConfirmCounts[a]=parseInt(this.ConfirmedDailyCounts[a])
              a++;
          }

          else if(this.DailyCounts[i].status=='Recovered')
          {
            this.RecoveredDailyCounts[b]=this.DailyCounts[i].tt;
            this.RecoveredDates[b]=this.DailyCounts[i].date;
            if(b>0)
              this.CumalativeRecoveredCounts[b]=parseInt(this.RecoveredDailyCounts[b])+parseInt(this.CumalativeRecoveredCounts[b-1]);
            else
              this.CumalativeRecoveredCounts[b]=parseInt(this.RecoveredDailyCounts[b]);  
            b++;
          }

          else if(this.DailyCounts[i].status=='Deceased')
          {
            this.DeathDailyCounts[c]=this.DailyCounts[i].tt;
            this.DeathDates[c]=this.DailyCounts[i].date;
            if(c>0)
              this.CumalativeDeathCounts[c]=parseInt(this.DeathDailyCounts[c])+parseInt(this.CumalativeDeathCounts[c-1]);
            else
              this.CumalativeDeathCounts[c]=parseInt(this.DeathDailyCounts[c]);
            c++;
          }

        }

        console.log(this.CumalativeConfirmCounts)

      }
    )
    
  }

}
