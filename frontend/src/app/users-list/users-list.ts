import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  fullName: string;
  email: string;
}

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  private http = inject(HttpClient);
  public users = signal<User[]>([]);

  ngOnInit() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(data => {
      this.users.set(data);
    });
  }
}
