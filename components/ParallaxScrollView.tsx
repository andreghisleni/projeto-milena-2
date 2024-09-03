import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{ className?: string}>;

export default function ParallaxScrollView({
  children,
  className,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View style={styles.container} className={className}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
