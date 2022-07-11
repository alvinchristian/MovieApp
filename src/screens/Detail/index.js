import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {clearMovies, getDetailMovie} from '../../redux/Actions';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';

const Detail = ({route, navigation}) => {
  const idMovie = route.params.id;

  const dispatch = useDispatch();

  const [IsLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const movieDetail = useSelector(state => state.appData.detail);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    dispatch(clearMovies());
    getData();
    setRefreshing(false);
  }, []);

  const getData = async () => {
    setIsLoading(true);
    await dispatch(getDetailMovie(idMovie)).then(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle="light-content"
      />
      {IsLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={50} color={Colors.yellow} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.Box}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image
            style={styles.PosterPath}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
            }}
          />
          <Text style={styles.Title}>{movieDetail?.title}</Text>
          <View style={styles.GenresBox}>
            {movieDetail?.genres.map(i => (
              <Text key={i.id} style={styles.Genres}>
                {i.name}
              </Text>
            ))}
          </View>
          <View style={styles.RuntimeReleaseBox}>
            <Text style={styles.RuntimeReleaseDate}>
              {movieDetail?.runtime} Minutes
            </Text>
            <Text style={styles.RuntimeReleaseDate}>|</Text>
            <Text style={styles.RuntimeReleaseDate}>
              {movieDetail?.release_date}
            </Text>
          </View>
          <Text style={styles.Overview}>{movieDetail?.overview}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  Box: {
    marginHorizontal: 10,
  },
  PosterPath: {
    height: screen.height * 0.7,
    resizeMode: 'cover',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  Title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    color: Colors.light,
    fontFamily: Fonts.Bold,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
  },
  GenresBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  Genres: {
    color: Colors.light,
    fontFamily: Fonts.Regular,
    fontSize: 12,
    marginHorizontal: 4,
  },
  RuntimeReleaseBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  RuntimeReleaseDate: {
    color: Colors.light,
    fontFamily: Fonts.Regular,
    fontSize: 10,
    marginHorizontal: 4,
  },
  Overview: {
    width: '85%',
    alignSelf: 'center',
    color: Colors.light,
    fontFamily: Fonts.Medium,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'justify',
    marginVertical: 10,
  },
});

export default Detail;
