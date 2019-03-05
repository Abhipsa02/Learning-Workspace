import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      // Its for initial use. But with every route change it will not update the id and name
    //  It will not update with page reload
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // The below code is for the updated data
    // What is  Observable
    // Here observable is used. Because Observable are used for asynchronous data fatching
    // asynchronous means when it will happen, how much time it will take all these things are not fixed
    // So we observe it by subscribing to it
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy() {
    // When you add your own subscription you must unsubscribe it.
    // Angular will do it for you regarding this route observables.
    this.paramsSubscription.unsubscribe();
  }

}
