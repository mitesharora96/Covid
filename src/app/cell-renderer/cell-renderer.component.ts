import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-cell-renderer',
  templateUrl: './cell-renderer.component.html',
  styleUrls: ['./cell-renderer.component.scss']
})
export class CellRendererComponent implements OnInit {

  data:any;

  agInit(param){
    this.data=param.value;
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onStateSelect(Sdata){
    this.router.navigate(['/home',Sdata]) 

  }
}
