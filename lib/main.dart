import 'package:flutter/material.dart';
import 'package:lunarops/Screens/loggedin_screen.dart';

import 'Screens/signup_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lunar Ops',
      home: SignupOptionScreen(),
      routes: {
        LoggedInScreen.routeName: (context) => LoggedInScreen(),
      },
    );
  }
}
