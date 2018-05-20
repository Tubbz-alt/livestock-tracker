import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LivestockDetailComponent } from './livestock/livestock-detail/livestock-detail.component';
import { LivestockComponent } from './livestock/livestock.component';
import { ReportsComponent } from './reports/reports.component';
import { MedicalComponent } from './medical/medical.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'livestock',
    component: LivestockComponent,
    children: [
      { path: 'new', component: LivestockDetailComponent },
      { path: 'edit', component: LivestockDetailComponent },
    ]
  },
  { path: 'medical', component: MedicalComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
