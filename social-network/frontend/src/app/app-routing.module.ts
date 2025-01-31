import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './post-page/post-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { SinglePostPageComponent } from './single-post-page/single-post-page.component';

const routes: Routes = [
  { path: '', component: PostPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'new_post', component: NewPageComponent },
  { path: 'post/:id', component: SinglePostPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
