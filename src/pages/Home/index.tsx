import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getContactList} from 'store/contact/actions';
import {RootState} from 'store';
import {BaseContainer, Card, FAB, Spacer} from 'components';
import globalStyles from 'styles/globalStyles';
import {API_IMAGE} from '@env';
import {BLACK, GREEN1, RED, WHITE} from 'styles/colors';
import {IData} from 'store/contact/contactSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RoutesParam} from 'routes/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DeleteContactHandler} from 'services/handler/contact';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RoutesParam>>();
  const {isLoading, data, errorMessage} = useSelector(
    (state: RootState) => state?.contact,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactList(''));
  }, []);

  const _onDelete = (id: string) => {
    DeleteContactHandler(id)
      .then(res => {
        console.log('res delete contact', res);
        dispatch(getContactList(''));
      })
      .catch(err => {
        console.error('err delete contact', err);
      });
  };

  const [refreshing, setRefreshing] = useState(false);

  console.log('contact list', data);

  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(getContactList(''));
    setRefreshing(false);
  };

  const renderItem: ListRenderItem<IData> = ({item}) => (
    <Card
      onPress={() => navigation.navigate('Detail', {type: 'read', data: item})}
      containerStyle={{
        backgroundColor: item.isOnline ? '#90EE90' : 'pink',
        overflow: 'hidden',
      }}>
      <View style={[globalStyles.row]}>
        <View
          style={[
            globalStyles.alignCenter,
            globalStyles.justifyCenter,
            {
              width: 50,
              backgroundColor: WHITE,
            },
          ]}>
          <Text
            style={[
              globalStyles.headingBold.h3,
              {
                fontSize: 12,
                transform: [{rotate: '-90deg'}],
              },
            ]}>
            {item.isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
        <View
          style={[
            globalStyles.displayFlex,
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.verticalDefaultPadding,
            globalStyles.horizontalDefaultPadding,
          ]}>
          <Image
            source={{
              uri: item.photo.includes('http') ? item.photo : `${API_IMAGE}`,
            }}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <Spacer width={20} />
          <View>
            <Text style={[globalStyles.headingBold.h2, {color: WHITE}]}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={[globalStyles.headingBold.h3, {color: WHITE}]}>
              {item.age} years old
            </Text>
          </View>
        </View>
        <View
          style={[
            globalStyles.justifySpaceBetween,
            globalStyles.verticalDefaultPadding,
            globalStyles.horizontalDefaultPadding,
          ]}>
          <Ionicons
            name="pencil"
            size={18}
            color={BLACK}
            onPress={() =>
              navigation.navigate('Detail', {
                type: 'update',
                data: {
                  age: item.age,
                  isOnline: item.isOnline,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  photo: item.photo,
                  id: item.id,
                },
              })
            }
          />
          <Ionicons
            name="trash"
            size={18}
            color={RED}
            onPress={() => _onDelete(item.id)}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <BaseContainer>
      {isLoading ? (
        <View
          style={[
            globalStyles.displayFlex,
            globalStyles.justifyCenter,
            globalStyles.alignCenter,
            {backgroundColor: WHITE},
          ]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View
            style={[
              globalStyles.verticalDefaultPadding,
              globalStyles.horizontalDefaultPadding,
            ]}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              contentContainerStyle={{padding: 8}}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <Spacer height={30} />}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={_onRefresh}
                />
              }
            />
          </View>
        </>
      )}
      <FAB
        onPress={() =>
          navigation.navigate('Detail', {
            type: 'add',
            data: {
              age: 0,
              isOnline: false,
              firstName: '',
              lastName: '',
              photo: '',
              id: '',
            },
          })
        }
      />
    </BaseContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});
