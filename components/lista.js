import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, Modal } from 'react-native';
import { List, Text, IconButton, Divider, useTheme, Button } from 'react-native-paper';
import { useAppContext } from './provider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Lista() {
  const { pessoas, pessoaSelecionada, selecionarPessoa, removerPessoa } =
    useAppContext();

  const { colors, isV3 } = useTheme();
  const safeArea = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [pessoaSelecionadaLocal, setPessoaSelecionadaLocal] = useState(null);

    const openModalExcluir = (pessoa) => {
    setPessoaSelecionadaLocal(pessoa);
    setModalVisible(true);
  };

    const openModalEditar = (pessoa) => {
      setPessoaSelecionadaLocal(pessoa);
      setModalVisibleEdit(true);
    }

  const closeModalExcluir = () => {
    setModalVisible(false);
  };

  const closeModalEditar = () => {
    setModalVisibleEdit(false);
  }

    const confirmarRemocao = () => {
      removerPessoa(pessoaSelecionadaLocal);
      setPessoaSelecionadaLocal(null);
      closeModalExcluir();
  };

    const confirmarEdicao = () => {
      closeModalEditar();
    }

  const renderItem = ({ item }) => {
    const selecionado = item.id == pessoaSelecionada?.id;
    return (
      <List.Item
        title={item.nome}
        style={selecionado && styles.item_selecionado}
        right={() => (
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="trash-can-outline"
              mode="contained"
              onPress={() => openModalExcluir(item)}
            />
            <IconButton
              icon="pencil-outline"
              mode="contained"
              onPress={() => openModalEditar(item)}
            />
          </View>
        )}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModalExcluir}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tem certeza que deseja remover esta pessoa?
            </Text>
            <Button onPress={confirmarRemocao}>Sim</Button>
            <Button onPress={closeModalExcluir}>Cancelar</Button>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEdit}
        onRequestClose={closeModalEditar}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Modal de Edição
            </Text>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button onPress={confirmarEdicao}>Sim</Button>
            <Button onPress={closeModalEditar}>Cancelar</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight:200 },
  lista_mensagem_vazio: { marginHorizontal: 16 },
  cabecalho: {
    flex: 1,
    flexDirection: 'column',
  },
  cabecalho_titulo: {
    fontWeight: 'bold',
  },
  item_selecionado: {
    backgroundColor: 'lightgray',
  },
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  modalText: {
    marginBottom: 20,
  }
});
