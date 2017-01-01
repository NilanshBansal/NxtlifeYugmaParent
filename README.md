# Yugma For Parent

>Yugma is a school quality management App  for schools and  provides a better interface between parent and teachers.

Some Dynamic Feautres Of Yugma are:

>Complaint

>Thoughts 

>Events

>Feedback

>Suggestions

>Homework

>Timetable

>Food Menu



### Version
0.1 (beta)

### Technologies Used

Dillinger uses a number of open source projects to work properly:

* AngularJS 2
* Ionic 2 
* CSS3
* HTML5
* Gulp
* Mysql
* Underscore JS


>  NOTE: always use dev branch for latest source (features).




### Installation


You need nodejs to be installed :

```sh
[LINK]: http://nodejs.org/en/download/
```


You need ionic and cordova installed globally:

```sh
$ npm install -g cordova ionic
```

You need phoneGap installed :

```sh
$ npm install -g phonegap
```
You need Gulp installed globally:

```sh
$ npm i -g gulp
```



### Execution



Go to root directory of the Yugma folder and run the commands mentioned below:
```sh
$ npm  install
$ bower install
```
For ionic configuration run the commands mentioned below:
```sh
$ ionic platform add ios
$ ionic platform add android
```
You need to set gcm key to run yugma app
```sh
$ ionic config set gcm_key 562555006958
```

Finally run:
```sh
$ ionic serve
```


If you want to view in different platforms(android/ios):
```sh
$ ionic serve --lab
```
If you want to run remotely in your devices:
>Note: You should be having PhoneGap app installed on your devices.
```sh
$ phonegap serve 
```
>Note: By default push notification is disabled If you want to enable then run below command.
```sh
$ ionic config set dev_push false
```

License
----

All Rights Reserved With Nxtlife Technologies Ltd UK.
