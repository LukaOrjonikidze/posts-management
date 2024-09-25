import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostItemComponent } from "../../components/post-item/post-item.component";
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [PostItemComponent, CommonModule],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css'
})
export class PostsPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private searchSubject = new Subject<string>();

  constructor(private postsService: PostsService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((result) => {
      this.posts = result.data!;
    });

    this.searchSubject.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((title) => {
      this.postsService.searchPosts(title).subscribe((result) => {
        this.posts = result.data!;
      });
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }

  addPost() {
    this.router.navigate(['/create']);
  }

  searchPosts(event: Event) {
    const title = (event.target as HTMLInputElement).value;
    this.searchSubject.next(title);
  }

  onDetails(id: number) {
    this.router.navigate([`/post/${id}`]);
  }

  onEdit(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }

  onDelete(id: number) {
    this.postsService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((p) => p.id !== id);
    });
  }
}
