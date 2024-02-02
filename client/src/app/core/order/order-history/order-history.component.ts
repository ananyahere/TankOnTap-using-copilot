import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/shared/model/order';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  orderHistory: Order[] = [];
  paginatedOrderHistory: Order[] = []
  isAdmin = false;
  isOrdersLoading: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 3;
  paginatorLength: number = 3;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService, private localstorageService: LocalstorageService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    const userId = this.localstorageService.getItem('userId');
    if(userId){
      this.isOrdersLoading = true;
      this.orderService.getOrdersForUser(userId).subscribe(
        (response) => {
          this.orderHistory = response.data;
          this.setPaginator(this.paginatorLength, this.pageIndex, this.pageSize)
          this.isOrdersLoading = false;
          this.paginatedOrderHistory = this.orderHistory
        },
        (error) => {
          this.snackBar.open('Error loading orders', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.isOrdersLoading = false;
        }
      )
    }

  }

  setPaginator(pgLength: number, pgIndex: number, pgSize: number){
    this.paginatorLength = pgLength;
    this.pageIndex = pgIndex
    this.pageSize = pgSize
    const startIndex = pgIndex * pgSize;
    const endIndex = startIndex + pgSize;
    this.paginatedOrderHistory = this.orderHistory.slice(startIndex, endIndex);
  }

  handlePageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex; // page
    this.pageSize = event.pageSize; // limit
    this.paginatorLength = event.length;
    this.setPaginator(
      this.paginatorLength,
      this.pageIndex,
      this.pageSize
    );
  } 

  formatDate(dateString: string): string {
    let date = new Date();
    if (dateString) date = new Date(dateString);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`;
    return formattedDate;
  }

  openDetails() {
    this.router.navigate(['/dashboard']);
  }
}
