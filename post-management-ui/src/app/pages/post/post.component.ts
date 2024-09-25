import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  post: Post | null = null;
  mode: 'create' | 'edit' | 'view' = 'create';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.mode = data['type'];
      if (this.mode === 'edit' || this.mode === 'view') {
        const postId = this.route.snapshot.paramMap.get('id');
        if (postId) {
          this.postsService.getPost(+postId).subscribe(response => {
            this.post = response.data!;
            this.postForm.patchValue(this.post);
            if (this.post.image) {
              this.imagePreview = 'data:image/png;base64, ' + this.post.image;
            }
            if (this.mode === 'view') {
              this.postForm.disable();
            }
          });
        }
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    const post: Post = this.postForm.value;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        post.image = base64String;

        this.savePost(post);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      if (this.post?.image) {
        post.image = this.post.image;
      }
      this.savePost(post);
    }
  }

  savePost(post: Post) {
    if (this.mode === 'create') {
      this.postsService.addPost(post).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error(err)
      });
    } else if (this.mode === 'edit' && this.post) {
      post.id = this.post.id;
      this.postsService.updatePost(post).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error(err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}