import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  districtKeys:any;
  StateKeys:any;
  NewData=[];
  constructor(private http: HttpClient) { }


  getDistrictData():Observable<any>{
   return  this.http.get("https://api.covid19india.org/state_district_wise.json").pipe(map(data=>{
    this.StateKeys=Object.keys(data);
    
    
    let k=0;
    for(let i=1;i<this.StateKeys.length;i++)
    {
      this.districtKeys=Object.keys(data[this.StateKeys[i]].districtData)
      
      for(let j=1;j<this.districtKeys.length;j++)
      {
        data[this.StateKeys[i]].districtData[this.districtKeys[j]]['statename']=this.StateKeys[i];
        data[this.StateKeys[i]].districtData[this.districtKeys[j]]['districtname']=this.districtKeys[j];
        data[this.StateKeys[i]].districtData[this.districtKeys[j]]['statecode']=data[this.StateKeys[i]].statecode;
        this.NewData[k]=(data[this.StateKeys[i]].districtData[this.districtKeys[j]]);
            k++;
      }
    }
    return this.NewData
  }))

  }

  getStatewiseData():Observable<any>{
    return this.http.get("https://api.covid19india.org/data.json")
  
  }

  getDailyPatientCount():Observable<any>{
    return this.http.get("https://api.covid19india.org/states_daily.json")
  
  }
}
