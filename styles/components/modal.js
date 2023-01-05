import { StyleSheet } from "react-native"

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 30,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    position: 'relative',
    width: '100%',
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center'
  },
  modalButton: {
    marginTop: 20
  }
})
