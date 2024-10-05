import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VendorList } from '../../../models/VendorList';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesFornecedorComponent } from '../../dialogs/detalhes-fornecedor/detalhes-fornecedor.component';
import { EditarFornecedorComponent } from '../../dialogs/editar-fornecedor/editar-fornecedor.component';

const VENDORS: VendorList[] = [
  {
    id: '1',
    codFornecedor: 'F001',
    email: 'fornecedor1@example.com',
    nomeFantasia: 'Fornecedor A',
    categoria: 'Eletrônicos',
    telefone: '(11) 91234-5678',
    cnpj: '12.345.678/0001-90',
    grupo: 'Grupo A',
    status: 'Ativo',
    rua: 'Rua das Flores',
    bairro: 'Jardim das Orquídeas',
    cidade: 'São Paulo',
    unidadeFederativa: 'SP',
    pais: 'Brasil',
  },
  {
    id: '2',
    codFornecedor: 'F002',
    email: 'fornecedor2@example.com',
    nomeFantasia: 'Fornecedor B',
    categoria: 'Alimentos',
    telefone: '(21) 98765-4321',
    cnpj: '98.765.432/0001-01',
    grupo: 'Grupo B',
    status: 'Ativo',
    rua: 'Avenida Brasil',
    bairro: 'Centro',
    cidade: 'Rio de Janeiro',
    unidadeFederativa: 'RJ',
    pais: 'Brasil',
  },
  {
    id: '3',
    codFornecedor: 'F003',
    email: 'fornecedor3@example.com',
    nomeFantasia: 'Fornecedor C',
    categoria: 'Construção',
    telefone: '(31) 99876-5432',
    cnpj: '11.223.344/0001-55',
    grupo: 'Grupo C',
    status: 'Bloqueado',
    rua: '',
    bairro: 'Bela Vista',
    cidade: 'Belo Horizonte',
    unidadeFederativa: 'MG',
    pais: 'Brasil',
  },
  {
    id: '4',
    codFornecedor: 'F004',
    email: 'fornecedor4@example.com',
    nomeFantasia: 'Fornecedor D',
    categoria: 'Moda',
    telefone: '(41) 91234-8765',
    cnpj: '22.334.455/0001-88',
    grupo: 'Grupo D',
    status: 'Bloqueado',
    rua: 'Avenida das Américas',
    bairro: 'Vila Nova',
    cidade: 'Curitiba',
    unidadeFederativa: 'PR',
    pais: 'Brasil',
  },
  {
    id: '5',
    codFornecedor: 'F005',
    email: 'fornecedor5@example.com',
    nomeFantasia: 'Fornecedor E',
    categoria: 'Saúde',
    telefone: '(51) 92345-6789',
    cnpj: '33.445.566/0001-22',
    grupo: 'Grupo E',
    status: 'Ativo',
    rua: 'Rua do Comércio',
    bairro: 'Centro Histórico',
    cidade: 'Porto Alegre',
    unidadeFederativa: 'RS',
    pais: 'Brasil',
  },
];

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.scss',
})
export class FornecedorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formBuilder = inject(NonNullableFormBuilder);
  dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'codFornecedor',
    'email',
    'nomeFantasia',
    'categoria',
    'telefone',
    'cnpj',
    'grupo',
    'status',
    'acoes',
  ];

  // 'rua',
  // 'bairro',
  // 'cidade',
  // 'unidadeFederativa',
  // 'pais',
  dataSource = new MatTableDataSource<VendorList>(VENDORS);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
  });

  limparFiltros() {
    this.fornecedorForm.reset();
    //chamar de novo o endpoint
  }

  consultarFornecedor() {
    let formValues = this.fornecedorForm.value;
    if (this.fornecedorForm.valid) {
      console.log(formValues);
    }
    //chamar de novo o endpoint
  }

  openDetails(data: any) {
    this.dialog.open(DetalhesFornecedorComponent, {
      data,
    });
  }

  openEdit(data: any) {
    this.dialog.open(EditarFornecedorComponent, {
      data,
      height: 'auto',
    });
  }

  openMaps(data: VendorList) {
    const address = `${data.rua}, ${data.bairro}, ${data.cidade}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(googleMapsUrl, '_blank');
  }
}
