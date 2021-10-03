import 'package:flutter/material.dart';

import 'SignUp/Widgets/video_player.dart';

class LoggedInScreen extends StatelessWidget {
  static const routeName = '/LoggedInScreen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SafeArea(child: VideoApp(vidPath: 'assets/bvide.mp4')),
    );
  }
}
