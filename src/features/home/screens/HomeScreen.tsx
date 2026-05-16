import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldAlert, BookOpen, HeartHandshake, User, Users, Bot, Star, Camera, BellRing } from 'lucide-react-native';
import GridItem from '../components/GridItem';

const ICON_SIZE = 48;

export default function HomeScreen() {
  const router = useRouter();

  const handleNotImplemented = () => {
    Alert.alert('Em breve', 'Esta funcionalidade será disponibilizada nas próximas versões.');
  };

  const GRID_DATA = [
    {
      id: 'sos',
      title: 'SOS',
      icon: <ShieldAlert size={ICON_SIZE} color="#D32F2F" />,
      textColor: '#D32F2F',
      onPress: () => router.push('/sos'),
    },
    {
      id: 'aprender',
      title: 'Aprender',
      icon: <BookOpen size={ICON_SIZE} color="#000" />,
      onPress: () => router.push('/quiz'),
    },
    {
      id: 'center_help',
      title: 'Center Help',
      icon: <HeartHandshake size={ICON_SIZE} color="#000" />,
      onPress: () => router.push('/help'),
    },
    {
      id: 'perfil',
      title: 'Perfil',
      icon: <User size={ICON_SIZE} color="#000" />,
      onPress: handleNotImplemented,
    },
    {
      id: 'inf_pessoais',
      title: 'Inf. Pessoais',
      icon: <Users size={ICON_SIZE} color="#000" />,
      onPress: handleNotImplemented,
    },
    {
      id: 'ia_ajuda',
      title: 'IA Ajuda',
      icon: <Bot size={ICON_SIZE} color="#000" />,
      onPress: handleNotImplemented,
    },
    {
      id: 'eventos',
      title: 'Eventos',
      icon: <Star size={ICON_SIZE} color="#000" />,
      onPress: handleNotImplemented,
    },
    {
      id: 'camera',
      title: 'Camera',
      icon: <Camera size={ICON_SIZE} color="#000" />,
      onPress: handleNotImplemented,
    },
    {
      id: 'alerts',
      title: 'Alerts',
      icon: <BellRing size={ICON_SIZE} color="#000" />,
      onPress: handleNotImplemented,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SEGURANÇA DE COFRE</Text>
      </View>
      <FlatList
        data={GRID_DATA}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GridItem
            title={item.title}
            icon={item.icon}
            onPress={item.onPress}
            textColor={item.textColor}
          />
        )}
        contentContainerStyle={styles.listContent}
        bounces={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
  },
  listContent: {
    flexGrow: 1,
  },
});
