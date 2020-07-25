import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../covid-data.service'

export interface RowData {
  state: string;
  confirmed: string;
  active: string;
  recovered: string;
  deaths: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  DistrictData: any;
  StateData: any;
  rowData: RowData[] = [];
  Searchvalue: string;
  temp = "Andaman and Nicobar Islands"
  gridAPI: any;
  detailCellRendererParams: any;

  constructor(private db: CovidDataService) {
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: 'statecode' },
          // { field: 'deltaconfirmed' },
          // { field: 'active'},
          // { field: 'recovered'},
          // { field: 'deceased'},
        ],

      },
      getDetailRowData: function (params) {
        console.log(params.data.state);
        params.successCallback(this.DistrictData[params.data.state]);
      },
    };
  }

  columnDefs = [
    { headerName: 'State', field: 'state', sortable: true, cellRenderer: 'agGroupCellRenderer' },
    { headerName: 'Confirmed', field: 'confirmed', sortable: true },
    { headerName: 'Active', field: 'active', sortable: true },
    { headerName: 'Recovered', field: 'recovered', sortable: true },
    { headerName: 'Deceased', field: 'deaths', sortable: true }
  ];



  ngOnInit(): void {

    this.db.getDistrictData().subscribe(
      (data) => {
        this.DistrictData = data;
        console.log(this.DistrictData[this.temp].districtData)
      }
    )

    this.db.getStatewiseData().subscribe(
      data => {
        this.StateData = data;
      }
    )
  }



  OnGridReady(parsar) {
    this.gridAPI = parsar.api;
  }

  quickSearch() {
    this.gridAPI.setQuickFilter(this.Searchvalue);
  }
}
