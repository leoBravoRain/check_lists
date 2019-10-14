import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class Choose_One_Check_List extends StatelessWidget {
  Choose_One_Check_List({@required this.category});
  // Choose_One_Check_List({this.category});

  final category;
  var items;

  @override
  Widget build(BuildContext context) {
    // fake data
    items = List<String>.generate(100, (i) => "List $i");

    return Scaffold(
      appBar: AppBar(
        title: Text('Escoger lista de chequeo $category'),
      ),
      // body: Lists_of_List(),
      // body: ListView.builder(
      //   itemCount: items.length,
      //   itemBuilder: (context, index) {
      //     return ListTile(
      //       onTap: () => Navigator.pushNamed(
      //         context,
      //         '/check_list/${items[index]}',
      //       ),
      //       title: Row(
      //         children: <Widget>[
      //           Text('${items[index]}'),
      //         ],
      //       ),
      //     );
      //   },
      // ),

      body: StreamBuilder(
        stream: Firestore.instance.collection('MA_list').snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const Text("Loading...");
          return ListView.builder(
              itemCount: snapshot.data.documents.length,
              itemBuilder: (context, index) {
                return ListTile(
                  onTap: () => Navigator.pushNamed(
                    context,
                    '/check_list/${snapshot.data.documents[index]["name"]}',
                  ),
                  title: Row(
                    children: <Widget>[
                      Text(snapshot.data.documents[index]["name"]),
                      // Delete(snapshot.data.documents[index]["name"]),
                    ],
                  ),
                );
              });

          // ListView.builder(
          // itemCount: items.length,
          // itemBuilder: (context, index) {
          //   return ListTile(
          //     onTap: () => Navigator.pushNamed(
          //       context,
          //       '/check_list/${items[index]}',
          //     ),
          //     title: Row(
          //       children: <Widget>[
          //         Text('${items[index]}'),
          //       ],
          //     ),
          //   );
        },
      ),
    );
  }
}

// class Delete extends StatelessWidget {

//   print()

//   @override
//   Widget build(BuildContext context) {
//     return Text("hola");
//   }
// }
// class Lists_of_List extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return StreamBuilder<QuerySnapshot>(
//       stream: Firestore.instance.collection('MA_list').snapshots(),
//       builder: (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
//         if (snapshot.hasError)
//           return new Text('Error: ${snapshot.error}');
//         switch (snapshot.connectionState) {
//           case ConnectionState.waiting: return new Text('Loading...');
//           default:
//             return new ListView(
//               children: snapshot.data.documents.map((DocumentSnapshot document) {
//                 return new ListTile(
//                   title: new Text(document['name']),
//                   // subtitle: new Text(document['author']),
//                 );
//               }).toList(),
//             );
//         }
//       },
//     );
//   }
// }
