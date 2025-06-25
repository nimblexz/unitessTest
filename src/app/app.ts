import { Component, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BaseEventFormComponent } from './base-event-form/base-event-form';

@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  constructor(private dialog: MatDialog) {
  }

  events = signal([
    {
      id: 1,
      name: 'Мероприятие 1',
      description: 'Описание 1',
      location: 'Место 1',
      type: 'Спортивное',
      numberOfParticipants: 56
    },
    {
      id: 2,
      name: 'Мероприятие 2',
      description: 'Описание 2',
      location: 'Место 2',
      type: 'Музыкальное',
      genreOfMusic: 'rap'
    },
    {
      id: 3,
      name: 'Мероприятие 3',
      description: 'Описание 3',
      location: 'Место 3',
      type: 'Спортивное',
      numberOfParticipants: 12
    },
    {
      id: 4,
      name: 'Мероприятие 4',
      description: 'Описание 4',
      location: 'Место 4',
      type: 'Музыкальное',
      genreOfMusic: 'rock'
    }
  ]);
  displayedColumns: string[] = ['name', 'description', 'location', 'type', 'numberOfParticipants', 'genreOfMusic', 'menu'];


  deleteEvent(id: number) {
    this.events.update(events => events.filter(e => e.id !== id));
  }

  openDialogForm(event: any = null) {
    this.dialog.open(BaseEventFormComponent, {
      data: {
        event,
        totalCount: this.events().length
      }
    }).afterClosed().subscribe((res: any) => {
      this.events.update(events =>
        events.some(e => e.id === res.id)
          ? events.map(e => e.id === res.id ? res : e) // Замена
          : [...events, res] // Добавление
      );
    });
  }
}
