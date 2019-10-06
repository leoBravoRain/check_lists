import 'package:flutter/material.dart';

class Check_List extends StatelessWidget {
  Check_List({@required this.list});

  final list;
  var questions;

  @override
  Widget build(BuildContext context) {
    // fake data
    // questions = List<Question>.generate(100, (i) => Question());
    print(questions);
    return Scaffold(
        appBar: AppBar(
          title: Text('$list'),
        ),
        body: Check_List_Form());
  }
}

class Check_List_Form extends StatefulWidget {
  @override
  Check_List_Form_State createState() => Check_List_Form_State();
}

class Check_List_Form_State extends State<Check_List_Form> {
  
  // unique id for form
  final form_key = GlobalKey<FormState>();

  final questions_length = 50;

  // get data
  final questions = List<String>.generate(50, (i) => "Question $i");

  // responses
  var responses = List<bool>.generate(50, (i) => false);

  @override
  Widget build(BuildContext context) {

    return Form(
      key: form_key,
      child: Column(
        children: <Widget>[
          TextFormField(
            decoration:
                new InputDecoration.collapsed(hintText: 'Nombre Completo'),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter some text';
              }
              return null;
            },
          ),
          Expanded(
            child: SizedBox(
              // SizedBox(
              height: 100.0,
              child: ListView.builder(
                scrollDirection: Axis.vertical,
                itemCount: 50,
                itemBuilder: (context, index) {
                  return CheckboxListTile(
                    title: new Text(questions[index]),
                    value: responses[index],
                    onChanged: (bool value) {
                      setState(() {
                        responses[index] = value;
                      });
                    },
                  );
                },
              ),
            ),
          ),
          RaisedButton(
              onPressed: () {
                print(responses);
                if (form_key.currentState.validate()) {
                  // send form to server
                  print(form_key.currentContext);
                  print("Form ok");
                } else {
                  print("not validate");
                }
              },
              child: Text("Enviar")),
        ],
      ),
    );
  }
}

// class Question extends StatefulWidget {
//   Question({this.question});

//   final String question;

//   // Create state
//   @override
//   Question_State createState() => Question_State(question: question);
// }

// class Question_State extends State<Question> {
//   Question_State({this.question});

//   final String question;

//   bool _value = false;

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: <Widget>[
//         Text(question),
//         Checkbox(
//           value: _value,
//           onChanged: (bool value) => {
//             setState(() {
//               _value = value;
//             })
//           },
//         )
//       ],
//     );
//   }
// }
