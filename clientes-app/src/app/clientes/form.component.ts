import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Formulario nuevo Cliente';
  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.cargarCliente()
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      respuesta => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', ` ${respuesta.mensaje}: Nombre -->  ${respuesta.cliente.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    console.log('Clicked!');
    console.log(this.cliente);
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe( params => {
        let id = params['id'];
        if(id) {
          this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
        }
      }
    )
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      respuesta => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', ` ${respuesta.mensaje}: Nombre -->  ${respuesta.cliente.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }
}