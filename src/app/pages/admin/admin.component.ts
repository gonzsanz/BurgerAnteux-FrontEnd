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
    'name',
    'price',
    'category',
    'description',
    'action',
  ];
  displayedColumns2: string[] = [
    'id',
    'date',
    'quantity',
    'address',
    'comments',
    'state',
  ];
  dataSource!: MatTableDataSource<any>;
  orderDataSource!: MatTableDataSource<any>;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  showProductList: boolean = false;
  showOrderList: boolean = true;

  constructor(
    private productService: ProductService,
    private pedidoService: PedidoService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllProducts();
    this.getAllOrders();
  }

  openAddEditProductDialog(): void {
    const dialogRef = this.dialog.open(DialogProductoComponent);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.getAllProducts();
        }
      },
    });
  }

  openEditProductDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogProductoComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.getAllProducts();
        }
      },
    });
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

  public deleteProduct(product_id: number): void {
    const confirmDelete = confirm(
      '¿Estás seguro de que deseas eliminar este producto?'
    );

    if (confirmDelete) {
      this.productService.deleteProduct(product_id).subscribe(
        (response: any) => {
          console.log('Response: ', response);
          alert('Producto eliminado');
          this.getAllProducts();
        },
        (error: Error) => {
          console.log('Error: ', error);
        }
      );
    }
  }

  private getAllProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
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
      (orders: Pedido[]) => {
        this.orderDataSource = new MatTableDataSource(orders);
        this.orderDataSource.sort = this.sort;
        this.orderDataSource.paginator = this.paginator;
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
  orderApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.orderDataSource.paginator) {
      this.orderDataSource.paginator.firstPage();
    }
  }
}
