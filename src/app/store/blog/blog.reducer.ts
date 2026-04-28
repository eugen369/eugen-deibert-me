import { createReducer, on } from '@ngrx/store'
import * as BlogActions from './blog.actions'
import { initialBlogState } from './blog.state'

export const blogReducer = createReducer(
    initialBlogState,

    on(BlogActions.loadAllPosts, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(BlogActions.loadAllPostsSuccess, (state, { posts }) => ({
        ...state,
        posts, // <- hier landen die Posts im Store
        loading: false
    })),

    on(BlogActions.loadAllPostsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(BlogActions.selectPost, (state, { postId }) => ({
        ...state,
        selectedPostId: postId
    })),

    on(BlogActions.clearSelection, state => ({
        ...state,
        selectedPostId: null,
        currentPost: null
    })),

    on(BlogActions.clearError, state => ({
        ...state,
        error: null
    })),

    // Pages
    on(BlogActions.loadPageById, state => ({ ...state, loading: true, error: null })),
    on(BlogActions.loadPageByIdSuccess, (state, { page }) => ({
        ...state,
        currentPage: page,
        loading: false
    })),
    on(BlogActions.loadPageByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(BlogActions.clearPage, state => ({ ...state, currentPage: null }))
)
