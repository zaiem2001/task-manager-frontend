import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/home/homepage.component';
import { AuthComponent } from './pages/auth/auth.component';
import { canActivateRoute } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
    canActivate: [canActivateRoute],
  },
  { path: 'auth', component: AuthComponent, canActivate: [canActivateRoute] },
  {
    path: ':listId',
    component: HomepageComponent,
    canActivate: [canActivateRoute],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
