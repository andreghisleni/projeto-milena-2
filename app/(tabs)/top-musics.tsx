import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Box } from "@/components/ui/box";
import { Image, ImageBackground, Text, View } from "react-native";



export default function SobreScreen() {
  const Artists = [
    {
      name: "Taylor Swift",
      image: require("../../assets/images/artistas/1.png"),
    },
    {
      name: "Bad Bunny",
      image: require("../../assets/images/artistas/2.png"),
    },
    {
      name: "The Weeknd",
      image: require("../../assets/images/artistas/3.png"),
    },
  ]
  return (
    <ParallaxScrollView className="flex-1 bg-[#6d2ffa] justify-center items-center gap-8">
      <Box className="bg-slate-700 p-5 gap-4">
        <Text className="text-slate-100 text-xl">Top Artistas Mais Escutados no Spotify Ano Passado (2023)</Text>
      </Box>

      {Artists.map((artist) => (
        <Box className="bg-slate-700 p-5" key={artist.name}>
          <Text className="text-slate-100 text-lg text-justify">1. {artist.name}</Text>
          <View className="w-48 h-48">
            <Image source={artist.image} resizeMode="contain" style={{
              aspectRatio: 1,
              flex: 1,
              resizeMode: 'contain',
              width: 192,
              height: 192,
            }} />
          </View>
        </Box>
      ))}
    </ParallaxScrollView>
   );
}