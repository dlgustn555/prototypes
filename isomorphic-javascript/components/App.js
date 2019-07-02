import React, { Component } from 'react';
import moment from 'moment';

class App extends Component {
  state = { time: null };
  interval = 0;

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    this.setState({ time: new Date() });
  };

  render() {
    const { time } = this.state;
    const timeString = time && moment(time).format('h:mm:ss a');
    return (
      <div>
        <h1>Sample App</h1>
        <p>Current Time is : {timeString}</p>
      </div>
    );
  }
}

export default App;