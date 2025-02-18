import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { MessageComponent } from './message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { NewPageComponent } from './new-page/new-page.component';
import { SinglePostPageComponent } from './single-post-page/single-post-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DateShowPipe } from './date-show.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PostPageComponent,
    UserPageComponent,
    MessageViewComponent,
    NavbarComponent,
    PostComponent,
    MessageComponent,
    NewPageComponent,
    SinglePostPageComponent,
    AdminPageComponent,
    DateShowPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
