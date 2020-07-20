import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  constructor(private http: HttpClient) { }


  getDistrictData():Observable<any>{
   return  this.http.get("https://api.covid19india.org/state_district_wise.json")

  }

  getStatewiseData():Observable<any>{
    return this.http.get("https://api.covid19india.org/data.json")
  
  }
}
