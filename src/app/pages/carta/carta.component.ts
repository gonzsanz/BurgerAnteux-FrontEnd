import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss'],
})
export class CartaComponent implements OnInit {
  productList: any[] | undefined;
  categories: any[] = [
    'HAMBURGUESAS',
    'BOCADILLOS',
    'POSTRES',
    'ESPECIALIDADES',
  ];
  category: string = 'TODOS';

  constructor(private productService: ProductService) {
    this.productService
      .getProductsByCategory(this.category)
      .subscribe((products) => {
        this.productList = products;
      });
  }

  ngOnInit(): void {
    this.productService
      .getProductsByCategory(this.category)
      .subscribe((data: any[]) => {
        this.productList = data;
      });

    this.changeCategory(this.category);
  }

  private getProductByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(
      (products: Product[]) => {
        this.productList = products;
      },
      (error: Error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    );
  }

  private getAllProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.productList = products;
      },
      (error: Error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    );
  }

  public changeCategory(category: string): void {
    if (category === 'TODOS') {
      this.getAllProducts();
      return;
    }
    this.category = category;
    this.getProductByCategory(this.category);
  }
}
