import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="loading-datos">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .loading-datos {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      width: 100%;
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 5px solid #e0e0e0;
      border-top-color: #174a84;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinner {}
