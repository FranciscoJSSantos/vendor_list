import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-fornecedor',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './detalhes-fornecedor.component.html',
  styleUrl: './detalhes-fornecedor.component.scss',
})
export class DetalhesFornecedorComponent {
  constructor(
    public dialogRef: MatDialogRef<DetalhesFornecedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
