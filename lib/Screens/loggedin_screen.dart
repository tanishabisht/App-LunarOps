import 'package:flutter/material.dart';
import 'package:lunarops/Screens/Widgets/video_player.dart';

class LoggedInScreen extends StatelessWidget {
  static const routeName = '/LoggedInScreen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: VideoApp(vidPath: 'assets/bv.mp4')),
    );
  }
}
