import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { material } from 'react-native-typography';
import moment from 'moment';

import colors from "./styles/colors"

export default class App extends React.Component {
  constructor(props){
    super(props)

    let baseRoundTime = 5;

    this.state = {
      startTime: moment(),
      endTime: moment().add(baseRoundTime, 'minutes'),
      roundDuration: baseRoundTime,
      timeRemaining: (baseRoundTime * 60 * 1000)
    }
  }

  componentDidMount() {
    this._start();
  }

  componentWillUnmount() {
    this._stop();
  }

  _tick(){
    this.setState({
      timeRemaining: this._calcTimeRemaining()
    })

    if(this._calcTimeRemaining() <= 0){
      this._stop();
    }
  }

  _reset(){
    console.log(this.state.roundDuration)
    this.setState({
      endTime: moment().add(this.state.roundDuration, 'minutes'),
      timeRemaining: (this.state.roundDuration * 60 * 1000)
    })
  }

  _start(){
    this._stop();

    this.setState({
      endTime: moment().add(this.state.timeRemaining, 'ms')
    })

    this.interval = setInterval(() => {
      this._tick(), 20
    });
  }

  _stop(){
    clearInterval(this.interval);
  }

  _calcTimeRemaining(){
    return(this.state.endTime.diff(moment()))
  }

  timer(){
    let timeRemaining = moment(this._calcTimeRemaining());
    let displayTime = timeRemaining.format('mm:ss');
    if(timeRemaining <= 0){
      displayTime = "00:00";
    }
    return(
      <Text style={material.display4White}>{displayTime}</Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={material.captionWhite}>Round Duration: {this.state.roundDuration} minutes</Text>

        {this.timer()}

        <Button
          backgroundColor={colors.warning}
          raised
          title="Reset"
          onPress={()=>this._reset()}
        />
        <Divider style={{ backgroundColor: 'white', height: 10 }} />
        <Button
          backgroundColor={colors.danger}
          raised
          title="Stop"
          onPress={()=>this._stop()}
        />
        <Divider style={{ backgroundColor: 'white', height: 10 }} />
        <Button
          backgroundColor={colors.success}
          raised
          title="Start"
          onPress={()=>this._start()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
