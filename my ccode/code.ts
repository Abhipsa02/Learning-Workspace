//  filter

// Decimal 2 digits
        // {{ number | number : '1.2-2'}}
        // The parameter has this syntax:
        // {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}

// Case camelcase
        // {{data.key | titlecase }}

// route Refresh
        // this.router.routeReuseStrategy.shouldReuseRoute = function () {
        //     return false;
        //   };

// route back
        // this.location.back();

// timer
        // import { interval } from 'rxjs';
        // interval(3000).subscribe(x => /* do something */)
        // import { interval } from 'rxjs';
        // import { map } from 'rxjs/operators'

        // this.$counter = interval(1000).pipe(
        //    map((x) => {
        //       this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        //       return x;
        //   });
        // )

//scroll to top
        // https://medium.com/@miladhi/always-scroll-to-top-of-the-page-with-this-simple-angular-plugin-8e6eec487108

// loading Problem
        // https://stackoverflow.com/questions/40894704/how-can-i-improve-load-performance-of-angular2-apps
        // https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html

// Group by
        // http://www.competa.com/blog/custom-groupby-pipe-angular-4/

// Apache
        // https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-16-04#step-4-manage-the-apache-process

// Conversion
        // var n = +"1"; // the unary + converts to number
        // var b = !!"2"; // the !! converts truthy to true, and falsy to false
        // var s = ""+3; // the ""+ converts to string via toString()

// write inside doughnut graph
// https://jsfiddle.net/mgyp0jkk/

//   for (let index = 0; index < this.barChartData[0].data.length; index++) {
        // if (this.barChartData[0].data[index] > 0 &&  this.barChartData[0].data[index] < 3 ) {
        //         console.log('>0' , this.barChartData[0].data[index]);
        //         this.barChartData[0].label[index] = '0 to 3';
        //         this.lineChartColors[0].backgroundColor[index] = 'rgba(63, 191, 127,  0.4)';
        //       }
        //       if (this.barChartData[0].data[index] >= 3 &&  this.barChartData[0].data[index] < 5) {
        //         console.log('>3' , this.barChartData[0].data[index]);
        //         this.barChartData[0].label[index] = '3 to 5';
        //         this.lineChartColors[0].backgroundColor[index] = 'rgba(191, 63, 63, 0.4)';
        //       }
        //       if (this.barChartData[0].data[index] >= 5 ) {
        //         console.log('>5' , this.barChartData[0].data[index]);
        //         this.barChartData[0].label[index] = 'above 5';
        
        //         this.lineChartColors[0].backgroundColor[index] = 'rgba(191, 127, 63,  0.4)';
        //       }
        //     }
// Es6 Changes
        // https://medium.freecodecamp.org/make-your-code-cleaner-shorter-and-easier-to-read-es6-tips-and-tricks-afd4ce25977c
        // http://es6-features.org/#BlockScopedVariables
        // https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
        // https://hacks.mozilla.org/category/es6-in-depth/
        // http://es6-features.org/#StatementBodies
