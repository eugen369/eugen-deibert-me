import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { forkJoin, map, Observable, of, switchMap } from 'rxjs'
import { BlogPost } from '../models/blog-post.model'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

DOMPurify.addHook('afterSanitizeAttributes', node => {
    if (node.nodeName !== 'A') return

    const link = node as HTMLAnchorElement
    const href = link.getAttribute('href')
    if (!href || !/^https?:\/\//i.test(href)) return

    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
})

@Injectable({
    providedIn: 'root'
})
export class BlogPostService {
    private http = inject(HttpClient)

    private loadContent(post: BlogPost): Observable<BlogPost> {
        if (!post.contentUrl) {
            return of(post)
        }
        return this.http.get(post.contentUrl, { responseType: 'text' }).pipe(
            map(markdown => ({
                ...post,
                content: DOMPurify.sanitize(marked(markdown) as string)
            }))
        )
    }

    getAllPosts(): Observable<BlogPost[]> {
        return this.http
            .get<BlogPost[]>('assets/data/posts.json')
            .pipe(switchMap(posts => forkJoin(posts.map(post => this.loadContent(post)))))
    }

    getPageById(pageId: string): Observable<BlogPost | null> {
        return this.http.get<BlogPost[]>('assets/data/pages.json').pipe(
            switchMap(pages => {
                const page = pages.find(p => p.id === pageId) ?? null
                if (!page) return of(null)
                return this.loadContent(page)
            })
        )
    }
}
