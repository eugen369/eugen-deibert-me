import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { CommonModule } from '@angular/common'
import * as BlogSelectors from '../../store/blog/blog.selectors'

@Component({
    selector: 'app-home',
    imports: [RouterLink, CommonModule],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class Home {
    private store = inject(Store)
    posts$ = this.store.select(BlogSelectors.selectAllPosts)
}
