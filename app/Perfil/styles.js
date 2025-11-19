import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  saludo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    alignItems: "center",
  },

  cardPerfil: {
    backgroundColor: "#e8f0ff",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  imageContainer: {
    marginRight: 20,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#99bbee",
  },

  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#cddcff",
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholderText: {
    fontSize: 35,
    color: "#6b82b8",
  },

  infoUser: {
    flex: 1,
    marginTop:20,
    marginBottom:20,
  },

  infoText: {
    fontSize: 17,
    marginBottom: 10,
  },

  boton: {
    backgroundColor: "#80bfff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  botonTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  botonCerrar: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },

  botonTextoCerrar: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  /** MODAL */
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },

  medicoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },

  medicoNombre: {
    fontSize: 18,
  },

  infoBold: {
    fontWeight: "bold",
  }
});

export default styles;

