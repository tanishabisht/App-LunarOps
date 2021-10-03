import 'dart:io';

import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:uploadlunarops/Services/Authentication/backend.dart';
import 'package:uploadlunarops/Services/Authentication/email_auth.dart';

class NetworkScreen extends StatefulWidget {
  String networkName;
  NetworkScreen({required this.networkName});

  @override
  State<NetworkScreen> createState() => _NetworkScreenState();
}

class _NetworkScreenState extends State<NetworkScreen> {
  String? uid;
  atStart() async {
    uid = await EmailAuth().getUID();
  }

  int ctr = 1;
  int increment() {
    return ctr++;
  }

  @override
  void initState() {
    atStart();
    super.initState();
  }

  String? currentUrl;

  var picker = ImagePicker();
  File? tileImage;
  Future store(BuildContext context) async {
    FirebaseStorage storage = FirebaseStorage.instance;
    Reference folder = storage
        .ref()
        .child(uid ?? "randomUser")
        .child("Photos")
        .child("photoNo ${increment()}");
    folder.putFile(tileImage!).then((link) async {
      String dlink = await link.ref.getDownloadURL();
      print("dlink is here $dlink");
      currentUrl = dlink;
      print('###########${widget.networkName}_${currentUrl}_$uid');
      Backend().sendPhoto(widget.networkName, currentUrl!);
    });
  }

  deleteImage(BuildContext context) {
    FirebaseStorage storage = FirebaseStorage.instance;
    storage
        .ref()
        .child("randomUser")
        .child("Photos")
        .child("GridTile Number1")
        .delete();
  }

  Future<void> fetchfromCamera(BuildContext context) async {
    final imageStore = await picker.getImage(source: ImageSource.camera);
    setState(() {
      tileImage = File(imageStore!.path);
    });
    await store(context);
    print("**************8");
  }

  Future<void> fetchfromGallery(BuildContext context) async {
    final imageStore = await picker.getImage(source: ImageSource.gallery);
    setState(() {
      tileImage = File(imageStore!.path);
    });
    await store(context);
  }

  Widget? UploadOptionDialog(BuildContext context) {
    return AlertDialog(
      contentPadding: EdgeInsets.all(0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
      content: Container(
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Container(
                child: Column(
                  children: <Widget>[
                    ListTile(
                      leading: Icon(Icons.landscape),
                      title: Text("Upload through gallery"),
                      onTap: () {
                        fetchfromGallery(context)
                            .then((value) => Navigator.of(context).pop());
                      },
                    ),
                    Divider(),
                    ListTile(
                      leading: Icon(Icons.camera),
                      title: Text("Take a live photo"),
                      onTap: () {
                        fetchfromCamera(context)
                            .then((value) => Navigator.of(context).pop());
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(
        children: <Widget>[
          tileImage != null
              ? Container(
                  height: MediaQuery.of(context).size.height * 0.85,
                  child: Image.file(tileImage!),
                )
              : Container(
                  height: MediaQuery.of(context).size.height * 0.85,
                ),
          Spacer(),
          GestureDetector(
            onTap: () {
              showDialog(
                  context: context,
                  builder: (context) {
                    return Align(
                        alignment: Alignment.bottomCenter,
                        child: UploadOptionDialog(context));
                  });
            },
            child: Container(
              alignment: Alignment.bottomCenter,
              color: Colors.black,
              height: MediaQuery.of(context).size.height * 0.1,
              width: double.infinity,
              child: const Center(
                child: Icon(
                  Icons.upload,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      )),
    );
  }
}
