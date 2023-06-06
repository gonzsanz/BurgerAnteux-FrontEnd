import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

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
      console.log(this.empForm.value);
    }
  }
}
