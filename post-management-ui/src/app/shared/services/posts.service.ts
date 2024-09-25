import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ResultModel } from '../../models/result.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<ResultModel<Post[]>> {
    return this.httpClient.get<ResultModel<Post[]>>(`${this.apiUrl}/posts`);
  }

  getPost(id: number): Observable<ResultModel<Post>> {
    return this.httpClient.get<ResultModel<Post>>(`${this.apiUrl}/posts/${id}`);
  }

  addPost(post: Post): Observable<ResultModel<Post>> {
    return this.httpClient.post<ResultModel<Post>>(`${this.apiUrl}/posts`, post);
  }

  searchPosts(title: string): Observable<ResultModel<Post[]>> {
    return this.httpClient.get<ResultModel<Post[]>>(`${this.apiUrl}/posts?title=${title}`);
  }

  updatePost(post: Post): Observable<ResultModel<Post>> {
    return this.httpClient.put<ResultModel<Post>>(`${this.apiUrl}/posts/${post.id}`, post);
  }

  deletePost(id: number): Observable<ResultModel<Post>> {
    return this.httpClient.delete<ResultModel<Post>>(`${this.apiUrl}/posts/${id}`);
  }

}
