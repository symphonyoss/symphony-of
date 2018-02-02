/*
* Class representing a Symphony notification
*/



class Notify {

    constructor(title,options){
        var notificationsVersion = window.localStorage.getItem('notificationsVersion');
        var notificationsLocation = window.localStorage.getItem('notificationsLocation');
        var notificationsHeight = parseInt(window.localStorage.getItem('notificationsHeight'));
        var monitorInfo = JSON.parse(window.localStorage.getItem('monitorInfo'));
        
        
        let msg = options || {};
        console.log('Notification Options:', options);        
        msg.title =  title;
        let timeout = 5000;
        let clickHandle = () => {
            // KEEPING  THE BELOW JUST IN CASE - IF SYM CLICK API WORKS DELETE THIS
            // let targetWin = window.popouts[msg.data.streamId];
            // let ofTargetWin = fin.desktop.Window.wrap(targetWin.uuid, targetWin.name);
            // if(targetWin && !targetWin.hide) {
            //     window.winFocus(ofTargetWin)
            // } else {
            //     fin.desktop.InterApplicationBus.publish("note-clicked", msg.data.streamId);
            // }
        }
        let onClick = clickHandle;
        if (msg.sticky) {
            timeout = 60000*60*24; // 24 hours
            this.sticky = msg.sticky;
            // KEEPING  THE BELOW JUST IN CASE - IF SYM CLICK API WORKS DELETE THIS

            // onClick = () => { 
            //     clickHandle();
            //     this.notification.close();
            // }
        }
        if (notificationsVersion === "V1") {
          this.notification = new window.fin.desktop.Notification({
              url: `${window.targetUrl}notificationV1.html`,
              message: msg,
              onClick,
              timeout,
              opacity: 0.92
          });
        } else if (notificationsVersion === "V2") {
          var randomString = Math.random().toString(36).slice(-8);
          
          console.log("RIGHT BEFORE CREATING NEW NOTIFICATION")
          console.log("RIGHT BEFORE CREATING NEW NOTIFICATION")
          console.log("RIGHT BEFORE CREATING NEW NOTIFICATION")
          console.log("RIGHT BEFORE CREATING NEW NOTIFICATION")
          
          var notification = new window.fin.desktop.Window({
            customData: msg,
            name: msg.tag + randomString,
            defaultWidth: 300,
            defaultHeight: notificationsHeight,
            frame: false,
            resizeable: false,
            url: `${window.targetUrl}notificationV2.html`,
            opacity: 0.92,
            alwaysOnTop: true
          }, function (success) {
            // var conflict = false;
            // console.log("windows", Notify.openWindows);
            // 
            // var conflictIdx = -1;
            // console.log("notificationWindows before pruning", Notify.openWindows)
            // for (var i = 0; i < Notify.openWindows.length; i++) {
            //   var childWindow = Notify.openWindows[i];
            //   console.log('childWindow.name', childWindow.name)
            //   if (childWindow.name.includes(msg.tag)) {
            //     console.log("IN CHILDWINDOW.NAME")
            //     console.log(childWindow.name)
            //     console.log("INDEX", i);
            //     childWindow.close();
            //     conflict = true;
            //     conflictIdx = i;
            //   }
            // }
            // 
            // console.log("conflictIdx after pruning", conflictIdx);
            // console.log("conflict after pruning", conflict);
            // console.log("notificationsLocation", notificationsLocation)
            // console.log("Notify.openWindows AFTER PRUNING", Notify.openWindows)
            // 
            // 
            // 
            // if (conflict && notificationsLocation == "top-right" || notificationsLocation === "top-left") {
            //   var windowsToShift = Notify.openWindows.slice(conflictIdx + 1);
            //   console.log("IN SHIFT")
            //   console.log("windowsToShift", windowsToShift)
            // 
            //   for (var i = 0; i < windowsToShift.length; i++) {
            //     console.log("ANIMATING ", windowsToShift[i].name)
            //     windowsToShift[i].animate({
            //       position: {
            //         left: 0,
            //         top: ((notificationsHeight + 10) * -1),
            //         duration: 500,
            //         relative: true
            //       }
            //     }, {
            //       interrupt: false
            //     });
            //   } 
            // 
            //   Notify.openWindows.splice(conflictIdx, 1);
            // } else if (conflict === false && notificationsLocation === "bottom-right" || notificationsLocation === "bottom-left") {
            //   console.log("IN BOTTOM SHIFT NO CONFLICT")
            //   for (var i = 0; i < Notify.openWindows.length; i++) {
            //     Notify.openWindows[i].animate({
            //       position: {
            //         left: 0,
            //         top: ((notificationsHeight + 10) * -1),
            //         duration: 500,
            //         relative: true
            //       }
            //     }, {
            //       interrupt: false
            //     });
            //   }
            // } else if (conflict && notificationsLocation === "bottom-right" || notificationsLocation === "bottom-left") {
            //   var windowsToShift = Notify.openWindows.slice(conflictIdx + 1);
            //   console.log("IN BOTTOM")
            //   console.log("windowsToShift", windowsToShift)
            // 
            //   console.log("IN BOTTOM SHIFT CONFLICT")
            //   console.log("notificationsLocation", notificationsLocation)
            //   for (var i = 0; i < windowsToShift.length; i++) {
            //     windowsToShift[i].animate({
            //       position: {
            //         left: 0,
            //         top: ((notificationsHeight + 10) * -1),
            //         duration: 500,
            //         relative: true
            //       }
            //     }, {
            //       interrupt: false
            //     });
            //   }
            // 
            //   Notify.openWindows.splice(conflictIdx, 1);
            // }
            
            console.log("Notify.openWindows AFTER SHIFTING", Notify.openWindows)
            
            Notify.openWindows.push(notification);
            var notificationPosition = Notify.openWindows.length - 1;
            console.log("notificationPosition", notificationPosition);
            console.log("notificationPosition", notificationPosition);
            console.log("monitorInfo", monitorInfo)
            var rightBound = monitorInfo.primaryMonitor.availableRect.right;
            var rightBoundPlacement = rightBound - 300;
            var bottomBound = monitorInfo.primaryMonitor.availableRect.bottom;
            var bottomBoundPlacement = bottomBound - notificationsHeight;
            
            if (notificationsLocation === "top-right") {
              notification.moveTo(rightBoundPlacement, (notificationsHeight + 10) * notificationPosition);
            } else if (notificationsLocation === "top-left") {
              notification.moveTo(0, (notificationsHeight + 10) * notificationPosition);
            } else if (notificationsLocation === "bottom-left") {
              notification.moveTo(0, bottomBoundPlacement);
            } else {
              notification.moveTo(rightBoundPlacement, bottomBoundPlacement);
            }
            
            notification.show();
            console.log(success, "SUCCESS");
          }, function (err) {
            console.log(err, "ERROR");
          });
          
          this.notification = notification;
        }
        
        this._data = msg.data || null;
    }

