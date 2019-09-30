import 'package:flutter/material.dart';
import "./screens/home/home.dart";
import "./screens/choose_check_list/choose_check_list.dart";
import "./screens/choose_one_check_list/choose_one_check_list.dart";
import 'package:fluro/fluro.dart'; // Import fluro package.

void main() {
  // run app
  runApp(MyApp());
}
        ]
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    // Create the router.
    Router router = new Router();

    // Define our home page.
    router.define('home', handler: new Handler(
        handlerFunc: (BuildContext context, Map<String, dynamic> params) {
      return new Home_Screen();
    }));
    // Define our check list type page.
    router.define('choose_check_list_type', handler: new Handler(
        handlerFunc: (BuildContext context, Map<String, dynamic> params) {
      return new Choose_Check_List();
    }));
    // Define our choose one check list page.
    router.define('choose_one_check_list/:category', handler: new Handler(
        handlerFunc: (BuildContext context, Map<String, dynamic> params) {
      return new Choose_One_Check_List(category: params["category"][0]);
    }));

    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          // This is the theme of your application.
          //
          // Try running your application with "flutter run". You'll see the
          // application has a blue toolbar. Then, without quitting the app, try
          // changing the primarySwatch below to Colors.green and then invoke
          // "hot reload" (press "r" in the console where you ran "flutter run",
          // or simply save your changes to "hot reload" in a Flutter IDE).
          // Notice that the counter didn't reset back to zero; the application
          // is not restarted.
          primarySwatch: Colors.blue,
        ),
        home: new Home_Screen(),
        onGenerateRoute: router.generator // USe our Fluro routers for this app.
        // initialRoute : "/",
        // onGenerateRoute: _getRoute,
        // routes: {
        //   "/": (context) => Home_Screen(),
        //   "/choose_check_list_type": (context) => Choose_Check_List(),
        //   // "/choose_one_check_list": (context) => Choose_One_Check_List(Choose_One_Check_List({dynamic: 'city'})),
        // }
        );
  }
}
