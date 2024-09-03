import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Box } from "@/components/ui/box";
import { Image, ImageBackground, Text, View } from "react-native";


export default function SobreScreen() {
  return (
    <View className="flex-1 bg-[#6d2ffa] justify-center items-center p-16">
      <Box className="bg-slate-700 p-5 gap-4">
        <Text className="text-slate-100 text-xl">Sobre o app: </Text>
        <Text className="text-slate-100 text-lg text-justify">Melodify faz parte de um Trabalho de App com React Native da disciplina de Programação Orientada a Eventos I ministrada pelo Prof. MSc. Jackson Meires Dantas Canuto. Foi desenvolvido pelas estudantes Milena Ghisleni Raimann e Vitória Mucelini Wagner em setembro de 2024 e tem como intuito permitir ao usuário a avaliação de músicas e algumas outras funcionalidades, como geração de música aleatório e top artistas!</Text>
      </Box>
    </View>
   );
}