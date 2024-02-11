import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" [ngClass]="{'layout-config-active': appMain.configActive}" (click)="appMain.onConfigClick($event)">
            <h5>Menu Type</h5>
            <div class="field-radiobutton">
                <p-radioButton name="layoutMode" value="static" [(ngModel)]="app.layoutMode" inputId="layoutMode1"></p-radioButton>
                <label for="layoutMode1">Static</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="layoutMode" value="overlay" [(ngModel)]="app.layoutMode" inputId="layoutMode2"></p-radioButton>
                <label for="layoutMode2">Overlay</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="layoutMode" value="slim" [(ngModel)]="app.layoutMode" inputId="layoutMode3"></p-radioButton>
                <label for="layoutMode3">Slim</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="layoutMode" value="horizontal" [(ngModel)]="app.layoutMode" inputId="layoutMode4" (onClick)="app.profileMode = 'top'"></p-radioButton>
                <label for="layoutMode4">Horizontal</label>
            </div>

            <hr />

            <h5>Menu Color</h5>
            <div class="field-radiobutton">
                <p-radioButton name="menuMode" value="light" [(ngModel)]="app.menuMode" inputId="menuMode1"></p-radioButton>
                <label for="menuMode1">Light</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="menuMode" value="dark" [(ngModel)]="app.menuMode" inputId="menuMode2"></p-radioButton>
                <label for="menuMode2">Dark</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="menuMode" value="gradient" [(ngModel)]="app.menuMode" inputId="menuMode3"></p-radioButton>
                <label for="menuMode3">Gradient</label>
            </div>

            <hr />

            <h5>MegaMenu Color</h5>
            <div class="field-radiobutton">
                <p-radioButton name="megaMenuMode" value="light" [(ngModel)]="app.megaMenuMode"
                                inputId="megaMenuMode1"></p-radioButton>
                <label for="megaMenuMode1">Light</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="megaMenuMode" value="dark" [(ngModel)]="app.megaMenuMode"
                                inputId="megaMenuMode2"></p-radioButton>
                <label for="megaMenuMode2">Dark</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="megaMenuMode" value="gradient" [(ngModel)]="app.megaMenuMode"
                                inputId="megaMenuMode3"></p-radioButton>
                <label for="megaMenuMode3">Gradient</label>
            </div>

            <hr />

            <h5>User Menu Type</h5>
            <div class="field-radiobutton">
                <p-radioButton name="profileMode" value="inline" [disabled]="app.layoutMode === 'horizontal'" [(ngModel)]="app.profileMode" inputId="profileMode1"></p-radioButton>
                <label for="profileMode1">Inline</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="profileMode" value="top" [disabled]="app.layoutMode === 'horizontal'" [(ngModel)]="app.profileMode" inputId="profileMode2"></p-radioButton>
                <label for="profileMode2">Top</label>
            </div>

            <hr />

            <h5>Input Style</h5>
            <div class="field-radiobutton">
                <p-radioButton name="inputStyle" value="outlined" [(ngModel)]="app.inputStyle" inputId="inputStyle1"></p-radioButton>
                <label for="inputStyle1">Outlined</label>
            </div>
            <div class="field-radiobutton">
                <p-radioButton name="inputStyle" value="filled" [(ngModel)]="app.inputStyle" inputId="inputStyle2"></p-radioButton>
                <label for="inputStyle2">Filled</label>
            </div>

            <hr />

            <h5>Ripple Effect</h5>
            <p-inputSwitch [ngModel]="app.ripple" (onChange)="appMain.onRippleChange($event)"></p-inputSwitch>

            <hr />

            <h5>Special Themes</h5>
            <div class="layout-themes">
                <div *ngFor="let t of specialThemes">
                    <a style="cursor: pointer" (click)="changeTheme(t.name)"
                       [ngStyle]="!t.image?{'background-image': 'linear-gradient(to right, ' + t.color1 +','+ t.color2+')'}:{} ">
                        <img *ngIf="t.image" src="assets/layout/images/configurator/{{t.image}}.jpg"
                             [alt]="t.name"/>
                    </a>
                </div>
            </div>

            <h5>Solid Themes</h5>
            <div class="layout-themes">
                <div *ngFor="let t of themes">
                    <a style="cursor: pointer" (click)="changeTheme(t.name)" [ngStyle]="{'background-color': t.color}">
                    </a>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    specialThemes: any[];

    themes: any[];

    constructor(public appMain: AppMainComponent, public app: AppComponent) {
    }

    ngOnInit() {
        this.themes = [
            {name: 'blue', color: '#0071bc'},
            {name: 'cyan', color: '#00bfe7'},
            {name: 'green', color: '#4AA564'},
            {name: 'yellow', color: '#F9C642'},
            {name: 'purple', color: '#6A4AA5'},
            {name: 'pink', color: '#9f4488'},
            {name: 'bluegrey', color: '#4B6D7E'},
            {name: 'teal', color: '#07A089'},
            {name: 'orange', color: '#fe875d'},
            {name: 'grey', color: '#5B616B'},
        ];

        this.specialThemes = [
            {name: 'cappuccino', image: 'cappuccino'},
            {name: 'montreal', image: 'montreal'},
            {name: 'hollywood', image: 'hollywood'},
            {name: 'peak', image: 'peak'},
            {name: 'alive', color1: '#CB356B', color2: '#BD3F32'},
            {name: 'emerald', color1: '#348F50', color2: '#56B4D3'},
            {name: 'ash', color1: '#606c88', color2: '#3f4c6b'},
            {name: 'noir', color1: '#4b6cb7', color2: '#182848'},
            {name: 'mantle', color1: '#514A9D', color2: '#24C6DC'},
            {name: 'predawn', color1: '#00223E', color2: '#FFA17F'},
        ];
    }

    changeTheme(theme: string) {
        this.app.theme = theme;

        this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '.css');
        this.changeStyleSheetsColor('layout-css', 'layout-' + theme + '.css');
    }

    changeStyleSheetsColor(id, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = value;

        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }
}
