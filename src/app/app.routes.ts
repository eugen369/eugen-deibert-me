import { Routes } from '@angular/router'
import { Home } from './components/home/home'
import { BlogPostContainerComponent } from './components/blog-post-container/blog-post-container.component'
import { PageContainerComponent } from './components/page-container/page-container.component'

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'post/:id', component: BlogPostContainerComponent },
    { path: 'about', component: PageContainerComponent, data: { pageId: 'about' } },
    { path: 'coding', component: PageContainerComponent, data: { pageId: 'coding' } },
    { path: 'contact', component: PageContainerComponent, data: { pageId: 'contact' } },
    { path: 'skills', component: PageContainerComponent, data: { pageId: 'skills' } },
    { path: 'projects', component: PageContainerComponent, data: { pageId: 'projects' } }
]
