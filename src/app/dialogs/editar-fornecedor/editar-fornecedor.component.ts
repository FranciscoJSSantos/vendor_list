import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-fornecedor',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './editar-fornecedor.component.html',
  styleUrl: './editar-fornecedor.component.scss',
})
export class EditarFornecedorComponent {
  formBuilder = inject(NonNullableFormBuilder);

  statusList = [
    { value: 'ativo', viewValue: 'Ativo' },
    { value: 'bloqueado', viewValue: 'Bloqueado' },
  ];

  categoriaList = [];

  fornecedorForm = this.formBuilder.group({
    codFornecedor: [''],
    nomeFantasia: [''],
    email: [''],
    categoria: [''],
    telefone: [''],
    cnpj: [''],
    status: [''],
    rua: [''],
    bairro: [''],
    cidade: [''],
    unidadeFederativa: [''],
    pais: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<EditarFornecedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data != null) {
      this.fornecedorForm.patchValue({
        codFornecedor: data.codFornecedor,
        nomeFantasia: data.nomeFantasia,
        email: data.email,
        categoria: data.categoria,
        telefone: data.telefone,
        cnpj: data.cnpj,
        status: data.status,
        rua: data.rua,
        bairro: data.bairro,
        cidade: data.cidade,
        unidadeFederativa: data.unidadeFederativa,
        pais: data.pais,
      });
    }
  }

  saveEdit() {
    if (this.fornecedorForm.valid) {
      console.log(this.fornecedorForm.value);
      Swal.fire({
        text: 'Fornecedor editado com sucesso!',
        icon: 'success',
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
