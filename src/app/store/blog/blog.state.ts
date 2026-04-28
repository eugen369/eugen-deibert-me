import { BlogPost } from '../../models/blog-post.model'

export interface BlogState {
    posts: BlogPost[]
    currentPost: BlogPost | null
    currentPage: BlogPost | null
    selectedPostId: string | null
    loading: boolean
    error: string | null
}

export const initialBlogState: BlogState = {
    posts: [],
    currentPost: null,
    currentPage: null,
    selectedPostId: null,
    loading: false,
    error: null
}
