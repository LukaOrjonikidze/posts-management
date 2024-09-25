import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {
  @Input() post!: Post;
  @Output() details = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(public authService: AuthService) {}

  onDetails() {
    this.details.emit(this.post.id);
  }

  onEdit() {
    this.edit.emit(this.post.id);
  }

  onDelete() {
    this.delete.emit(this.post.id);
  }
}
