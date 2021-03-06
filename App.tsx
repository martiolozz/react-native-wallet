import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useCallback, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
const web3 = require("@solana/web3.js")
import NumericInput from 'react-native-numeric-input'

import { useStoreState } from "./hooks/storeHooks";
import { accountFromSeed, maskedAddress } from "./utils";
import {
  SPL_TOKEN,
  getBalance,
  getHistory,
  getSolanaPrice,
  getTokenBalance,
  transaction,
  tokenTransaction
} from "./api";
import { Keypair } from '@solana/web3.js';



export default function App() {
  var [text, setText] = useState('');
  var [numberto, setNumber] = useState(0)
  var [tokenBalance, tokenBalanceState] = useState(0)
  var [balanceSol, balanceSolState] = useState(0)

  async function obtenerBalance() {
    const balanceUserSol = getBalance(new web3.PublicKey("uja3w9XG1g6DQSVT6YASK99FVmdVwXoHVoQEgtEJdLv"))
    balanceUserSol.then((value) => {
      balanceSol = value
      balanceSolState(value)
    })
  }

  async function obtenerPrecioSo() {
    const precioSo = getTokenBalance("uja3w9XG1g6DQSVT6YASK99FVmdVwXoHVoQEgtEJdLv", SPL_TOKEN)
    precioSo.then((value) => {
      tokenBalance = value
      tokenBalanceState(value)
    });
  }

  async function enviarTransfer(wallet: string, amount: number) {
    await tokenTransaction(wallet, amount)
  }

  obtenerBalance()
  obtenerPrecioSo()

  return (


    <SafeAreaView style={styles.container}>

      <Text>PACH: {tokenBalance}</Text>
      <Text>SOL: {balanceSol}</Text>
      <TextInput
        style={styles.input}
        placeholder="Cuenta Recipiente"
        value={text}
        onChangeText={text => setText(text)}
      />
      <NumericInput type='up-down' onChange={numberto => setNumber(numberto)} />
      <Button
        onPress={() => enviarTransfer(text, numberto)}
        title="Enviar Tranferencia"
        color="#841584"
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
  },
});
