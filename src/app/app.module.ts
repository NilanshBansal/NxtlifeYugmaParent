import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment/moment.module';
import { MyApp } from './app.component';
import { CalendarDateFormatter, CalendarEventTitle, CalendarModule } from 'angular-calendar';
import { Ionic2RatingModule } from 'ionic2-rating';
import { RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { CustomHttpService } from '../service/default.header.service';

// import component
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';
import { PollPage } from '../pages/poll/poll';
import { AccountPage } from '../pages/account/account';
import { AppreciationTabs } from '../pages/appreciation/appreciationTabs';
import { CustomSelect } from '../customComponent/custom-select';
import { AppreciationForYou } from '../pages/appreciation/appreciationForYou/appreciation';
import { YourAppreciation } from '../pages/appreciation/yourAppreciation/appreciation';
import { ComplaintPage } from '../pages/complaint/complaint';
import { ReportIssuePage} from '../pages/reportIssue/reportIssue';
import { SurveyPage} from '../pages/survey/survey';
import { PlannerComponent } from '../pages/planner/planner.component';
import { EventModalPage } from '../pages/planner/view/planner-view';
import { CalendarTimelinePage } from '../pages/planner/timeline/planner-timeline';
import { CustomDateFormatter } from '../pages/planner/customDateFormatter';
import { SuggestionTabs } from '../pages/suggestion/suggestionTabs';
import { SuggestionForYou } from '../pages/suggestion/suggestionForYou/suggestion';
import { YourSuggestion } from '../pages/suggestion/yourSuggestion/suggestion';
import { StudentRating } from '../pages/rating/rating';
import { HomeworkComponent } from '../pages/homework/homework.component';
import { CircularComponent } from '../pages/circular/circular.component';
import { CircularViewComponent } from '../pages/circular/view/circular-view';
import { SurveyListPage } from '../pages/survey/list/survey-list';

// import modal
import { newComplaintModal } from '../pages/complaint/new/newComplaintModal';
import { ViewComponent } from '../pages/complaint/view/viewComplaintModal';
import { NewAppreciationModal } from '../pages/appreciation/new/appreciation';

// import custom component
import { ListView } from '../customComponent/list/listview.component';
import { ListViewCloseButton,
         ListViewReopenButton,
         ListViewSatisfiedButton,
         ListViewCommentButton } from '../customComponent/list/edit-cs-status-and-comment.component';
import { CustomNavbar } from '../customComponent/navbar.component.ts';
import { ModalNavbarComponent } from '../customComponent/modal.navbar.component.ts';
import { CommentModal } from '../customComponent/commentModal.ts';

// import service
import { NetworkService } from '../service/network.service';
import { AuthService } from '../service/auth.service';
import { Configuration } from '../service/app.constants';
import { ParentInfo } from '../service/parentInfo';
import { ComplaintSuggestion } from '../service/cs.service';
import { CustomService } from '../service/customService';
import { EventService } from '../service/planner.service';
import { PollService } from '../service/poll.service';
import { HomeworkService } from '../service/homework.service';
import { CircularService } from '../service/circular.servce';
import { SurveyService } from '../service/survey.service';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    LoginPage,
    PollPage,
    AccountPage,
    SuggestionTabs,
    YourSuggestion,
    SuggestionForYou,
    AppreciationTabs,
    AppreciationForYou,
    YourAppreciation,
    ComplaintPage,
    ReportIssuePage,
    SurveyPage,
    newComplaintModal,
    ViewComponent,
    ListView,
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewReopenButton,
    ListViewSatisfiedButton,
    ModalNavbarComponent,
    CommentModal,
    PlannerComponent,
    EventModalPage,
    CalendarTimelinePage,
    NewAppreciationModal,
    StudentRating,
    HomeworkComponent,
    CircularComponent,
    CircularViewComponent,
    SurveyListPage,
    CustomSelect,
    ViewComponent

  ],
  imports: [
    MomentModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Dashboard,
    LoginPage,
    PollPage,
    AccountPage,
    SuggestionTabs,
    YourSuggestion,
    SuggestionForYou,
    AppreciationTabs,
    AppreciationForYou,
    YourAppreciation,
    ComplaintPage,
    ReportIssuePage,
    SurveyPage,
    newComplaintModal,
    ViewComponent,
    ListView,
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewReopenButton,
    ListViewSatisfiedButton,
    ModalNavbarComponent,
    CommentModal,
    PlannerComponent,
    EventModalPage,
    CalendarTimelinePage,
    NewAppreciationModal,
    StudentRating,
    SurveyListPage,
    HomeworkComponent,
    CircularComponent,
    CircularViewComponent,
    CustomSelect,
    ViewComponent
  ],
  providers: [ AuthService, Configuration, ParentInfo, ComplaintSuggestion, NetworkService, EventService, CalendarEventTitle,PollService,HomeworkService,CircularService,SurveyService, CustomService, { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
    {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    }]
})
export class AppModule {}