    static get permission(){
        return "granted";
    }

    get data(){
        return this._data;
    }

    close(cb) {
        // This gets called immediately on a new notification...so commented out for now.  
        // this.notification.close();
        
        // var shiftNotification = this.notification;
        // 
        // fin.desktop.Application.getCurrent().getChildWindows(function(windows) {
        //   console.log("WINDOWSSS", windows)
        //   var notificationWindows = [];
        //   for (var i = 0; i < windows.length; i++) {
        //     var childWindow = windows[i];
        // 
        //     if (childWindow.name.includes("==")) {
        //       notificationWindows.push(childWindow);
        //     }
        //   }
        // 
        //   var conflictIdx = -1;
        //   for (var i = 0; i < notificationWindows.length; i++) {
        //     var childWindow = notificationWindows[i];
        //     console.log('childWindow.nameeee', shiftNotification.name)
        //     if (childWindow.name === obj.name) {
        //       console.log("IN CHILDWINDOW.NAMEEEE")
        //       console.log(childWindow.name)
        //       console.log("INDEXXXXX", i);
        //       conflictIdx = i;
        //     }
        //   }
        // 
        //   if (conflictIdx >= 0) {
        //     var windowsToShift = notificationWindows.slice(conflictIdx + 1);
        //     console.log("IN SHIFTTTT");
        //     console.log("windowsToShifttttt", windowsToShift);
        // 
        //     for (var i = 0; i < windowsToShift.length; i++) {
        //       windowsToShift[i].animate({
        //         position: {
        //           left: 0,
        //           top: -90,
        //           duration: 500,
        //           relative: true
        //         }
        //       });
        //     }
        //   }
        // 
        //   shiftNotification.close();
        // });
        console.log("CLOSE FUNCTION IS HIT WHAT")
        console.log("CLOSE FUNCTION IS HIT WHAT")
        console.log("CLOSE FUNCTION IS HIT WHAT")
        console.log("CLOSE FUNCTION IS HIT WHAT")
        console.log("CLOSE FUNCTION IS HIT WHAT")
        console.log("CB", cb)
        console.log("CB", cb)
        console.log("CB", cb)
        console.log("CB", cb)
        console.log("this", this)
        console.log("this", this)
        console.log("this", this)
        console.log("this", this)
        console.log("this", this)
        
        var notificationsVersion = window.localStorage.getItem('notificationsVersion')
        var notificationsLocation = window.localStorage.getItem('notificationsLocation')
        var notificationsHeight = parseInt(window.localStorage.getItem('notificationsHeight'))
        
        if (notificationsVersion === "V2") {
          // console.log("windows", Notify.openWindows);
          // 
          // var conflictIdx = -1;
          // console.log("notificationWindows", Notify.openWindows)
          // for (var i = 0; i < Notify.openWindows.length; i++) {
          //   var childWindow = Notify.openWindows[i];
          //   console.log('childWindow.name', childWindow.name)
          //   if (childWindow.name === this.notification.name) {
          //     console.log("IN CHILDWINDOW.NAME")
          //     console.log(childWindow.name)
          //     console.log("INDEX", i);
          //     childWindow.close();
          //     conflictIdx = i;
          //   }
          // }
          // 
          // console.log("conflictIdx", conflictIdx);
          // 
          // if (conflictIdx >= 0) {
          //   var windowsToShift = Notify.openWindows.slice(conflictIdx + 1);
          //   console.log("IN SHIFT")
          //   console.log("windowsToShift", windowsToShift)
          // 
          //   for (var i = 0; i < windowsToShift.length; i++) {
          //     windowsToShift[i].animate({
          //       position: {
          //         left: 0,
          //         top: ((notificationsHeight + 10) * -1),
          //         duration: 500,
          //         relative: true
          //       }
          //     }, {
          //       interrupt: false
          //     });
          //   }
          // 
          //   Notify.openWindows.splice(conflictIdx, 1);
          // }
          
          var conflict = false;
          console.log("windows", Notify.openWindows);
          
          var conflictIdx = -1;
          console.log("notificationWindows before pruning", Notify.openWindows)
          for (var i = 0; i < Notify.openWindows.length; i++) {
            var childWindow = Notify.openWindows[i];
            console.log('childWindow.name', childWindow.name)
            if (childWindow.name === this.notification.name) {
              console.log("IN CHILDWINDOW.NAME")
              console.log(childWindow.name)
              console.log("INDEX", i);
              childWindow.close();
              conflict = true;
              conflictIdx = i;
            }
          }
          
          console.log("conflictIdx after pruning", conflictIdx);
          console.log("conflict after pruning", conflict);
          console.log("notificationsLocation", notificationsLocation)
          console.log("Notify.openWindows AFTER PRUNING", Notify.openWindows)
          
          
          
          if (conflict && notificationsLocation == "top-right" || notificationsLocation === "top-left") {
            var windowsToShift = Notify.openWindows.slice(conflictIdx + 1);
            console.log("IN SHIFT")
            console.log("windowsToShift", windowsToShift)
            
            for (var i = 0; i < windowsToShift.length; i++) {
              console.log("ANIMATING ", windowsToShift[i].name)
              windowsToShift[i].animate({
                position: {
                  left: 0,
                  top: ((notificationsHeight + 10) * -1),
                  duration: 500,
                  relative: true
                }
              }, {
                interrupt: false
              });
            } 
            
            Notify.openWindows.splice(conflictIdx, 1);
          } else if (conflict === false && notificationsLocation === "bottom-right" || notificationsLocation === "bottom-left") {
            console.log("IN BOTTOM SHIFT NO CONFLICT")
            for (var i = 0; i < Notify.openWindows.length; i++) {
              Notify.openWindows[i].animate({
                position: {
                  left: 0,
                  top: ((notificationsHeight + 10) * -1),
                  duration: 500,
                  relative: true
                }
              }, {
                interrupt: false
              });
            }
          } else if (conflict && notificationsLocation === "bottom-right" || notificationsLocation === "bottom-left") {
            var windowsToShift = Notify.openWindows.slice(conflictIdx + 1);
            console.log("IN BOTTOM")
            console.log("windowsToShift", windowsToShift)
            
            console.log("IN BOTTOM SHIFT CONFLICT")
            console.log("notificationsLocation", notificationsLocation)
            for (var i = 0; i < windowsToShift.length; i++) {
              windowsToShift[i].animate({
                position: {
                  left: 0,
                  top: ((notificationsHeight + 10) * -1),
                  duration: 500,
                  relative: true
                }
              }, {
                interrupt: false
              });
            }
            
            Notify.openWindows.splice(conflictIdx, 1);
          }
        }
        
    }

