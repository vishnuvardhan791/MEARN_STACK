import { Component,  OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-user-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit{
  tasks:Task []=[];
  ngOnInit(): void {
    const allTasks = JSON.parse(localStorage.getItem('tasks')||'[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser')||'null');
    if(!currentUser) return;

    this.tasks = allTasks.filter((t:Task)=>t.userId==currentUser.id);
  }
}
