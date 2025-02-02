import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './post-page/post-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { SinglePostPageComponent } from './single-post-page/single-post-page.component';
import { AuthGuard } from './auth.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  { path: '', component: PostPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'new_post', component: NewPageComponent, canActivate: [AuthGuard] },
  {
    path: 'post/:id',
    component: SinglePostPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
