import 'package:flutter/material.dart';

class Home_Screen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Lista de chequeos'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Chequeos'),
          onPressed: () {
            print("click");
            // Navigate to the second screen using a named route.
            Navigator.pushNamed(context, '/choos_check_list_type');
          },
        ),
      ),
    );
  }
}
