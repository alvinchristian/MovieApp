import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getMovies, clearMovies} from '../../redux/Actions';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const nowPlaying = useSelector(state => state.appData.nowPlaying);
  const popular = useSelector(state => state.appData.popular);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    dispatch(clearMovies());
    getData();
    setRefreshing(false);
  }, []);

  const getData = async () => {
    setIsLoading(true);
    await dispatch(getMovies()).then(() => setIsLoading(false));
  };

  useEffect(() => {
    isFocused && getData();
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.Header}>
        <Text style={styles.AppName}>Motion</Text>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={50} color={Colors.yellow} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.Box}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.Category}>Popular</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popular?.map(i => (
              <TouchableOpacity
                key={i.id}
                style={styles.PopulerCard}
                onPress={() => {
                  navigation.navigate('Detail', {
                    id: i.id,
                  });
                }}>
                <Image
                  style={styles.PopularPosterPath}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${i.poster_path}`,
                  }}
                />
                <Text style={styles.PopularTitle}>{i.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.Category}>Now Playing</Text>
          {nowPlaying?.map(i => (
            <TouchableOpacity
              key={i.id}
              style={styles.NowPlayingCard}
              onPress={() => {
                navigation.navigate('Detail', {
                  id: i.id,
                });
              }}>
              <Image
                style={styles.NowPlayingPosterPath}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${i.poster_path}`,
                }}
              />
              <View style={styles.Content}>
                <Text style={styles.NowPlayingTitle}>{i.title}</Text>
                <Text style={styles.NowPlayingReleaseDate}>
                  {i.release_date}
                </Text>
              </View>
              <Text style={styles.NowPlayingVote}>{i.vote_average}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  Header: {
    width: '80%',
    backgroundColor: Colors.dark,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 25,
  },
  AppName: {
    fontFamily: Fonts.Bold,
    fontSize: 18,
    color: Colors.light,
  },
  Category: {
    fontFamily: Fonts.Bold,
    color: Colors.light,
    fontSize: 14,
    marginBottom: 25,
  },
  Box: {
    width: window.width * 0.9,
  },
  PopulerCard: {
    width: 120,
    alignItems: 'center',
  },
  PopularPosterPath: {
    resizeMode: 'stretch',
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  PopularTitle: {
    width: '80%',
    color: Colors.light,
    fontFamily: Fonts.Regular,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 18,
  },
  NowPlayingCard: {
    height: 120,
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: Colors.dark,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  NowPlayingPosterPath: {
    width: 100,
    height: 140,
    borderRadius: 10,
    resizeMode: 'stretch',
    marginTop: -40,
    marginRight: 20,
  },
  Content: {
    paddingTop: 20,
    marginRight: 10,
    width: 150,
  },
  NowPlayingTitle: {
    color: Colors.light,
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 18,
  },
  NowPlayingReleaseDate: {
    color: Colors.light,
    fontFamily: Fonts.Medium,
    fontSize: 10,
  },
  NowPlayingVote: {
    width: 40,
    fontFamily: Fonts.Bold,
    fontSize: 16,
    color: Colors.yellow,
    paddingTop: 20,
    textAlign: 'center',
  },
});

export default Home;
