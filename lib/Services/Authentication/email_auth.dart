import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class EmailAuth {
  String? _token;
  DateTime? _expiryDate;
  String? _userId;

  Future<void> signup(String email, String password) async {
    final url = Uri.parse(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDttjNKuUs-R0bFhTrBF6Vp6udiXYpS8Dc');
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
  }
}
