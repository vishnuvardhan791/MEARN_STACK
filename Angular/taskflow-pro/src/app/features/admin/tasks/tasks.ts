import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  users:User[]=[];
  tasks: Task[]=[];
  newTask: Task={
    id:0,
    title:'',
    description:'',
    priority:'low',
    deadline:'',
    completed:false,
    userId:0
  };

addTask(){
  const task:Task ={
    ...this.newTask,
    userId:Number(this.newTask.userId),
    id:Date.now()
  };

  this.tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(this.tasks));

  this.newTask={
    id: 0,
    title: '',
    description: '',
    priority: 'low',
    deadline: '',
    completed: false,
    userId: 0
  }

}
ngOnInit(): void {
  this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  this.users = JSON.parse(localStorage.getItem('users') || '[]');
}

toggleComplete(id: number) {
  this.tasks = this.tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

deleteTask(id: number) {
  this.tasks = this.tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

getUsername(userId: number) {
  const user = this.users.find(u => u.id == userId);
  return user ? user.username : 'Unknown';
}
}
