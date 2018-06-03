import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseURL = "http://fakerestapi.azurewebsites.net/api/Books";

  constructor(private http: Http) {
    console.log("Books Service created...")
  }

  getAllBooks(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  deleteBooksById(books:any, id:number){
    books=books.filter(e=>e.ID!=id);
    return books;
  }
  deleteBooksByIdWS(id:number){
    return this.http.delete(this.baseURL+"/"+id);
  }

  updateBooksById(books:any, id:number, bookDetails:any){
    // books=books.filter(e=>e.ID!=id);
    // return books;
    books.map((e,i)=>{
      if(e.ID==id)
      books[i]=bookDetails;
     });
  
      return books;
  }
  updateBooksByIdWS(id:number, body:any){
    return this.http.put(this.baseURL+"/"+id, body);
  }

  getBooksById(id:number){
    return this.http.get(this.baseURL+"/"+id);
  }
}