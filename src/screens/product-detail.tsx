import * as React from 'react';
import {Image, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetProductById} from '../api/product';
import ScreenLoading from '../components/screen-loading';
import {ProductDetailScreenProps} from '../navigation/types';
import {COMMON_STYLES} from '../theme/common-styles';
import {getWindowHeight, getWindowWidth} from '../utils/layout';

type Props = ProductDetailScreenProps;

const ProductDetail: React.FC<Props> = ({navigation, route}) => {
  const {data, isLoading, isRefetching, refetch} = useGetProductById(
    route.params.id,
  );

  React.useLayoutEffect(() => {
    if (data?.title) {
      navigation.setOptions({
        title: data?.title,
        headerLargeTitle: true,
      });
    }
  }, [data?.title, navigation]);

  if (isLoading) {
    return <ScreenLoading />;
  }

  return (
    <SafeAreaView style={COMMON_STYLES.flex}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={COMMON_STYLES.flex}>
        <Image style={styles.image} source={{uri: data?.image}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: COMMON_STYLES.screenPadding,
  },
  image: {
    width: getWindowWidth(50),
    height: getWindowHeight(25),
  },
});
