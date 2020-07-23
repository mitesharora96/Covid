import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

   gridApi:any;
   gridColumnApi;
   columnDefs;
   defaultColDef;
   detailCellRendererParams;
  rowData: any;
  constructor(private http: HttpClient) { 

    this.columnDefs = [
      {
        field: 'name',
        cellRenderer: 'agGroupCellRenderer',
      },
      { field: 'account' },
      { field: 'calls' },
      {
        field: 'minutes',
        valueFormatter: "x.toLocaleString() + 'm'",
      },
    ];
    this.defaultColDef = { flex: 1 };
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: 'callId' },
          { field: 'direction' },
          {
            field: 'number',
            minWidth: 150,
          },
          {
            field: 'duration',
            valueFormatter: "x.toLocaleString() + 's'",
          },
          {
            field: 'switchCode',
            minWidth: 150,
          },
        ],
        defaultColDef: { flex: 1 },
      },
      getDetailRowData: function(params) {
        params.successCallback(params.data.callRecords);
      },
    };
  }



  onFirstDataRendered(params) {
    setTimeout(function() {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/simple/data/data.json'
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }
  

  ngOnInit(): void {
  }

}

// export class AppComponent {
  

//   public modules: Module[] = [
//     ClientSideRowModelModule,
//     MasterDetailModule,
//     MenuModule,
//     ColumnsToolPanelModule,
//   ];
  

//   constructor(private http: HttpClient) 
    

  
// }