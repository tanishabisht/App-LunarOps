import 'package:video_player/video_player.dart';
import 'package:flutter/material.dart';

class VideoApp extends StatefulWidget {
  String vidPath;
  VideoApp({required this.vidPath});
  @override
  _VideoAppState createState() => _VideoAppState();
}

class _VideoAppState extends State<VideoApp> {
  VideoPlayerController? _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.asset(widget.vidPath)
      ..initialize().then((_) {
        _controller!.setVolume(0.0);
        _controller!.setLooping(true);
        _controller!.play();
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: _controller!.value.isInitialized
          ? VideoPlayer(_controller!)
          : Container(),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller!.dispose();
  }
}
