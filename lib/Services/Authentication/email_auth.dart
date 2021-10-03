import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:uploadlunarops/Screens/Networks/network_list_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class EmailAuth {
  String? _token;
  DateTime? _expiryDate;
  String? _userId;
  String? userName;
  Future<bool> saveUID(String getDisplayName) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString("uid", getDisplayName);
  }

  Future<String?> getUID() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('uid');
  }

  Future<bool> saveUserName(String getDisplayName) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString("name", getDisplayName);
  }

  Future<String?> getUserName() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('name');
  }

  Future<void> login(
      {required String email,
      required String password,
      required BuildContext context}) async {
    final url = Uri.parse(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYddzE9yqs4TNjQy-qH2IcNqnUJhPLGcE');
    final response = await http.post(url,
        body: json.encode(
            {'email': email, 'password': password, 'returnSecureToken': true}));
    print(json.decode(response.body));
    var res = json.decode(response.body);
    if (res['error'] != null) {
      throw Exception(res['error']);
    }
    _token = res['idToken'];
    _userId = res['localId'];
    saveUID(_userId!);
    var part = email.split('@');
    userName = part[0].trim();
    saveUserName(userName!);
    _expiryDate =
        DateTime.now().add(Duration(seconds: int.parse(res['expiresIn'])));
    Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => NetworkListScreen()),
        (Route<dynamic> route) => false);
  }
}
