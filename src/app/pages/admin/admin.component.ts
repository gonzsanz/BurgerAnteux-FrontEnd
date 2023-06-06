import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { Pedido } from 'src/app/shared/interfaces/pedido';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductoComponent } from './dialog-producto/dialog-producto.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  productList: Product[] | undefined;
  orderList: Pedido[] | undefined;

  displayedColumns: string[] = [
    'product_id',
    'name',
    'price',
    'category',
    'description',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  showProductList: boolean = true;
  showOrderList: boolean = false;

  constructor(
    private productService: ProductService,
    private pedidoService: PedidoService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllProducts();
  }

  openAddEditProductDialog(): void {
    this.dialog.open(DialogProductoComponent);
  }

  public showProducts(): void {
    this.showProductList = true;
    this.showOrderList = false;
    this.getAllProducts();
  }

  public showOrders(): void {
    this.showProductList = false;
    this.showOrderList = true;
    this.getAllOrders();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  private getAllProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        // this.productList = products;
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: Error) => {
        console.log('Error: ', error);
      }
    );
  }

  public getAllOrders(): void {
    this.pedidoService.obtenerPedidos().subscribe(
      (orders: any[]) => {
        this.orderList = orders;
      },
      (error: Error) => {
        console.log('Error: ', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
