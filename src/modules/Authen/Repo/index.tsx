import React, {useCallback, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';

import Colors from '../../../utils/Colors';
import {Screens} from '../../../utils/Routes';
import Header from '../../../components/Header';
import {getListRepo, getTotal} from '../reducer';
import {IBaseProps} from '../../../common/interface';
import {storeAuthen} from '../../../common/interface';
import TouchableComponent from '../../../components/Button';
import {ic_user, ic_page, ic_desktop} from '../../../assets';

interface IItemRep extends IBaseProps {
  items: any;
}
interface ISigRedux extends IBaseProps {
  authen?: storeAuthen;
  getListRepo: (
    page: number,
    nameRepo: string,
  ) => (dispatch: any) => Promise<void>;
  getTotal: (nameRepo: string) => (dispatch: any) => Promise<void>;
}
const ItemRepoComponent: React.FC<IItemRep> = (props) => {
  const {items, navigation} = props;
  const _onMoveDetailStar = useCallback(() => {
    console.log('iete', items.stargazers_url);
    navigation.navigate(Screens.Star, {
      linkApiStar: items.stargazers_url,
      couterStar: items.stargazers_count,
    });
  }, [items]);
  return (
    <View style={styles.viewContainerRepo}>
      <View style={styles.viewCricle}>
        <Image source={ic_desktop} />
      </View>
      <View style={styles.viewCenterItems}>
        <Text style={styles.textTileItem} numberOfLines={1}>
          {items?.name}
        </Text>
        <Text style={styles.textCountStart}>
          number star: {items.stargazers_count}
        </Text>
      </View>
      <TouchableComponent
        onPress={_onMoveDetailStar}
        style={styles.viewButtonLoad}>
        <Text style={styles.textLoad}>LOAD</Text>
      </TouchableComponent>
    </View>
  );
};
const SignIn: React.FC<ISigRedux> = (props) => {
  const {authen, getListRepo, getTotal, navigation} = props;
  const [searchText, setSearchText] = useState<string>('');
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  const numberTotalRepo = useMemo(() => {
    if (authen && authen.totalRepo) {
      return authen.totalRepo;
    }
    return 0;
  }, [authen]);
  const dataListRepo = useMemo(() => {
    return authen?.listRepo;
  }, [authen]);
  const numberItemLoaded = useMemo(() => {
    if (dataListRepo) {
      return dataListRepo.length;
    }
    return 0;
  }, [dataListRepo]);
  const onPressLoadMore = useCallback(() => {
    const nextPage: number = pageCurrent + 1;
    getListRepo(nextPage, searchText);
    return setPageCurrent(nextPage);
  }, [pageCurrent, searchText]);
  const _keyExtrator = useCallback((item, index) => {
    return 'key' + index;
  }, []);
  const _renderItemRepo = useCallback(({item, index}) => {
    return <ItemRepoComponent items={item} navigation={navigation} />;
  }, []);
  const _onChangTextSearch = useCallback(
    (text: string) => {
      setSearchText(text);
    },
    [searchText],
  );
  const _onPressSearchRepo = useCallback(() => {
    const page: number = 1;
    getListRepo(1, searchText);
    getTotal(searchText);
    return setPageCurrent(page);
  }, [searchText]);
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
    if (numberItemLoaded < numberTotalRepo) {
      return (
        <View style={styles.viewFooter}>
          <View>{IndicatorView}</View>
          <TouchableComponent
            style={{marginLeft: 5}}
            onPress={onPressLoadMore}
            disabled={authen.isLoading}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
              Load more
            </Text>
          </TouchableComponent>
        </View>
      );
    }
    return null;
  }, [numberItemLoaded, numberTotalRepo, authen]);

  return (
    <View style={styles.container}>
      <Header backgroundColor={Colors.BLUE_OPACITY} title="Repositories" />
      <View style={styles.viewSearch}>
        <TextInput
          style={styles.inputText}
          onChangeText={_onChangTextSearch}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={true}
        />
        <TouchableComponent
          style={styles.viewButton}
          onPress={_onPressSearchRepo}>
          <Text style={styles.textSearch}>Tìm kiếm</Text>
        </TouchableComponent>
      </View>
      <View style={styles.inforView}>
        <View style={styles.viewElement}>
          <Image source={ic_user} style={styles.imgView}></Image>
          <Text style={styles.textValue}>{numberTotalRepo}</Text>
        </View>
        <View style={styles.viewElement}>
          <Image source={ic_page} style={styles.imgView}></Image>
          <Text style={styles.textValue}>{numberItemLoaded}</Text>
        </View>
      </View>
      <View style={styles.viewBody}>
        <FlatList
          data={dataListRepo}
          keyExtractor={_keyExtrator}
          renderItem={_renderItemRepo}
          contentContainerStyle={{flexGrow: 1}}
          onEndReachedThreshold={0.02}
        />
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
  viewSearch: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
  },
  inputText: {
    width: '75%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: Colors.GRAY_LIGHT,
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '400',
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: Colors.ORANGE,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  textSearch: {
    fontSize: 13,
    color: 'white',
    fontWeight: '600',
  },
  inforView: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  imgView: {
    width: 15,
    height: 15,
  },
  viewElement: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  textValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  viewBody: {
    marginTop: 10,
    marginBottom: 200,
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
    height: 50,
    width: '92%',
    borderRadius: 5,
    bottom: 20,
    backgroundColor: Colors.BACKGROUND_GREEN,
    alignSelf: 'center',
  },
  viewCricle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.ORANGE,
    borderRadius: 25,
  },
  textTileItem: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  viewButtonLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.CARROT,
    borderRadius: 5,
  },
  textLoad: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  textCountStart: {
    fontSize: 13,
    color: 'white',
    marginTop: 5,
  },
  viewCenterItems: {
    flexDirection: 'column',
    marginLeft: 10,
    width: '60%',
  },
});

const mapStateToProps = (state) => ({
  authen: state.authen,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getListRepo,
      getTotal,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
