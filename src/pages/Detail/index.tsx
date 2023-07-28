import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RoutesParam} from 'routes/types';
import {IData} from 'store/contact/contactSlice';
import {BaseContainer, Button, Spacer} from 'components';
import globalStyles from 'styles/globalStyles';
import {Formik} from 'formik';
import {BLACK, BLUE, GREEN1, GREY11, WHITE} from 'styles/colors';
import {API_IMAGE} from '@env';
import {
  AddContactHandler,
  UpdateContactHandler,
} from 'services/handler/contact';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Detail = () => {
  const route = useRoute<RouteProp<RoutesParam>>();
  const navigation = useNavigation<StackNavigationProp<RoutesParam>>();
  console.log(route.params);
  const [detailData] = useState<IData>(route.params?.data!);
  const [isLoading, setIsLoading] = useState(false);

  const _onSubmit = (values: IData) => {
    setIsLoading(true);
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      age: parseInt(values.age, 10),
      photo: values.photo,
    };
    console.log('body', body);
    if (route.params?.type === 'add') {
      AddContactHandler(body)
        .then(res => {
          console.log('res add', res);
          Alert.alert('Berhasil', 'Berhasil Membuat kontak baru');
        })
        .catch(err => {
          console.error('err add', err);
        })
        .finally(() => {
          setIsLoading(false);
          navigation.goBack();
        });
    } else if (route.params?.type === 'update') {
      UpdateContactHandler(values.id, body)
        .then(res => {
          console.log('res update', res);
          Alert.alert('Berhasil', 'Berhasil merubah kontak');
        })
        .catch(err => console.error('err update', err))
        .finally(() => {
          setIsLoading(false);
          navigation.goBack();
        });
    }
    console.log('validate', values);
  };
  return (
    <BaseContainer scrollable>
      <View
        style={[
          globalStyles.displayFlex,
          globalStyles.horizontalDefaultPadding,
          globalStyles.verticalDefaultPadding,
        ]}>
        <Formik initialValues={detailData} onSubmit={_onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <View style={globalStyles.displayFlex} key={values.id}>
              <View style={[globalStyles.displayFlex]}>
                {route.params?.type === 'read' ? (
                  <>
                    <Image
                      source={{
                        uri: values.photo.includes('http')
                          ? values.photo
                          : `${API_IMAGE}`,
                      }}
                      resizeMode="contain"
                      style={{width: '100%', height: 200, borderRadius: 10}}
                    />
                    <Spacer height={15} />
                  </>
                ) : null}
                <Text style={globalStyles.headingBlack.h3}>First Name</Text>
                <TextInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  style={[
                    globalStyles.horizontalDefaultPadding,
                    {
                      borderWidth: 0.5,
                      borderRadius: 8,
                      borderColor: GREY11,
                      color: route.params?.type === 'read' ? BLACK : GREY11,
                    },
                  ]}
                  placeholder="First Name"
                  placeholderTextColor={GREY11}
                  editable={route.params?.type === 'read' ? false : true}
                />
                <Spacer height={15} />
                <Text style={globalStyles.headingBlack.h3}>Last Name</Text>
                <TextInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  style={[
                    globalStyles.horizontalDefaultPadding,
                    {
                      borderWidth: 0.5,
                      borderRadius: 8,
                      borderColor: GREY11,
                      color: route.params?.type === 'read' ? BLACK : GREY11,
                    },
                  ]}
                  placeholder="Last Name"
                  placeholderTextColor={GREY11}
                  editable={route.params?.type === 'read' ? false : true}
                />
                <Spacer height={15} />
                <Text style={globalStyles.headingBlack.h3}>Age</Text>
                <TextInput
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values?.age?.toString()}
                  editable={route.params?.type === 'read' ? false : true}
                  style={[
                    globalStyles.horizontalDefaultPadding,
                    {
                      borderWidth: 0.5,
                      borderRadius: 8,
                      borderColor: GREY11,
                      color: route.params?.type === 'read' ? BLACK : GREY11,
                    },
                  ]}
                  placeholder="Age"
                  placeholderTextColor={GREY11}
                  keyboardType="number-pad"
                />
                <Spacer height={15} />
                {route.params?.type !== 'read' ? (
                  <Button
                    onPress={() => {
                      setFieldValue('photo', `${API_IMAGE}`);
                    }}
                    text="Generate Photo"
                    textColor={WHITE}
                    containerStyle={{backgroundColor: BLUE}}
                  />
                ) : null}
                <Spacer height={35} />
              </View>
              {route.params?.type !== 'read' ? (
                <Button
                  onPress={handleSubmit}
                  text={isLoading ? <ActivityIndicator /> : 'Submit'}
                  textColor={WHITE}
                  containerStyle={{backgroundColor: GREEN1}}
                />
              ) : null}
            </View>
          )}
        </Formik>
      </View>
    </BaseContainer>
  );
};

export default Detail;

const styles = StyleSheet.create({});
