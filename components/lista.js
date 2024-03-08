import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, FlatList, Modal } from "react-native";
import {
  List,
  Text,
  IconButton,
  Divider,
  useTheme,
  Button,
} from "react-native-paper";
import { useAppContext } from "./provider";
import ModalEditar from "./modalEditar";
import ModalExcluir from "./modalExcluir";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Lista() {
  const { pessoas, pessoaSelecionada, selecionarPessoa, removerPessoa } =
    useAppContext();

  const { colors, isV3 } = useTheme();
  const safeArea = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  const openModalExcluir = () => {
    setModalVisible(true);
  };

  const openModalEditar = () => {
    setModalVisibleEdit(true);
  };

  const closeModalExcluir = () => {
    setModalVisible(false);
  };

  const closeModalEditar = () => {
    setModalVisibleEdit(false);
  };

  const renderItem = ({ item }) => {
    const selecionado = item.id == pessoaSelecionada?.id;

    const BotaoRemover = () => {
      return (
        <IconButton
          icon="trash-can-outline"
          mode="contained"
          onPress={() => openModalExcluir()}
        />
      );
    };

    const BotaoEditar = () => {
      return (
        <IconButton
          icon="pencil-outline"
          mode="contained"
          onPress={() => openModalEditar()}
        />
      );
    };

    return (
      <List.Item
        title={item.nome}
        style={selecionado && styles.item_selecionado}
        onPress={() => selecionarPessoa(item)}
        right={() =>
          selecionado ? (
            <>
              <BotaoEditar />
              <BotaoRemover />
            </>
          ) : null
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>
          <View style={styles.cabecalho}>
            <Text style={styles.cabecalho_titulo} variant="bodyLarge">
              Pessoas cadastradas
            </Text>
            {pessoas?.length > 0 && (
              <Text variant="bodySmall">
                Pressione um item da lista para selecionar e outra vez para
                remover a seleção
              </Text>
            )}
          </View>
        </List.Subheader>
      </List.Section>
      <FlatList
        data={pessoas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => (
          <Text variant="bodyMedium" style={styles.lista_mensagem_vazio}>
            Nenhuma pessoa cadastrada até o momento
          </Text>
        )}
      />
      <ModalExcluir
        visible={modalVisible}
        closeModal={closeModalExcluir}
      />
      <ModalEditar
        visible={modalVisibleEdit}
        closeModal={closeModalEditar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 200 },
  lista_mensagem_vazio: { marginHorizontal: 16 },
  cabecalho: {
    flex: 1,
    flexDirection: "column",
  },
  cabecalho_titulo: {
    fontWeight: "bold",
  },
  item_selecionado: {
    backgroundColor: "lightgray",
  },
});
