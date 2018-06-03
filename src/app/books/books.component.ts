import { Component, OnInit } from '@angular/core';
import { PagerService } from '../service/pager.service';
import { BooksService } from '../service/books.service';

declare var $: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  title = "books Table";
  books: Array<any>;
  bookData: any;
  message = "";
  userId = 0;
  editFlag = false;
  addFlag = false;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private pagerService: PagerService, private booksService: BooksService) {
    console.log("bookscomponet created....");
  }

  ngOnInit() {
    console.log("bookscomponet initialized...." + this.userId);
    this.getAllbooks();

  }
  openModal() {
    $('#editmodal').modal('show');
    var book = {
      ID: "",
      PublishDate: new Date(),
      Description: "",
      Excerpt: "",
      PageCount: 0,
      // addFlag : true
    }
    this.bookData = book;
    this.addFlag = true;
    this.editFlag = true;
  }
  openModalEdit(id: number) {
    $('#editmodal').modal('show');
    this.getBookByID(id);
    this.addFlag = false;
  }

  getBookByID(id: number) {
    this.booksService.getBooksById(id).subscribe(response => {
      this.bookData = response;
      this.bookData = JSON.parse(this.bookData._body);
      this.editFlag = true;
      this.bookData.PublishDate = new Date(this.bookData.PublishDate)
    }, error => this.message = error);
  }
  getAllbooks() {

    this.booksService.getAllBooks()
      .subscribe(response => {
        this.books = JSON.parse(response._body)
        this.setPage(1);
      }, error => this.message = error);
  }

  deleteBook(id: number) {
    this.booksService.deleteBooksByIdWS(id).subscribe(
      response => {
        if (response.status == 200) {
          console.log("Delete Successfull");
        }
      }
    );
    this.books = this.booksService.deleteBooksById(this.books, id);
    this.setPage(1);
  }

  addNewBook() {
    this.bookData.ID = this.books.length + 1;
    this.books.push(this.bookData);
    this.setPage(1);
    $('#editmodal').modal('hide');
  }

  updateBookData() {

    this.books = this.booksService.updateBooksById(this.books, this.bookData.ID, this.bookData);
    this.setPage(1);
    this.booksService.updateBooksByIdWS(this.bookData.ID, this.books).subscribe(
      response => {
        if (response.status == 200) {
          console.log("Updated Successfull");
        }
      }
    );
    $('#editmodal').modal('hide');
  }

  addSubmit() {
    $('#titleValid').hide();
    $('#descriptionValid').hide();
    if(this.bookData.Title == "" || this.bookData.Title == undefined){
      $('#titleValid').show();
      return;
    }
    if(this.bookData.Description == ""){
      $('#descriptionValid').show();
      return;
    }
    if (this.addFlag == true) {
      //new add
      this.addNewBook();
    } else {
      //update
      this.updateBookData();
    }
  }

  setPage(page: number) {
    // debugger;
    // get pager object from service
    this.pager = this.pagerService.getPager(this.books.length, page);

    // get current page of items
    this.pagedItems = this.books.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  validateBook(event: Event) {
    if (this.bookData.Title == "") {
      $('#titleValid').show();
    } else {
      $('#titleValid').hide();
    }
  }

  validateDesc(event: Event) {
    if (this.bookData.Description == "") {
      $('#descriptionValid').show();
    } else {
      $('#descriptionValid').hide();
    }
  }

  validatePageCount(event: Event) {
    if (this.bookData.PageCount < 0) {
      this.bookData.PageCount = 0;
    } else {
      // $('#pageCountValid').hide();
    }
  }

}