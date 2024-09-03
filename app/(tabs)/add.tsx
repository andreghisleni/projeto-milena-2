import React, { useState } from 'react';
import { View, TextInput, Text, Image } from 'react-native';

import { ref, push, set } from 'firebase/database';
import { database } from '@/config/firebase';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from '@/components/ui/form-control';

export default function AddNote() {
  const [data, setData] = useState({
    name: '',
    artist: '',
    star: '',
    description: '',
  });
  const [error, setError] = useState<{
    name?: string,
    artist?: string,
    star?: string,
    description?: string,
  }>({});

  const [createdNote, setCreatedNote] = useState<{
    id: string,
    name: string,
    artist: string,
    star: string,
    description: string,
  }|null>(null); // Estado para armazenar a nota criada

  const handleInputChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const saveData = async () => {
    try {
      setError({
        name: !data.name ? 'O nome da música é obrigatório' : undefined,
        artist: !data.artist ? 'O nome do artista é obrigatório' : undefined,
        star: !data.star ? 'A avaliação é obrigatória' : undefined,
        description: !data.description ? 'A descrição é obrigatória' : undefined,
      })
      
      if (error.name || error.artist || error.star || error.description) {
        return;
      }


      const newAgendaItemRef = push(ref(database, 'musics'));
      await set(newAgendaItemRef, {
        name: data.name,
        artist: data.artist,
        star: data.star,
        description: data.description,
      });

      console.log('Registro Salvo com Sucesso! ' + newAgendaItemRef.key);


      // Armazenar a nota criada no estado
      setCreatedNote({
        id: newAgendaItemRef.key || '',
        ...data,
      });

      // Limpar os campos do formulário
      setData({
        name: '',
        artist: '',
        star: '',
        description: '',
      });

      // Navegar para outra página, se necessário
      // navigation.navigate('AgendaList');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <ParallaxScrollView className="bg-[#6d2ffa] pt-8">
      <FormControl isInvalid={!!error.name}>
        <Input
          variant="outline"
          size="md"
          className='bg-white'
        >
          <InputField placeholder="Nome da música"
            value={data.name}
            onChangeText={text=>handleInputChange('name', text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText>{error.name}</FormControlErrorText>
        </FormControlError>
      </FormControl>
      
      <FormControl isInvalid={!!error.artist}>
        <Input
          variant="outline"
          size="md"
          className='bg-white'
        >
          <InputField placeholder="Nome do Artista"
            value={data.artist}
            onChangeText={text=>handleInputChange('artist', text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText>{error.artist}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={!!error.star}>
        <Input
          variant="outline"
          size="md"
          className='bg-white'
        >
          <InputField placeholder="Estrelas (0 - 5)"
            value={data.star}
            onChangeText={text=>handleInputChange('star', text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText>{error.star}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={!!error.description}>
        <Input
          variant="outline"
          size="md"
          className='bg-white'
        >
          <InputField placeholder="Avaliação"
            value={data.description}
            onChangeText={text=>handleInputChange('description', text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText>{error.description}</FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button size="md" variant="outline" action="positive" onPress={saveData} className='checked:bg-white'>
        <ButtonText>Salvar</ButtonText>
      </Button>

      <Image
        source={require('../../assets/images/study.jpg')}
        width={100}
        height={100}
      />

      {/* Exibir a nota criada abaixo do formulário */}
      {createdNote && (
        <View style={{ marginTop: 20, padding: 10, borderWidth: 1, borderColor: '#4CAF50', backgroundColor: '#E8F5E9' }}>
          <Text style={{ fontWeight: 'bold' }}>Música cadastrada:</Text>
          <Text>ID: {createdNote.id}</Text>
          <Text>Nome da Música: {createdNote.name}</Text>
          <Text>Artista: {createdNote.artist}</Text>
          <Text>Estrelas: {createdNote.star}</Text>
          <Text>Avaliação: {createdNote.description}</Text>
        </View>
      )}
    </ParallaxScrollView>
  );
}
