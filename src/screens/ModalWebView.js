import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { gStyle } from '../constants';

// components
import Header from '../components/Header';

const ModalWebView = ({ route }) => {
  const url = route.params?.url ?? 'https://www.streamverse.com';

  return (
    <View style={gStyle.container}>
      <Header close closeText="Close" />

      <WebView
        bounces={false}
        javaScriptEnabled
        scalesPageToFit
        source={{ uri: url }}
        startInLoadingState
      />
    </View>
  );
};

ModalWebView.propTypes = {
  route: PropTypes.object.isRequired
};

export default ModalWebView;
