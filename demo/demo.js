import React, {Component} from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';
import ImageZoom from './built';

export default class Demo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}
            enableSwipeDown={true}
        >
          <Image
              enableHorizontalBounce={true}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }}
              source={{
                uri:
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522606437962&di=f93f5c645225a5681155ebcde27b257f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0159fa5944bcd3a8012193a34b762d.jpg%402o.jpg'
              }}
          />
        </ImageZoom>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
