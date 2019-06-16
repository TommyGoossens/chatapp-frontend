import {RouterModule, Routes} from '@angular/router';
import {ChatWrapperComponent} from './pages/wrapper/chat-wrapper.component';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {path: '', component: ChatWrapperComponent}
];

export const chatRouting: ModuleWithProviders = RouterModule.forChild(routes);
