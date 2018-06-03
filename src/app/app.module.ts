import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { PagerService } from './service/pager.service';
import { LoginService } from './service/login.service';
import { BooksService } from './service/books.service';
import { HttpModule } from '@angular/http';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgDatepickerModule
  ],
  providers: [LoginService, BooksService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
