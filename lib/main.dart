import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:uploadlunarops/Screens/Networks/network_list_Screen.dart';
import 'package:uploadlunarops/Screens/SignUp/signup_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(App());
}

class App extends StatefulWidget {
  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _initialization,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.connectionState == ConnectionState.done) {
          return MaterialApp(
            title: 'Upload Channel',
            home: SignupOptionScreen(),
          );
        }
        return const Center(child: CircularProgressIndicator());
      },
    );
  }
}
