import 'package:flutter/material.dart';

class Choose_Check_List extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Escoger tipo de lista'),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              onPressed: () {
                Navigator.pushNamed(
                  context,
                  '/choose_one_check_list/environment',
                );
              },
              child: Text("Lista de chequeos de medio ambiente"),
            ),
            RaisedButton(
              onPressed: () {
                Navigator.pushNamed(
                  context,
                  '/choose_one_check_list/security',
                );
              },
              child: Text("Lista de chequeos de seguridad"),
            )
          ],
        ));
  }
}
