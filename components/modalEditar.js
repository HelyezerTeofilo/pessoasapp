import React, { useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useAppContext } from "./provider";

export default function ModalEditar({ visible, closeModal }) {
  const { editarPessoa, pessoaSelecionada } = useAppContext();
  const [nome, setNome] = useState("");
  const { colors, isV3 } = useTheme();

  const confirmarAcao = () => {
    if (nome.length !== 0) {
      editarPessoa(pessoaSelecionada, nome);
      setNome("");
    }
    closeModal();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Editar Pessoa</Text>
          <View style={styles.modalContent}>
            <TextInput
              label="Nome"
              style={styles.input_nome}
              value={nome}
              onChangeText={(text) => setNome(text)}
              onSubmitEditing={confirmarAcao}
              mode="outlined"
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Button
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={confirmarAcao}
            >
              <Text style={{ color: "white" }}>Salvar</Text>
            </Button>
            <Button style={styles.button} mode="outlined" contentStyle={{overflow:"scroll"}} onPress={closeModal}>
              <Text style={{ color: "black" }}>Cancelar</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  input_nome: {
    width: 250,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: "center",
  },
});
