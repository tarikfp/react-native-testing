import React from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import ErrorBoundary from './components/error-boundary';
import ProductStack from './navigation/product-stack';
import {COMMON_STYLES} from './theme/common-styles';

export const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={COMMON_STYLES.flex}>
          <SafeAreaProvider>
            <NavigationContainer
              theme={{
                ...DefaultTheme,
                colors: {...DefaultTheme.colors, primary: 'darkslateblue'},
              }}>
              <ProductStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
