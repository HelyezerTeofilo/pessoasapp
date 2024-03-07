import { StyleSheet, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar, Snackbar } from "react-native-paper";
import { useState } from "react";

import { AppProvider } from "./components/provider";
import Formulario from "./components/formulario";
import Lista from "./components/lista";

export default function App() {
  const [notificacaoVisivel, setNotificacaoVisivel] = useState(false);
  const [notificacaoEdicaoVisivel, setNotificacaoEdicaoVisivel] =
    useState(false);
  const onDismissNotificacao = () => setNotificacaoVisivel(false);
  const onAdicionarPessoa = () => setNotificacaoVisivel(true);
  const onEditarPessoa = () =>
    setNotificacaoEdicaoVisivel(!notificacaoEdicaoVisivel);
  return (
    <SafeAreaProvider>
      <AppProvider
        onAdicionarPessoa={onAdicionarPessoa}
        onSelecionarPessoa={(pessoa) => console.log("selecionado", pessoa)}
        onRemoverPessoa={(pessoa) => console.log("removido", pessoa)}
        onEditarPessoa={onEditarPessoa}
      >
        <SafeAreaView style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Cadastro de pessoas" />
            <Appbar.Action icon="help-circle" />
          </Appbar.Header>

          <Formulario />
          <Lista />

          <Snackbar
            visible={notificacaoVisivel}
            onDismiss={onDismissNotificacao}
            action={{
              label: "OK",
            }}
          >
            Cadastro realizado com sucesso!
          </Snackbar>

          <Snackbar
            visible={notificacaoEdicaoVisivel}
            onDismiss={onEditarPessoa}
            action={{
              label: "OK",
            }}
          >
            Cadastro atualizado com sucesso!
          </Snackbar>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
