import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BlogState } from './blog.state'

export const selectBlogState = createFeatureSelector<BlogState>('blog')

export const selectAllPosts = createSelector(selectBlogState, (state: BlogState) => state.posts)

export const selectCurrentPost = createSelector(
    selectBlogState,
    (state: BlogState) => state.currentPost
)

export const selectLoading = createSelector(selectBlogState, (state: BlogState) => state.loading)

export const selectError = createSelector(selectBlogState, (state: BlogState) => state.error)

export const selectSelectedPostId = createSelector(
    selectBlogState,
    (state: BlogState) => state.selectedPostId
)

export const selectPostById = (postId: string) =>
    createSelector(selectAllPosts, posts => posts.find(post => post.id === postId) || null)

export const selectSelectedPost = createSelector(
    selectAllPosts,
    selectSelectedPostId,
    (posts, selectedId) => posts.find(p => p.id === selectedId) ?? null
)

// Page
export const selectCurrentPage = createSelector(selectBlogState, state => state.currentPage)