    addEventListener(event, cb) {
      var notificationsVersion = window.localStorage.getItem('notificationsVersion')
      if (notificationsVersion === "V1") {
        if(event === 'click' && this.notification) {
            this.notification.noteWin.onClick = () => {
                if (this.sticky) {
                    this.notification.close();                    
                }
                cb({target:{callbackJSON:this._data}}); 
            }
        }
      } else {        
        if (event === 'click') {
          // On click of the body of the notification, the notification window is set to minimize, 
          // but on click of the "X", it closes. That way, we can choose to dismiss 
          // notifications instead of always directing to the chat window.
          this.notification.addEventListener('minimized', (e) => {
            console.log("IN MINIMIZED WHAT")
            cb({target:{callbackJSON:this._data}});
            this.close();
          });
          this.notification.addEventListener('blur', (e) => {
            console.log('BLURRRR');
            this.close();
          });
        }
      }
      
      
      
        // if(event === 'click' && this.notification) {
        //     this.notification.onClick = () => {
        //         if (this.sticky) {
        //             this.notification.close();                    
        //         }
        //         cb({target:{callbackJSON:this._data}}); 
        //     }
        // }
        // }
        // if(event === 'click') {
        //     this.notification.noteWin.onClick = cb.bind(this,this._data);
        // } else if(event === 'close') {
        //     this.notification.noteWin.onClose = cb
        // } else if(event === 'error') {
        //     this.notification.noteWin.onError = cb
        // }
    }

