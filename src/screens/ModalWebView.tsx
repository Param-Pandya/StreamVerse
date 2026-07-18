import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { gStyle } from '../constants';
import Header from '../components/Header';

interface ModalWebViewProps {
  route: any;
}

const ModalWebView: React.FC<ModalWebViewProps> = ({ route }) => {
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

export default ModalWebView;
