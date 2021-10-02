import 'package:flutter/material.dart';
import 'package:lunarops/Services/Authentication/Email_Auth.dart';

class SignupOptionScreen extends StatefulWidget {
  const SignupOptionScreen({Key? key}) : super(key: key);

  @override
  _SignupOptionScreenState createState() => _SignupOptionScreenState();
}

class _SignupOptionScreenState extends State<SignupOptionScreen> {
  String? userEmail, userPassword, confirmPassword;
  final GlobalKey<FormState> _formKey = GlobalKey();
  void _SignUp() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    _formKey.currentState!.save();
    if (userPassword == confirmPassword) {
      EmailAuth().signup(userEmail!, userPassword!);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Form(
        key: _formKey,
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 8),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const Text(
                'Sign Up',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 30),
              ),
              const SizedBox(
                height: 10,
              ),
              TextFormField(
                style: const TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold),
                validator: (value) {
                  if (value.toString().isEmpty) {
                    return 'This field cannot be empty';
                  }
                },
                onSaved: (val) {
                  userEmail = val!;
                },
                decoration: InputDecoration(
                  hintStyle: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold),
                  filled: true,
                  fillColor: Colors.indigo[200],
                  border: OutlineInputBorder(
                      borderSide: BorderSide.none,
                      borderRadius: BorderRadius.circular(15)),
                  labelText: 'Enter E-Mail',
                ),
                textInputAction: TextInputAction.next,
                onFieldSubmitted: (_) {},
              ),
              const SizedBox(
                height: 20,
              ),
              TextFormField(
                style: const TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold),
                validator: (value) {
                  if (value.toString().isEmpty) {
                    return 'This field cannot be empty';
                  }
                },
                onSaved: (val) {
                  userPassword = val!;
                },
                decoration: InputDecoration(
                  hintStyle: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold),
                  filled: true,
                  fillColor: Colors.indigo[200],
                  border: OutlineInputBorder(
                      borderSide: BorderSide.none,
                      borderRadius: BorderRadius.circular(15)),
                  labelText: 'Enter Password',
                ),
                textInputAction: TextInputAction.next,
                onFieldSubmitted: (_) {},
              ),
              const SizedBox(
                height: 20,
              ),
              TextFormField(
                style: const TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold),
                validator: (value) {
                  if (value.toString().isEmpty) {
                    return 'This field cannot be empty';
                  }
                },
                onSaved: (val) {
                  confirmPassword = val!;
                },
                decoration: InputDecoration(
                  hintStyle: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold),
                  filled: true,
                  fillColor: Colors.indigo[200],
                  border: OutlineInputBorder(
                      borderSide: BorderSide.none,
                      borderRadius: BorderRadius.circular(15)),
                  labelText: 'Confirm Password',
                ),
                textInputAction: TextInputAction.next,
                onFieldSubmitted: (_) {},
              ),
              const SizedBox(
                height: 20,
              ),
              TextButton(
                  onPressed: () {
                    _SignUp();
                  },
                  child: const Text(
                    'Sign-Up',
                    style: TextStyle(color: Colors.white),
                  ),
                  style: TextButton.styleFrom(
                    minimumSize: const Size(double.infinity, 50),
                    backgroundColor: Colors.indigo,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15)),
                  ))
            ],
          ),
        ),
      ),
    ));
  }
}
