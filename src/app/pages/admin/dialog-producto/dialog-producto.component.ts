import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.scss'],
})
export class DialogProductoComponent implements OnInit {
  empForm!: FormGroup;
  categories: string[] = [
    'ESPECIALIDADES',
    'HAMBURGUESAS',
    'BOCADILLOS',
    'PERRITOS',
    'PLATOS COMBINADOS',
    'RACIONES',
    'SANWICHES',
    'ENSALADAS',
    'POSTRES',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialog: MatDialogRef<DialogProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      name: '',
      price: '',
      category: '',
      description: '',
    });

    this.empForm.patchValue(this.data);
  }

  onSubmit(): void {
    if (this.empForm.valid) {
      const formData = this.empForm.value;

      // Convertir los valores a mayúsculas
      formData.name = formData.name.toUpperCase();
      formData.description = formData.description.toUpperCase();

      if (this.data) {
        const product_id = this.data.product_id;
        formData.product_id = product_id;
        this.productService.updateProduct(formData).subscribe({
          next: (data: any) => {
            console.log(data);
            alert('Producto actualizado correctamente');
            this.dialog.close(true);
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        this.productService.addProduct(this.empForm.value).subscribe({
          next: (data: any) => {
            console.log(data);
            alert('Producto añadido correctamente');
            this.dialog.close(true);
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    }
  }

  close(): void {
    this.dialog.close();
  }
}
