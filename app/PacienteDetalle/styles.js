import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    container: { padding: 20, backgroundColor: "#F8F9FB"},
    btnVolver:{
        marginTop:21,
        marginBottom:20,
        paddingVertical:10,
        paddingHorizontal:15,
        backgroundColor: "#5568FE",
        alignSelf: "flex-start",
        borderRadius:12,
        shadowColor: "#000",
        shadowRadius: 4,
        elevation: 3,
    },
    btnText: { 
        color:"white", 
        fontSize:16,
        fontWeight:"600",
    },

    card: {
        backgroundColor: "#D0D8FF",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 25,
    },

    title: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 15,
        color: "#222",
     },

    label: {
        fontWeight: "bold",
        color: "#333",

    },

    subtitle: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginTop: 20, 
        color:"#333", 
        marginLeft:5, 
        marginBottom: 15,
    },
    item: { 
        fontWeight: "bold",
        fontSize: 16, 
        marginBottom: 5, 
        color:"#444", 

    },
    sintomaBox: {
        backgroundColor: "#D0D8FF",
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        fontWeight: "bold",
   
    },
    sintomaText: { fontSize: 16, color: "#111" },
    fecha: { fontSize: 16, color: "#111", marginTop:5 },
    noData: {
        fontSize:16,
        color: "#777",
        fontStyle: "italic",
        marginLeft: 5,
    },


});



  