import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component'
import { BooksComponent } from '../books/books.component'


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'books',
        component: BooksComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }