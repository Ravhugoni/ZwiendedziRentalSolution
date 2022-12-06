import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logEmail: any;
  users: any[];
  notifications :any =[]
  isNotReadNotifications :any =[]

  showBadge :boolean = true;

  constructor(private userServive:UserService,private router: Router,private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo()
  {
    if('loggedEmail' in sessionStorage)
    {
        this.getNotifications(),

        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userServive.GetAllUsers().subscribe((res:any) => {
          let result = res;
          
          this.users = result.filter(ress => ress.email === this.logEmail)
          // console.log(this.users);
       });
    }
    else
    {
      console.log('nonononoo');
    }
  }

  LogOut()
  {
    this.logEmail = sessionStorage.removeItem('loggedEmail'); 
    this.router.navigate(['/login']);
  }


  getNotifications()
  {
    this.notificationService.GetAllNotification().subscribe(async(data:any)=>{
      let result = data;

      await this.userInfo();

      this.notifications = result.filter(res => Number(res.RecipientId) === Number(this.users[0].id))
      this.isNotReadNotifications = this.notifications.filter(ress => ress.Read === false)

    })

  }

  hideBadge()
  {
    this.showBadge = false;

    this.isNotReadNotifications.forEach(element => {

      let notificationData = {
        Read: true
      }
      this.notificationService.updateNotification(element.Id, notificationData).subscribe((next) => {
      })

    });

  }

}
