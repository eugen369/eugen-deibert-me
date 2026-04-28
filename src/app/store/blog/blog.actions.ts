import { createAction, props } from '@ngrx/store'
import { BlogPost } from '../../models/blog-post.model'

// Alle Posts laden
export const loadAllPosts = createAction('[Blog] Load All Posts')

export const loadAllPostsSuccess = createAction(
    '[Blog] Load All Posts Success',
    props<{ posts: BlogPost[] }>()
)

export const loadAllPostsFailure = createAction(
    '[Blog] Load All Posts Failure',
    props<{ error: string }>()
)

// Select Post
export const selectPost = createAction('[Blog] Select Post', props<{ postId: string }>())

export const clearSelection = createAction('[Blog] Clear Selection')

export const clearError = createAction('[Blog] Clear Error')

// Pages
export const loadPageById = createAction('[Page] Load Page by ID', props<{ pageId: string }>())
export const loadPageByIdSuccess = createAction(
    '[Page] Load Page by ID Success',
    props<{ page: BlogPost }>()
)
export const loadPageByIdFailure = createAction(
    '[Page] Load Page by ID Failure',
    props<{ error: string }>()
)
export const clearPage = createAction('[Page] Clear Page')