    removeEventListener(event, cb){
      var notificationsVersion = window.localStorage.getItem('notificationsVersion')
      
      if (notificationsVersion === "V2") {        
        if (event === 'click') {
          this.notification.removeEventListener('focused', () => {
            cb({target:{callbackJSON:this._data}});
            this.close();
          });
        }
      }
        // if(event === 'click') {
        //     // this.notification.noteWin.onClick = () => {};
        // } else if(event === 'close') {
        //     // this.notification.noteWin.onClose = () => {};
        // } else if(event === 'error') {
        //     // this.notification.noteWin.onError = () => {};
        // }
    }

    removeAllEvents(){
        // while(this.eventListeners.length) {
        //     removeEventListener(this.eventListeners.pop());
        // }
    }

    destroy(){
        // How is this different from close?
    }
}

Notify.openWindows = [];
// Notify.notificationsVersion = "V1";
// Notify.notificationsHeight = 80;
// if (Notify.monitorInfo === false) {
//   fin.desktop.System.getMonitorInfo(function (monitorInfo) {
//     Notify.monitorInfo = monitorInfo;
//   });
// }
// 
// 
// fin.desktop.Application.getCurrent().getManifest(function (manifest) {
//   console.log("IN GET MANIFEST", manifest.startup_app.symphonyNotifications)
//   console.log("IN GET MANIFEST", manifest.startup_app.symphonyNotifications)
//   console.log("IN GET MANIFEST", manifest.startup_app.symphonyNotifications)
//   console.log("IN GET MANIFEST", manifest.startup_app.symphonyNotifications)
//     if (manifest.startup_app.symphonyNotifications == "V2") {
//       console.log("IN IF")
//       console.log("IN IF")
//       console.log("IN IF")
//       Notify.notificationsVersion = "V2";
//       Notify.notificationsHeight = 60;
//     }
// });

