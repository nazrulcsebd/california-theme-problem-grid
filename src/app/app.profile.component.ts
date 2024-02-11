import {Component} from '@angular/core';
import { AppMainComponent} from './app.main.component';
import {trigger, state, transition, style, animate} from '@angular/animations';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="user-profile">
            <a href="#" (click)="onProfileClick($event)" id="sidebar-profile-button">
                <img src="assets/layout/images/avatar.png" alt="california-layout"/>
                <span class="sidebar-profile-name">Pauline Harrell</span>
                <span class="sidebar-profile-role">Administrator</span>
            </a>

            <ul id="sidebar-usermenu" class="usermenu" [ngClass]="{'usermenu-active':app.usermenuActive}"
                [@menu]="app.isSlim()? app.usermenuActive ? 'visible' : 'hidden' :
                app.usermenuActive ? 'visibleAnimated' : 'hiddenAnimated'">
                <li #profile [ngClass]="{'menuitem-active':app.activeProfileItem === profile}">
                    <a href="#" (click)="onProfileItemClick($event,profile)">
                        <i class="pi pi-fw pi-user"></i>
                        <span class="topbar-item-name">Profile</span>
                    </a>
                </li>
                <li #settings [ngClass]="{'menuitem-active':app.activeProfileItem === settings}">
                    <a href="#" (click)="onProfileItemClick($event,settings)">
                        <i class="pi pi-fw pi-cog"></i>
                        <span class="topbar-item-name">Settings</span>
                        <i class="layout-menuitem-toggler pi pi-fw pi-angle-down"></i>
                    </a>
                    <ul>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-palette"></i>
                                <span>Change Theme</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-star"></i>
                                <span>Favorites</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-lock"></i>
                                <span>Lock Screen</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-image"></i>
                                <span>Wallpaper</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #messages [ngClass]="{'menuitem-active':app.activeProfileItem === messages}">
                    <a href="#" (click)="onProfileItemClick($event,messages)">
                        <i class="pi pi-fw pi-envelope"></i>
                        <span class="topbar-item-name">Messages</span>
                        <i class="layout-menuitem-toggler pi pi-fw pi-angle-down"></i>
                    </a>
                    <ul>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="onProfileSubItemClick($event)">
                                <img src="assets/layout/images/avatar1.png" width="25"/>
                                <span>Give me a call</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="onProfileSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="25"/>
                                <span>Sales reports attached</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="onProfileSubItemClick($event)">
                                <img src="assets/layout/images/avatar3.png" width="25"/>
                                <span>About your invoice</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="onProfileSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="25"/>
                                <span>Meeting today at 10pm</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="onProfileSubItemClick($event)">
                                <img src="assets/layout/images/avatar4.png" width="25"/>
                                <span>Out of office</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #notifications [ngClass]="{'menuitem-active':app.activeProfileItem === notifications}">
                    <a href="#" (click)="onProfileItemClick($event,notifications)">
                        <i class="pi pi-fw pi-bell"></i>
                        <span class="topbar-item-name">Notifications</span>
                        <i class="layout-menuitem-toggler pi pi-fw pi-angle-down"></i>
                    </a>
                    <ul>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-sliders-h"></i>
                                <span>Pending tasks</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-calendar"></i>
                                <span>Meeting today at 3pm</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-download"></i>
                                <span>Download documents</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="onProfileSubItemClick($event)">
                                <i class="pi pi-fw pi-ticket"></i>
                                <span>Book flight</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent {

    constructor(public app: AppMainComponent) {}

    onProfileClick(event) {
        this.app.usermenuClick = true;
        this.app.usermenuActive = !this.app.usermenuActive;
        event.preventDefault();
    }

    onProfileItemClick(event, item) {
        this.app.usermenuClick = true;
        if (this.app.activeProfileItem === item) {
            this.app.activeProfileItem = null; } else {
            this.app.activeProfileItem = item; }

        event.preventDefault();
    }

    onProfileSubItemClick(event) {
        event.preventDefault();
    }
}
