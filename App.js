import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Fetch from 'react-fetch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Footer} from 'react-materialize';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class App extends Component {
	constructor() {
  	super();
 		 this.state={items:[], open:true};
     this.state.loading = true;
  }
handleToggle(){this.setState({open: !this.state.open});}
  //I could just use <Fetch url="">

  //Load the component before DOM
  //Fetch will grab the data and wait for it
  componentWillMount(){
  	fetch(`http://jsonplaceholder.typicode.com/albums`)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
    .then(this.state.loading=false)
  }
  render() {

    if (this.state.loading == true)
    {
      return <h1>Loading. Please Wait..</h1>
    }
    else
    {
      //Following CSS styles can be separated into another css file and imprted from there
      //For this webpack.config.js file needs to be edited and for demo purpose i am adding
      //inline css here...
      var mainContentDiv = {
        background: "#eee",
        padding: "20px",
        marginLeft: "260px",
      };
      var leftMenuDiv = {
        padding: "5px",
        marginTop:"10px"
      };
      var mainContainer={};
      var resultContentDiv = {};
      var contentDiv={};
      var headerDiv = {marginLeft:"260px"};
      var footerDiv = {background:"#eee",fontWeight:"bold",marginLeft:"260px"};
      return(
          <div style={mainContainer}>
            <div style={contentDiv}>
              <MuiThemeProvider>
                <div style={headerDiv}>
                  <AppBar title="Sample JSON Data" />
                </div>
              </MuiThemeProvider>
              <div style={resultContentDiv}>
                <MuiThemeProvider>
                  <div style={leftMenuDiv}>
                    <Drawer open={this.state.open}>
                      <MenuItem style={leftMenuDiv}>Home</MenuItem>
                      <MenuItem style={leftMenuDiv}>Blog</MenuItem>
                      <MenuItem style={leftMenuDiv}>Careers</MenuItem>
                      <MenuItem style={leftMenuDiv}>About</MenuItem>
                    </Drawer>
                  </div>
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <div style={mainContentDiv}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderColumn>User Identification</TableHeaderColumn>
                          <TableHeaderColumn>Album Title</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {this.state.items.map(item=>
                            <TableRow>
                              <TableRowColumn key={item.id}>{item.id}</TableRowColumn>
                              <TableRowColumn key={item.id}>{item.title}</TableRowColumn>
                            </TableRow>
                        )
                        }
                      </TableBody>
                    </Table>
                  </div>
                </MuiThemeProvider>
              </div>
            </div>
            <div style={footerDiv}>
              <Footer copyrights="2015 Copyright" className="example">
                <h1>Footer Goes Here</h1>
              </Footer>
            </div>
          </div>
        );
      }
    }
  }

ReactDOM.render(<App />,document.getElementById('app'));

export default App;
