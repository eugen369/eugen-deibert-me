import { Component, inject, signal } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { Store } from '@ngrx/store'
import * as BlogActions from './store/blog/blog.actions'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    private store = inject(Store)

    isDarkMode = signal(true)
    isMenuOpen = signal(true)

    ngOnInit() {
        this.store.dispatch(BlogActions.loadAllPosts())
        const saved = localStorage.getItem('theme')
        if (saved === 'light') {
            this.isDarkMode.set(false)
            document.body.classList.add('light')
        }
    }

    toggleTheme() {
        this.isDarkMode.update(v => !v)
        // document.body.classList.toggle('light')

        if (this.isDarkMode()) {
            document.body.classList.remove('light')
        } else {
            document.body.classList.add('light')
        }
        localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light')
    }

    toggleMenu() {
        this.isMenuOpen.update(v => !v)
    }

    closeMenu() {
        this.isMenuOpen.set(false)
    }
}
