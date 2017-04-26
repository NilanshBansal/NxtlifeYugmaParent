import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment/moment.module';
import { MyApp } from './app.component';
import { Ionic2RatingModule } from 'ionic2-rating';
import { RequestOptions, XHRBackend } from '@angular/http';
import { CustomHttpService } from '../service/default.header.service';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { NgCalendarModule  } from 'ionic2-calendar';

// import component
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { PollPage } from '../pages/poll/poll';
import { AccountPage } from '../pages/account/account';
import { AppreciationTabs } from '../pages/appreciation/appreciationTabs';
import { CustomSelect } from '../custom-component/custom-select';
import { AppreciationForYou } from '../pages/appreciation/appreciationForYou/appreciation';
import { YourAppreciation } from '../pages/appreciation/yourAppreciation/appreciation';
import { ComplaintPage } from '../pages/complaint/complaint';
import { ReportIssuePage} from '../pages/reportIssue/reportIssue';
import { SurveyPage} from '../pages/survey/survey';
import { StudentRating } from '../pages/rating/rating';
import { HomeworkTabs } from '../pages/homework/homeworkTabs';
import { CurrentHomework } from '../pages/homework/current/homework';
import { PassedHomework } from '../pages/homework/passed/homework';
import { CircularComponent } from '../pages/circular/circular.component';
import { CircularViewComponent } from '../pages/circular/view/circular-view';
import { SurveyListPage } from '../pages/survey/list/survey-list';
import { MessagePage } from '../pages/message/message';
import { EventComponent } from '../pages/event/event';
import { FoodMenu } from '../pages/foodmenu/foodmenu';

// import modal
import { newComplaintModal } from '../pages/complaint/new/newComplaintModal';
import { ViewComponent } from '../pages/complaint/view/viewComplaintModal';
import { NewAppreciationModal } from '../pages/appreciation/new/appreciation';
import { NewMessagePage } from '../pages/message/new/new';
import { ViewMessagePage } from '../pages/message/view/view';
import { ViewEvent } from '../pages/event/view/event';
import { TimelinePage } from '../pages/event/timeline/timeline';

// import custom component
import { ListView } from '../custom-component/list/listview.component';
import { ListViewCloseButton,
         ListViewReopenButton,
         ListViewSatisfiedButton,
         ListViewCommentButton } from '../custom-component/list/edit-cs-status-and-comment.component';
import { CustomNavbar } from '../custom-component/navbar.component.ts';
import { ModalNavbarComponent } from '../custom-component/modal.navbar.component.ts';
import { CommentModal } from '../custom-component/commentModal.ts';
import { NoInternet } from '../custom-component/noInternet.component';

// import service
import { NetworkService } from '../service/network.service';
import { AuthService } from '../service/auth.service';
import { Configuration } from '../service/app.constants';
import { ParentInfo } from '../service/parentInfo';
import { ComplaintSuggestion } from '../service/cs.service';
import { CustomService } from '../service/custom.service';
import { PollService } from '../service/poll.service';
import { HomeworkService } from '../service/homework.service';
import { CircularService } from '../service/circular.servce';
import { SurveyService } from '../service/survey.service';
import { MessageService } from '../service/message.service';
import { CommonService } from '../service/common.service';
import { EventService } from '../service/event.service';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    LoginPage,
    PollPage,
    AccountPage,
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
    NewAppreciationModal,
    StudentRating,
    HomeworkTabs,
    CurrentHomework,
    PassedHomework,
    CircularComponent,
    CircularViewComponent,
    SurveyListPage,
    CustomSelect,
    ViewComponent,
    NoInternet,
    MessagePage,
    NewMessagePage,
    ViewMessagePage,
    EventComponent,
    ViewEvent,
    TimelinePage,
    FoodMenu
  ],
  imports: [
    MomentModule,
    Ionic2RatingModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Dashboard,
    LoginPage,
    PollPage,
    AccountPage,
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
    NewAppreciationModal,
    StudentRating,
    SurveyListPage,
    HomeworkTabs,
    CurrentHomework,
    PassedHomework,
    CircularComponent,
    CircularViewComponent,
    CustomSelect,
    ViewComponent,
    NoInternet,
    MessagePage,
    NewMessagePage,
    ViewMessagePage,
    EventComponent,
    ViewEvent,
    TimelinePage,
    FoodMenu
  ],
  providers: [AuthService, Configuration, ParentInfo, ComplaintSuggestion, NetworkService, CustomService,
              EventService, PollService, HomeworkService, CircularService, SurveyService,
              MessageService, CommonService, Camera, File, Transfer, FileChooser, EventService,
              { provide: CustomHttpService, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
                return new CustomHttpService(backend, defaultOptions);
              }, deps: [XHRBackend, RequestOptions]}]
})
export class AppModule {}
