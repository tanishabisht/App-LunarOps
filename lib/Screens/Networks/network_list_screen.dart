import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:uploadlunarops/Screens/Networks/NetworkScreen.dart';
import 'package:uploadlunarops/Screens/SignUp/Widgets/video_player.dart';
import 'package:uploadlunarops/Services/Authentication/backend.dart';
import 'package:image_picker/image_picker.dart';

class NetworkListScreen extends StatefulWidget {
  static const routeName = '/NetworkList';

  @override
  State<NetworkListScreen> createState() => _NetworkListScreenState();
}

class _NetworkListScreenState extends State<NetworkListScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: StreamBuilder<QuerySnapshot>(
          stream: FirebaseFirestore.instance.collection("Networks").snapshots(),
          builder: (context, snapshot) {
            return snapshot.hasData
                ? Stack(
                    children: [
                      VideoApp(
                        vidPath: 'assets/bv.mp4',
                      ),
                      Container(
                        color: Colors.transparent,
                        child: ListView.builder(
                            itemCount: snapshot.data!.docs.length,
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              var ds = snapshot.data!.docs[index];
                              return GestureDetector(
                                onTap: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (context) => NetworkScreen(
                                            networkName: ds.id,
                                          )));
                                },
                                child: Container(
                                  margin: const EdgeInsets.symmetric(
                                      horizontal: 10, vertical: 5),
                                  decoration: BoxDecoration(
                                      color: Colors.black45,
                                      borderRadius: BorderRadius.circular(10)),
                                  child: ListTile(
                                    title: Text(
                                      ds.id,
                                      style: const TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 18),
                                    ),
                                  ),
                                ),
                              );
                            }),
                      ),
                    ],
                  )
                : const Center(child: CircularProgressIndicator());
          }),
    ));
  }
}
