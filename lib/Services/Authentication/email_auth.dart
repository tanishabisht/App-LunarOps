import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:uploadlunarops/Screens/loggedin_screen.dart';

class EmailAuth {
  String? _token;
  DateTime? _expiryDate;
  String? _userId;

  Future<void> signup(
      {required String email,
      required String password,
      required BuildContext context}) async {
    final url = Uri.parse(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYddzE9yqs4TNjQy-qH2IcNqnUJhPLGcE');
    final response = await http.post(url,
        body: json.encode(
            {'email': email, 'password': password, 'returnSecureToken': true}));
    print(json.decode(response.body));
    var res = json.decode(response.body);
    if (res['error'] != null) {
      throw Exception(res['error']);
    }
    ScaffoldMessenger.of(context)
        .showSnackBar(const SnackBar(content: Text('Welcome to Moon...')));

    _token = res['idToken'];
    _userId = res['localId'];
    Navigator.pushNamed(context, LoggedInScreen.routeName);
  }
}
