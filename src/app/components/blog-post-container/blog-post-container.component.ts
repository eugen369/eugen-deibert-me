import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { BlogPost } from '../../models/blog-post.model'
import { Store } from '@ngrx/store'
import { AppState } from '../../store/app.state'
import * as BlogSelectors from '../../store/blog/blog.selectors'
import * as BlogActions from '../../store/blog/blog.actions'

@Component({
    selector: 'app-blog-post-container',
    imports: [CommonModule],
    templateUrl: './blog-post-container.component.html',
    styleUrls: ['./blog-post-container.component.scss']
})
export class BlogPostContainerComponent implements OnInit {
    private store = inject(Store<AppState>)
    private route = inject(ActivatedRoute)
    private router = inject(Router)

    isStaticPage = this.route.snapshot.data['postId'] != null

    currentPost$: Observable<BlogPost | null> = this.store.select(BlogSelectors.selectSelectedPost)
    loading$: Observable<boolean> = this.store.select(BlogSelectors.selectLoading)
    errors$: Observable<string | null> = this.store.select(BlogSelectors.selectError)

    ngOnInit(): void {
        // Erst prüfen, ob eine feste ID in den Route-Data hinterlegt ist
        const dataId = this.route.snapshot.data['postId']

        // Sonst die dynamische ID aus dem URL-Parameter nehmen
        const paramId = this.route.snapshot.paramMap.get('id')

        const postId = dataId ?? paramId

        if (postId) {
            this.store.dispatch(BlogActions.selectPost({ postId }))
        }
    }

    goBack(): void {
        this.router.navigate(['/'])
    }

    dismissError(): void {
        this.store.dispatch(BlogActions.clearError())
    }
}
