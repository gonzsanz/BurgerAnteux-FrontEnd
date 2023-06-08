import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss'],
})
export class CartaComponent implements OnInit {
  selectedCategory: string = 'ESPECIALIDADES';
  productList: any[] | undefined;
  categories: any[] = [
    'TODOS',
    'ESPECIALIDADES',
    'HAMBURGUESAS',
    'SANWICHES',
    'ENSALADAS',
    'BOCADILLOS',
    'PERRITOS',
    'PLATOS COMBINADOS',
    'RACIONES',
    'POSTRES',
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getProductByCategory(this.selectedCategory);
  }

  private getProductByCategory(category: string): void {
    if (category === 'TODOS') {
      this.getAllProducts();
      return;
    }

    this.productService.getProductsByCategory(category).subscribe(
      (products: Product[]) => {
        this.productList = products;
      },
      (error: Error) => {
        console.log('Error: ', error);
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
      }
    );
  }

  public changeCategory(category: string): void {
    this.selectedCategory = category;
    this.getProductByCategory(this.selectedCategory);
  }
}
