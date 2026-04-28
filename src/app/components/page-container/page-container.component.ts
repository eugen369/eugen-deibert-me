import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import * as BlogSelectors from '../../store/blog/blog.selectors'
import * as BlogActions from '../../store/blog/blog.actions'

@Component({
    selector: 'app-page-container',
    imports: [CommonModule],
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {
    private store = inject(Store)
    private route = inject(ActivatedRoute)

    currentPage$ = this.store.select(BlogSelectors.selectCurrentPage)
    loading$ = this.store.select(BlogSelectors.selectLoading)
    error$ = this.store.select(BlogSelectors.selectError)

    ngOnInit(): void {
        const pageId = this.route.snapshot.data['pageId']
        if (pageId) {
            this.store.dispatch(BlogActions.loadPageById({ pageId }))
        }
    }
}