window.addEventListener('load', () => {
  var notificationsVersion = window.localStorage.getItem('notificationsVersion')
  var notificationsHeight = parseInt(window.localStorage.getItem('notificationsHeight'))
  var thisWindow = fin.desktop.Window.getCurrent();
  
  const waitForElement = (query, count, cb) => {
      let elements = document.querySelectorAll(query);  
      if (query === '.field-configure-desktop-alerts' || query === '.app-settings') {
        console.log("ELEMENTS", elements);
      }
      if(elements.length) {            
        if (query === '.field-configure-desktop-alerts' || query === '.app-settings') {
          console.log("IN ELEMENTS LENGTH")
          console.log(elements.length);
          console.log(elements);
          console.log(cb);
          console.log(count);
        }
          cb(elements);
      } else {
          if(count<15) {
              count++;
              setTimeout(()=>waitForElement(query, count, cb),450)
          }
      }
  };

  if (thisWindow.name !== 'system-tray' && notificationsVersion === "V2"){
    console.log("IN MAIN WINDOWWWWW")
    console.log("IN MAIN WINDOWWWWW")
    console.log("IN MAIN WINDOWWWWW")
    console.log("IN MAIN WINDOWWWWW")
    console.log("IN MAIN WINDOWWWWW")
    
    function desktopAlertClickHandler(el) {
      el[0].children[0].addEventListener('click', (e) => {
        console.log("CLICK EVENT", e)
        var notificationPositioning = new window.fin.desktop.Window({
          autoShow: true,
          name: 'Notification Positioning Window',
          cornerRounding: {height: 2, width: 3},
          defaultWidth: 300,
          defaultHeight: 400,
          frame: true,
          resizeable: false,
          url: `${window.targetUrl}notification-positioning-window.html`,
          opacity: 1,
          alwaysOnTop: true
        })
      })
    }
    
    // Create Desktop Position window on CONFIGURE DESKTOP ALERT POSITIONS button
    waitForElement('.sym-menu-tooltip__target', 0, element => {
      console.log(" IN sym-menu-tooltip__target");
      element[0].addEventListener('click', function () {
        console.log("Clicked sym-menu-tooltip__target");
        
        waitForElement('.sym-menu-tooltip__overlay', 0, el1 => {
          console.log(" IN sym-menu-tooltip__overlay");
          
          el1[0].addEventListener('click', function () {
            console.log("clicked sym-menu-tooltip__overlay");
            
            waitForElement('.tempo-tabs__tab', 0, el2 => {
              console.log("in tempo-tabs__tab");
              
              el2[0].addEventListener('click', function () {
                console.log("clicked tempo-tabs__tab");
                waitForElement('.field-configure-desktop-alerts', 0, (el3) => desktopAlertClickHandler(el3))
              })
            })
            
            waitForElement('.field-configure-desktop-alerts', 0, (el4) => desktopAlertClickHandler(el4))
          })
        })
      })
    })
  }
});

