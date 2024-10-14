import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../actions/AuthActions';

export function ErrorModal({ style, ...props }) {
  const dispatch = useDispatch()
  const modalVisible = useSelector(state => state.auth.modalVisible)
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onShow={() => dispatch(showModal())}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.error}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    top: 650
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  }
});