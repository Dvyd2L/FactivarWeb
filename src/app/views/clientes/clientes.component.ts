import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { ICustomer } from '@/app/models/interfaces/api';
import { AsyncPipe, JsonPipe, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { MessageService, ConfirmationService } from 'primeng/api';
// import { TableModule } from 'primeng/table';
// import { ToastModule } from 'primeng/toast';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { ToolbarModule } from 'primeng/toolbar';
// import { FileUploadModule } from 'primeng/fileupload';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastComponent } from '@/app/shared/components/toast/toast.component';
import { ModalComponent } from "../../shared/components/modal/modal.component";
@Component({
    selector: 'app-customeres',
    standalone: true,
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.scss',
    providers: [ApiService],
    imports: [
        RouterLink,
        JsonPipe,
        AsyncPipe,
        DatePipe,
        ReactiveFormsModule,
        ToastComponent,
        ModalComponent
    ]
})
export class ClientesComponent implements OnInit {
  // private messageService = inject(MessageService);
  // private confirmationService = inject(ConfirmationService);
  private api = inject(ApiService);

  public response$!: Observable<ICustomer[]>;
  public customers!: ICustomer[];
  public customer!: ICustomer;
  public selectedCustomers!: ICustomer[] | null;
  public customerDialog: boolean = false;
  public submitted: boolean = false;
  public newCustomer: boolean = true;
  public form = new FormGroup({
    cif: new FormControl(
      {
        value: this.newCustomer ? '' : this.customer.cif,
        disabled: !this.newCustomer,
      },
      [Validators.required]
    ),
    nombre: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    direccion: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    telefono: new FormControl({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    email: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.email,
    ]),
  });
  // public statuses!: any[];

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.CLIENTES);
    this.response$ = this.api.read<Pick<ICustomer, 'cif'>, ICustomer[]>();
  }

  public eventHandler = (ev: Event) => (ev.target as HTMLInputElement).value;
  public openNew() {
    this.customer = {
      cif: '',
      direccion: '',
      email: '',
      nombre: '',
      telefono: 0,
      fechaAlta: new Date(),
    };
    this.submitted = false;
    this.customerDialog = true;
    this.newCustomer = true;
  }
  /**
   * Elimina los customeres seleccionados.
   */
  // public deleteSelectedCustomers() {
  //   this.confirmationService.confirm({
  //     message: '¿Estás seguro de eliminar estos registros?',
  //     header: 'Confirmar',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.customers = this.customers.filter(
  //         (val) => !this.selectedCustomers?.includes(val)
  //       );
  //       this.selectedCustomers = null;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Registros eliminados',
  //         life: 3000,
  //       });
  //     },
  //     reject: () => (this.selectedCustomers = null),
  //   });
  // }
  /**
   * Abre el diálogo para editar un customere.
   * @param customer - Customere a editar.
   */
  public editCustomer(customer: ICustomer) {
    this.customer = { ...customer };
    this.customerDialog = true;
  }
  /**
   * Oculta el diálogo de cliente.
   */
  public hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
  }
  /**
   * Guarda un cliente.
   */
  public saveCustomer() {
    const customer = this.customers.find((x) => x.cif === this.customer.cif);
    this.submitted = true;
    if (this.customer.nombre?.trim()) {
      if (customer) {
        this.update();
      } else {
        this.create();
      }
      this.customers = [...this.customers];
      this.customerDialog = false;
      this.newCustomer = false;
      this.customer = {
        cif: '',
        direccion: '',
        email: '',
        nombre: '',
        telefono: 0,
        fechaAlta: new Date(),
      };
    }
  }
  public findIndexById(id: string): number {
    return this.customers.findIndex((x) => x.cif === id);
  }

  public confirmDelete(customer: ICustomer) {
    const confirmDelete = confirm(`¿Eliminar cliente ${customer.nombre}? Esta acción no se puede deshacer`)
    if (confirmDelete) {
      this.delete(customer.cif);
    }
    // this.confirmationService.confirm({
    //   message: `¿Eliminar cliente ${customer.nombre}?`,
    //   header: '¿Está seguro? Esta acción no se puede deshacer',
    //   icon: 'pi pi-exclamation-triangle',
    //   acceptLabel: 'Sí',
    //   rejectLabel: 'No',
    //   acceptButtonStyleClass: 'btn btn-danger mx-1 p-button-text',
    //   rejectButtonStyleClass: 'btn btn-primary mx-1 p-button-text',
    //   acceptIcon: 'none',
    //   rejectIcon: 'none',
    //   accept: () => this.delete(customer.cif),
    //   reject: () => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Rechazado',
    //       detail: 'Se ha cancelado la operación',
    //       life: 3000,
    //     });
    //   },
    // });
  }

  private delete(cif: string) {
    this.api.delete(cif).subscribe({
      next: (res) => {
        console.log(res);
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Aceptado',
        //   detail: 'Registro eliminado',
        // });
      },
      error: (err) => {
        console.error(err);
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Algo salió mal',
        //   life: 3000,
        // });
      },
    });
  }

  private update() {
    // this.customers[this.findIndexById(this.customer.cif)] = this.customer;
    this.api.update(this.customer).subscribe({
      next: (res) => {
        console.log(res);
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Aceptado',
        //   detail: 'Registro Actualizado',
        //   life: 3000,
        // });
      },
      error: (err) => {
        console.error(err);
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Algo salió mal',
        //   life: 3000,
        // });
      },
    });
  }

  private create() {
    this.api.create(this.customer).subscribe({
      next: (res) => {
        console.log(res);
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Aceptado',
        //   detail: 'Registro Creado',
        //   life: 3000,
        // });
      },
      error: (err) => {
        console.error(err);
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Algo salió mal',
        //   life: 3000,
        // });
      },
    });
  }
}
