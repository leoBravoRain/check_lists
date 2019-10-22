import { createMuiTheme } from '@material-ui/core/styles';
import indigo from 'material-ui/colors/indigo';
import lightBlue from 'material-ui/colors/lightBlue';
import red from 'material-ui/colors/red';

export default createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                margin: "10px",
                padding: "10px"
            }
        }
    },

    palette: {
        primary: lightBlue,
        secondary: indigo // Indigo is probably a good match with pink
    }
});

// import {cyan500, deepPurple500} from 'material-ui/colors';
// // import getMuiTheme from 'material-ui/styles/getMuiTheme'; 
// import { getMuiTheme } from 'material-ui/styles';

// export default theme = getMuiTheme({
//   palette: {
//     textColor: cyan500
//   },
//   appBar: {
//     height: 50
//   }
// });

// export default theme;