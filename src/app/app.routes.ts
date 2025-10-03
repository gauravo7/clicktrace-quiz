import { Routes } from '@angular/router';
import { Register } from './component/register/register';
import { Login } from './component/login/login';
import { ProjectorScreen } from './component/projector-screen/projector-screen';
import { AttemptScreen } from './component/attempt-screen/attempt-screen';
import { ManageProjector } from './component/manage-projector/manage-projector';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: 'handlescreeno7', component: ManageProjector },
  { path: '', component: Register },
  { path: 'login', component: Login },
  { path: 'live', component: ProjectorScreen },
  { path: 'race',canActivate: [authGuard], component: AttemptScreen }
];
