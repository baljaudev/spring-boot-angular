import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Bienvenido a Angular';
  curso: string = 'Curso Spring con Angular';
  alumno: string = 'Created by: Rubén';
}
