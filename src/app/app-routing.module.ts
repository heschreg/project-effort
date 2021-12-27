import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/signup/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { BinarydokusComponent } from './binarydokus/binarydokus.component';
import { ImageUpDownComponent } from './image-up-down/image-up-down.component';
import { TrainingComponent } from './training/training.component';

import { WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  // {path: '', component: TrainingComponent},
  // {path: '', component: WelcomeComponent},
  // {path: '', component: BinarydokusComponent},
  {path: '', component: ImageUpDownComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
