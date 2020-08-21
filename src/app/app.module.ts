import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { EditorComponent } from './pages/editor/editor.component';
import { PadComponent } from './components/pad/pad.component';
import { OutputComponent } from './components/output/output.component';
import { ConsoleComponent } from './components/console/console.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditorState } from './store/editor.state';
import { CodeState } from './store/code.state';
import { LogState } from './store/log.state';

import { PadTogglerComponent } from './components/header/pad-toggler/pad-toggler.component';
import { RunCtrlComponent } from './components/run-ctrl/run-ctrl.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { A11yModule } from '@angular/cdk/a11y';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieNoticeComponent } from './components/cookie-notice/cookie-notice.component';
import { SaveComponent } from './components/header/save/save.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { SrvcComponent } from './components/srvc/srvc.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdsenseModule } from 'ng2-adsense';
import { OptionsDialogComponent } from './components/pad/options-dialog/options-dialog.component';
import { PreprocessorComponent } from './components/pad/options-dialog/preprocessor/preprocessor.component';
import { MonacoState } from './store/monaco.state';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    PadComponent,
    OutputComponent,
    ConsoleComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    PadTogglerComponent,
    RunCtrlComponent,
    CookieNoticeComponent,
    SaveComponent,
    MenuComponent,
    SrvcComponent,
    OptionsDialogComponent,
    PreprocessorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([EditorState, CodeState, LogState, MonacoState]),
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.

    MatGridListModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    A11yModule,
    MatDialogModule,
    OverlayModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatMenuModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    AdsenseModule.forRoot({}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
