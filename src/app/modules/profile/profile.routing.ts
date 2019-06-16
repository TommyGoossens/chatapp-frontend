import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ProfileComponent} from './pages/profile/profile.component';

const routes: Routes = [
  {path: '', component: ProfileComponent}
];

export const profileRouting: ModuleWithProviders = RouterModule.forChild(routes);
