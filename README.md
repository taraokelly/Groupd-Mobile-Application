# Groupd-Mobile-Application
*A mobile application, developed using the ionic 2 framework, that acts as another front-end for Groupd - a social networking application to find team mates for start up projects. Third Year, Software Development.*

## Table of Contents

+ [Introduction](#introduction)
+ [About Groupd](#about-groupd)
+ [Why Groupd](#about-groupd)
+ [Original Idea](#original-idea)
+ [Goals](#goals)
+ [Technologies](#technologies)
+ [Issues](#issues)
+ [Conclusion](#conclusion)

## Introduction

Groupd-Mobile-Application was undertaken as an assignment for a semester long third year project. This assignment was devised and developed as a group project with [ImErvin](https://github.com/ImErvin). Groupd-Mobile-Application, the cross platform mobile application, is one of three repositories. The other two repositories include [Groupd-BackEnd]( https://github.com/ImErvin/Groupd-BackEnd), the groupd API with contributions from both parties, and [Groupd-FrontEnd](https://github.com/ImErvin/Groupd-FrontEnd), the web application developed by [ImErvin](https://github.com/ImErvin). For more details about Groupd, please go to the [About Groupd](#about-groupd) section.

Points to consider: 

+ Ionic 2 was a new technology for me, see [Technologies](#technologies) for more.
+ Due to unforseen circumstances my original end of year project idea did not work out, leaving me with just a month to start and complete a new end of year project, see [Original Idea](#original-idea) for more.

## About Groupd

Groupd is a social netwrking site devised to help users find team mates to work on a project idea they may have. Groupd was designed with developers in mind, however, Groupd in courages and welcomes users of all professions and needs to use this platform to find teammates. Together we developed a shared database(see [Why Groupd](#about-groupd) for database scheama) and RESTful API to manage our database and administer our CRUD features to assist our two front-ends(see [Groupd-BackEnd](https://github.com/ImErvin/Groupd-BackEnd) for full documentation). We wanted Groupd to allow users post their desired projects, communicate with other users and to work on projects with other users. Groupd can br used to recreationaly and/or to gain experience and to eventually build a portfolio from projects they have worked on, or to find team members for a start up business.

See [Groupd-FrontEnd](https://github.com/ImErvin/Groupd-FrontEnd) for full docmentation on the web application.

(will move the following to features)

I designed the Groupd-Mobile-Application with a sidemenu that intelligently knows when data changes. The user data provider is called to log a user in, triggers a logged in event to change the side menu. The user data also sets the user by storing the current user in local storage and triggering an event to alert any resources of the change. On every page load and reload the current user is reloaded from the API and user data provider will alert any resources of the changes, where the resources will asynchronously get the new data from storage.

## Why Groupd

After my detachment from [my original idea](#original-idea), I joined a classmates project, [ImErvin](https://github.com/ImErvin), who's project seemed very amicable to me. We were also both eager to work in group to experience and practice collaborating on Github. Ervin welcomed the idea of a mobile application equivalent to his web application. Joining to form a group we could add extra features. Together, we designed a new database scheama, attached below, and updated the API to correspond with these changes.

![alt text](https://github.com/taraokelly/Groupd-Mobile-Application/blob/master/img/Groupd-DB-Design.png "Database Shceama")

## Original Idea

My original idea was to build a windows desktop security app, Encrypt Keeper.

Encrypt Keeper would:

+ Be developed in C# and in Visual Studio.
+ Be published to the Windows Store.
+ Encrypt important files on log out.
+ Launch a background process on start-up.
+ Have Bluetooth enabled and an interface to discover Bluetooth devices.
+ Check bluetooth devices for the user's mobile mac address (which will be stored by using the GUI, described below).
+ If the mobile's mac address is a match, it will have a message box pop up to ask for the admin password.
+ If the password is a match, the files will be decrypted.
+ Implement a Handshake protocol with the device in every 5 seconds.
+ If no device was found, it would use the camera preview to access the camera, unknown to the user, and use facial recognition to compare with a photo of the user’s face.
+ If the face is not a match the user’s picture is sent to the user’s email account.
+ If the face is a match, like with the bluetooth authenication, the message box would appear to ask for the admin password.
+ There would be a mechanism for users to log into GUI application with another password to decrypt files if the facial recognition is at fault or the phone is at fault. The GUI can also be used to specify the folders to encrypt and the users credentials. Again if a user logs in to the GUI application another email can be sent to the user informing them of this.

Issues:

+ I could not find a way to start the windows universal app to run on start up, the user had to open the application once after start up to activate the background process.
+ An app that does launch start up would not have been approved by the windows store, to be more power efficient.
+ This application would be too demanding to be a windows service.

Although I have abandoned this idea as my end of year project, I do not wish to give up on implementing this project, maybe not as a windows store application. I have already implemented the facial recognition for an assignment where we had to create a Windows Universal Platform Application this semester, this WUP application can be found on Github: [Safe-Note](https://github.com/taraokelly/Safe-Note), and on the Windows Store: [Note Safe](https://www.microsoft.com/en-us/store/p/note-safe/9nvcc3qgf9c8)(the name Safe Note was not available at the time of submission). 

## Goals

## Technologies

## Issues

## Conclusion

**References:**

[Ionic Framework](http://ionicframework.com/docs/)

http://stackoverflow.com/questions/13935733/mongoose-limit-offset-and-count-query

https://www.w3schools.com/jsref/jsref_indexof.asp

https://ionicframework.com/docs/storage/

http://ionicframework.com/docs/ionicons/

https://www.joshmorony.com/custom-pipes-in-ionic-2/

https://www.npmjs.com/package/ng2-search-filter

https://www.youtube.com/watch?v=-zW1zHqsdyc

https://www.youtube.com/watch?v=8Gz-KBbDDXM

http://stackoverflow.com/questions/32069388/repeatedly-background-task-ionic-framework

https://github.com/yannbf/ionic2-components

http://stackoverflow.com/questions/17616624/detect-if-string-contains-any-spaces

https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/

http://stackoverflow.com/questions/35039610/angular2-manually-set-value-for-formbuilder-control

https://ionicframework.com/docs/v2/cli/generate/

https://www.youtube.com/watch?v=-yNJ-QrHvgc

https://ionicframework.com/docs/v2/resources/forms/

https://www.youtube.com/watch?v=-o_VGpJP-Q0

http://blog.ionic.io/10-minutes-with-ionic-2-adding-pages-and-navigation/

https://www.joshmorony.com/a-simple-guide-to-navigation-in-ionic-2/

http://reactivex.io/documentation/observable.html

https://www.youtube.com/watch?v=ei7FsoXKPl0

https://egghead.io/lessons/javascript-introducing-the-observable

https://www.youtube.com/watch?v=_frPHsE2PZk

http://stackoverflow.com/questions/36655379/ionic-2-templates

https://github.com/driftyco/ionic2-starter-sidemenu

https://ionicframework.com/docs/v2/api/components/menu/Menu/

https://blog.khophi.co/ionic-2-side-menu-tabs/

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/trim

http://pointdeveloper.com/how-to-place-ionic-2-tabs-at-the-bottom-or-top-of-the-screen/

http://www.neilberry.com/how-to-run-your-ionic-app-on-real-devices/

-----

__*Tara O'Kelly - G00322214@gmit.ie*__