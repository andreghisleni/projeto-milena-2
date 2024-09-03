import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Linking } from 'react-native';

const GeniusSongFetcher = () => {
  const [song, setSong] = useState<{
    title: string,
    url: string,
    release_date: string,
    song_art_image_url: string,
    primary_artist: {
      name: string,
      url: string,
    },
  }|null>(null);

  const CLIENT_ID = "Eq8KSecb2Yz4Lq--EUjuGWH_8OifHCRwdwHr1ztKdLx5Qk_zCZG--AXPSQzMXhL-";
  const CLIENT_SECRET = "-3Ynmxt9BZab3Qs5sbr_GdzGxXoGqSqbSISFuEQwquYeVm-5-A3nFIcgUOvDSY731GT-hhJtvTK5jYDccT7juQ";
  const ACCESS_TOKEN = "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
  const API_SONG = "https://api.genius.com/songs/";
  const MAX_SONG = 2471960;

  useEffect(() => {
    fetchRandomSong();
  }, []); 

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const fetchRandomSong = async () => {
    let songId = getRandomInt(1, MAX_SONG);

    try {
      let response = await fetch(`${API_SONG}${songId}${ACCESS_TOKEN}`);

      while (response.status === 404) {
        songId = getRandomInt(1, MAX_SONG);
        response = await fetch(`${API_SONG}${songId}${ACCESS_TOKEN}`);
      }

      const data = await response.json();
      setSong(data.response.song);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-6">
      {song && (
        <>
          <Image 
            source={{ uri: song.song_art_image_url }}
            className="w-48 h-48 mb-4 rounded-lg" 
          />
          <Text className="text-lg mb-2 font-bold">
            SONG:{" "}
            <Text 
              className="text-blue-500 underline" 
              onPress={() => Linking.openURL(song.url)}
            >
              {song.title.toUpperCase()}
            </Text>
          </Text>
          <Text className="text-base mb-2">
            ARTIST:{" "}
            <Text 
              className="text-blue-500 underline" 
              onPress={() => Linking.openURL(song.primary_artist.url)}
            >
              {song.primary_artist.name.toUpperCase()}
            </Text>
          </Text>
          <Text className="text-gray-500 mb-4">RELEASE DATE: {song.release_date && format(song.release_date, 'dd/MM/yyyy')}</Text>
          <Button title="New Random Song" onPress={fetchRandomSong} className="bg-blue-500 text-white px-4 py-2 rounded-md" />
        </>
      )}
    </View>
  );
};

export default GeniusSongFetcher;