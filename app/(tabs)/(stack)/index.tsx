import { database } from '@/config/firebase';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ref, onValue, query, orderByChild, limitToLast, remove } from 'firebase/database';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

type Music = {
  id: string,
  name: string,
  artist: string,
  star: string,
  description: string,
};


export default function AgendaList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [musics, setMusics] = useState<Music[]>([]);
  const [musicsFiltered, setMusicsFiltered] = useState<Music[]>([]);

  // Buscar notas recentes ao carregar o componente
  useEffect(() => {
    const unsubscribe = onValue(query(ref(database, 'musics'), orderByChild('date')), (snapshot) => {
      const musicsArray = [] as Music[];
      snapshot.forEach(childSnapshot => {
        musicsArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setMusics(musicsArray.reverse()); 
      setMusicsFiltered(musicsArray.reverse());
    });

    return () => unsubscribe(); // Limpar o listener ao desmontar o componente
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setMusicsFiltered(musics);
      return;
    };

    const filteredMusics = musics.filter(note =>
      note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMusicsFiltered(filteredMusics);
  };

  const handleDelete = useCallback((id: string) => {
    remove(ref(database, `musics/${id}`));
  }, []);
  
  return (
    <ParallaxScrollView>
      <View className='flex-row gap-4'>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className='flex-1'
        >
          <InputField placeholder="Buscar Nota"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </Input>

        <Button size="md" variant="outline" action="primary" onPress={handleSearch}>
          <ButtonText>Buscar</ButtonText>
        </Button>
      </View>
      

      <Text style={styles.title}>Todas as Anotações</Text>

      {(musicsFiltered ?? musics).map((item) => (
        <View style={styles.noteContainer} key={item.id} className='flex-row justify-between'>
          <View className='pr-4'>
            <Text style={styles.noteTitle}>Música: {item.name}</Text>
            <Text>Artista: {item.artist}</Text>
            <Text>Estrelas: {item.star}</Text>
            <Text>Avaliação: {item.description}</Text>
          </View>
          <View className='justify-between'>
            <Link href={{
              pathname: '/edit',
              params: {
                id: item.id,
                name: item.name,
                artist: item.artist,
                star: item.star,
                description: item.description,
              }
            }} 
              asChild
              replace
            >
              <Button size="md" variant="outline" action="primary">
                <AntDesign name="edit" size={24} color="black" />
              </Button>
            </Link>

              <Button size="md" variant="outline" action="negative" className='border-red-600' onPress={()=>handleDelete(item.id)}>
                <Entypo name="trash" size={24} color="#dc2626"/>
              </Button>
          </View>
        </View>
      ))} 

      {musics.length === 0 && (
        <Text style={styles.emptyMessage}>Nenhuma musica encontrada</Text>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#6d2ffa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noteTitle: {
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
