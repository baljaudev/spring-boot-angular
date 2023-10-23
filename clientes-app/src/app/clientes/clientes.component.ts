import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientesLista: Cliente[]

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (clientesLista)  => this.clientesLista = clientesLista
    );
  }

  delete(cliente: Cliente): void {
   swal({
      title: '¿Estás seguro?',
      text: "¡No podrás revertirlo!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Elimínalo!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientesLista = this.clientesLista.filter(cli => cli !== cliente);
            swal(
            'Eliminado',
            'Elemento eliminado con éxito.',
            'success'
            )
          }                  
        )
      }
    })
  }

}
