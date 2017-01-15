import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment/moment.module';
import { MyApp } from './app.component';
import { CalendarDateFormatter, CalendarEventTitle, CalendarModule } from 'angular-calendar';
import { Ionic2RatingModule } from 'ionic2-rating';

// import component
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/homepage/homepage';
import { PollPage } from '../pages/poll/poll';
import { AccountPage } from '../pages/account/account';
import { AppreciationTabs } from '../pages/appreciation/appreciationTabs';
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


// import modal
import { newComplaintModal } from '../pages/complaint/new/newComplaintModal';
import { viewComplaintModal } from '../pages/complaint/view/viewComplaintModal';
import { CommentComplaintModal } from '../pages/complaint/comment/comment.modal';
import { NewAppreciationModal } from '../pages/appreciation/new/appreciation';

// import custom component
import { ViewComponent } from '../customComponent/view/view.component';
import { ListView } from '../customComponent/list/listview.component';
import { ListViewCloseButton } from '../customComponent/list/listview.closebtn.component.ts';
import { ListViewCommentButton } from '../customComponent/list/listview.commentbtn.component.ts';
import { ListViewReopenButton } from '../customComponent/list/listview.reopenbtn.component.ts';
import { ListViewSatisfiedButton } from '../customComponent/list/listview.satisfiedbtn.component.ts';
import { CustomNavbar } from '../customComponent/navbar.component.ts';
import { ModalNavbarComponent } from '../customComponent/modal.navbar.component.ts';
import { CommentModal } from '../customComponent/commentModal.ts';

// import service
import { NetworkService } from '../service/network.service';
import { SafeHttp } from '../service/safe-http';
import { AuthService } from '../service/auth.service';
import { Configuration } from '../service/app.constants';
import { ParentInfo } from '../service/parentInfo';
import { ComplaintSuggestion } from '../service/cs.service';
import { CustomService } from '../service/customService';
import { EventService } from '../service/planner.service';
import { PollService } from '../service/poll.service';

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
    viewComplaintModal,
    CommentComplaintModal,
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
    viewComplaintModal,
    CommentComplaintModal,
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
    ViewComponent
  ],
  providers: [ AuthService, Configuration, ParentInfo, ComplaintSuggestion, NetworkService, SafeHttp, EventService, CalendarEventTitle,PollService, CustomService, { provide: CalendarDateFormatter, useClass: CustomDateFormatter }]
})
export class AppModule {}
