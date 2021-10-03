import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:uploadlunarops/Services/Authentication/email_auth.dart';
import 'package:intl/intl.dart';

class Backend {
  Future<Stream<QuerySnapshot>> getNetworksList() async {
    return FirebaseFirestore.instance.collection("Networks").snapshots();
  }

  sendPhoto(String networkName, String imageUrl) async {
    final DateTime now = DateTime.now();
    final DateFormat formatter = DateFormat('dd-MM-yyyy_H:m:s');
    final String formatted = formatter.format(now);
    print(formatted); // something like 2013-04-20
    String? uid = await EmailAuth().getUID();
    String? name = await EmailAuth().getUserName();
    FirebaseFirestore.instance
        .collection("Networks")
        .doc(networkName)
        .collection("Main Logs")
        .doc('${formatted}_${name}')
        .set({
      'Message': imageUrl,
      'SendBy': name,
      'TimeStamp': formatted,
      'MessageType': '/IMAGES',
    });
  }
}
