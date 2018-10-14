import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import createHistory from "history/createBrowserHistory";
import HomePage from './src/components/HomePage';
import * as content from './src/constants/content.json';

import { store } from './src/store';

const history = createHistory();

class WebApp extends React.Component {
  state = {
      response: ''
    };
    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.status }))
        .catch(err => console.log(err));

    }
    callApi = async () => {
      const response = await fetch(content.hello);
      const body = await response;
      if (response.status !== 200) throw Error(body.json().message);
      return body;
    };

  render(){
    return(
      <div>
          <Provider store={store}>
          <HomePage />
          </Provider>
      </div>
    );
  }
}


ReactDOM.render(<WebApp />, document.getElementById("react-app"));
