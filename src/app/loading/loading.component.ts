import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  isLoading: boolean = true;

  // Simula la carga de datos
  simulateDataLoading() {
    setTimeout(() => {
      // this.isLoading = false;
    }, 3000);
  }
}
