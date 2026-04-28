import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as BlogActions from './blog.actions'
import { BlogPostService } from '../../services/blog-post.service'

@Injectable()
export class BlogEffects {
    private actions$ = inject(Actions)
    private blogPostService = inject(BlogPostService)

    loadAllPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.loadAllPosts),
            switchMap(() =>
                this.blogPostService.getAllPosts().pipe(
                    map(posts => BlogActions.loadAllPostsSuccess({ posts })),
                    catchError(error =>
                        of(BlogActions.loadAllPostsFailure({ error: error.message }))
                    )
                )
            )
        )
    )

    loadPageById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BlogActions.loadPageById),
            switchMap(({ pageId }) =>
                this.blogPostService.getPageById(pageId).pipe(
                    map(page =>
                        page
                            ? BlogActions.loadPageByIdSuccess({ page })
                            : BlogActions.loadPageByIdFailure({ error: 'Seite nicht gefunden' })
                    ),
                    catchError(error =>
                        of(BlogActions.loadPageByIdFailure({ error: error.message }))
                    )
                )
            )
        )
    )
}
