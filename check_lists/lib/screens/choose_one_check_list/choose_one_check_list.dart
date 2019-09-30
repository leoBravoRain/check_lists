import 'package:flutter/material.dart';

class Choose_One_Check_List extends StatelessWidget {

  Choose_One_Check_List({@required this.category});
  // Choose_One_Check_List({this.category});

  final category;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Escoger lista de chequeo'),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Text("$category"),
          ],
        ));
  }
}
