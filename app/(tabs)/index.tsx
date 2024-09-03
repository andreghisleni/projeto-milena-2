import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, ImageBackground, Text, View } from "react-native";


export default function TabOneScreen() {
  return ( 
    <View className="flex-1">
      <ImageBackground source={require('../../assets/images/splash.png')} width={1080} height={1920} resizeMode="cover" className="flex-1 justify-center" />
    </View>
   );
}