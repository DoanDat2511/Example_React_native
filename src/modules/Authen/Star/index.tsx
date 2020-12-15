import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';

import {ic_back} from '../../../assets';
import Colors from '../../../utils/Colors';
import Header from '../../../components/Header';
import {IBaseProps} from '../../../common/interface';
import {storeAuthen} from '../../../common/interface';
import {getListStar, resetListStar} from '../reducer';
import TouchableComponent from '../../../components/Button';

interface IForgetPassword extends IBaseProps {
  authen: storeAuthen;
  resetListStar: () => (dispatch: any) => Promise<void>;
  getListStar: (url: string, page: number) => (dispatch: any) => Promise<void>;
}
interface IStar extends IBaseProps {
  items: any;
}
const ItemStarComponent: React.FC<IStar> = (props) => {
  const {items} = props;
  return (
    <View style={styles.viewContainerRepo}>
      <View>
        <Image
          source={{uri: items?.avatar_url}}
          style={styles.viewImage}></Image>
      </View>
      <View style={styles.viewLeftItem}>
        <Text style={styles.textTileItem}>{items?.id}</Text>
        <Text style={styles.textUser}>{items?.login}</Text>
      </View>
    </View>
  );
};
const ForgetPassword: React.FC<IForgetPassword> = (props) => {
  const {navigation, route, getListStar, resetListStar, authen} = props;
  const {linkApiStar, couterStar} = route.params;
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  useEffect(() => {
    const focusNavigationListener = props.navigation.addListener(
      'focus',
      () => {
        getListStar(linkApiStar, pageCurrent);
      },
    );
    return focusNavigationListener;
  }, [navigation, pageCurrent]);

  useEffect(() => {
    return () => {
      resetListStar();
    };
  }, []);

  const _onGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const _keyExtrator = useCallback((item, index) => {
    return 'key' + index;
  }, []);
  const _renderItemStar = useCallback(({item, index}) => {
    return <ItemStarComponent items={item} navigation={navigation} />;
  }, []);

  const onPressLoadMore = useCallback(() => {
    const nextPage: number = pageCurrent + 1;
    getListStar(linkApiStar, nextPage);
    return setPageCurrent(nextPage);
  }, [pageCurrent]);

  const dataListStar = useMemo(() => {
    return authen?.listStar;
  }, [authen]);

  const numberItemLoaded = useMemo(() => {
    if (dataListStar) {
      return dataListStar.length;
    }
  }, [dataListStar]);

  const IndicatorView = useMemo(() => {
    if (authen.isLoading) {
      return (
        <ActivityIndicator
          size={20}
          color={Platform.select({ios: 'padding', android: 'white'})}
          style={{marginRight: 5}}
        />
      );
    }
    return null;
  }, [authen]);

  const renderLoadMore = useMemo(() => {
    if (couterStar && numberItemLoaded < couterStar) {
      return (
        <View style={styles.viewFooter}>
          <View>{IndicatorView}</View>
          <TouchableComponent
            style={{marginLeft: 5}}
            disabled={authen.isLoading}
            onPress={onPressLoadMore}>
            <Text style={styles.textLoad}>Load stargazers</Text>
          </TouchableComponent>
        </View>
      );
    }
    return null;
  }, [authen]);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={Colors.BLUE_OPACITY}
        title="Stargazers"
        onBack={_onGoback}
        btnIconLeft={ic_back}
      />
      <View style={styles.viewBody}>
        <FlatList
          data={dataListStar}
          renderItem={_renderItemStar}
          keyExtractor={_keyExtrator}></FlatList>
      </View>
      {renderLoadMore}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PURPLE_COAL,
  },
  viewBody: {
    marginTop: 10,
  },
  viewContainerRepo: {
    backgroundColor: Colors.primary_2,
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewFooter: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    width: '92%',
    borderRadius: 5,
    bottom: 20,
    backgroundColor: Colors.BACKGROUND_GREEN,
  },
  viewLeftItem: {
    marginLeft: 15,
  },
  textTileItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  textUser: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  textLoad: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  viewImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => ({
  authen: state.authen,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getListStar,
      resetListStar,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
