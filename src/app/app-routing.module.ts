import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import {StateDetailsComponent} from './state-details/state-details.component'
import { BlogComponent } from './blog/blog.component';


import { BlogComponent } from './blog/blog.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'home/:state',component:StateDetailsComponent},
  {path: 'blog', component:BlogComponent},
  {path:'', redirectTo:'/home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
