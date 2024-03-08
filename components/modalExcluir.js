import React, { useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useAppContext } from "./provider";

export default function ModalExcluir({ visible, closeModal }) {
  const { removerPessoa, pessoaSelecionada } = useAppContext();
  const { colors, isV3 } = useTheme();

  const confirmarAcao = () => {
    removerPessoa(pessoaSelecionada);

    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Tem certeza que deseja remover {pessoaSelecionada?.nome}?
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Button
              style={[styles.button,{ backgroundColor: colors.error }]}
              onPress={confirmarAcao}
            >
              <Text style={{ color: "white" }}>Sim</Text>
            </Button>
            <Button style={styles.button} mode="outlined" onPress={closeModal}>
              <Text style={{ color: "black" }}>Não</Text>
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
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
  },
});
