import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './competition.component.html',
})
export class CompetitionComponent {
  comingSoon = signal(true);
}
