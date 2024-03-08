import React, { useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useAppContext } from "./provider";

export default function ModalExcluir({ visible, closeModal, confirmarRemocao }) {
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
              Tem certeza que deseja remover esta pessoa?
            </Text>
            <Button onPress={confirmarRemocao} title="Sim" />
            <Button onPress={closeModal} title="Cancelar" />
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
  });