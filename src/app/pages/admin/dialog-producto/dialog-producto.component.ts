import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.scss'],
})
export class DialogProductoComponent {
  empForm!: FormGroup;
  categories: string[] = [
    'ESPECIALIDADES',
    'HAMBURGUESAS',
    'BOCADILLOS',
    'PERRITOS',
    'PLATOS COMBINADOS',
    'RACIONES',
    'POSTRES',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialog: DialogRef<DialogProductoComponent>,
  ) {}

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      name: '',
      price: '',
      category: '',
      description: '',
    });
  }

  onSubmit(): void {
    if (this.empForm.valid) {
      // console.log(this.empForm.value);
      this.productService.addProduct(this.empForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          alert('Producto añadido correctamente');
          this.dialog.close();
        },
        error: (error) => {
          console.error(error);
        }
      }
      );
    }
  }

  close(): void {
    this.dialog.close();
  }
}
