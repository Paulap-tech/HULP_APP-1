import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import { get } from '../apis';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Madrid'); //si quiero añadir el formato


const DatosGuardados = ({ route }) => {
  const { userEmail } = route.params;
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const responseSintomas = await get(`/sintomas/${userEmail}`);
        const sintomas = responseSintomas.data;

        const responseEpisodios = await get(`/registros/${userEmail}`);
        const episodios = responseEpisodios.data;

        const mapa = {};

        sintomas.forEach(s => {
          const fecha = s.fecha;
          if (!mapa[fecha]) mapa[fecha] = { fecha, sintomas: [], episodios: [] };
          mapa[fecha].sintomas = s.sintomas;
        });
        episodios.forEach(e => {
          const fecha = dayjs.utc(e.date).format("YYYY-MM-DD");
          if (!mapa[fecha]) mapa[fecha] = { fecha, sintomas: [], episodios: [] };
          mapa[fecha].episodios.push(e);
        });

        const combinado = Object.values(mapa).sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );

        console.log("SINTOMAS EXACTOS:", JSON.stringify(responseSintomas.data, null, 2));
        console.log("EPISODIOS EXACTOS:", JSON.stringify(responseEpisodios.data, null, 2));


        /*console.log('Síntomas:', responseSintomas.data);
        console.log('Episodios:', responseEpisodios.data);*/
        setDatos(combinado);

      } catch (error) {
        console.error('Error al obtener datos del paciente:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [userEmail]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (datos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style= {styles.emptyText}>
          No hay datos registrados.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botonVolver2}
        >
          <Text style={styles.textoBotonVolver2}>Volver al perfil</Text>
        
        </TouchableOpacity>

      </View>
    );
  }

  return (
    <View style={[styles.container, { flex: 1, overflow: 'visible' }]}>
      <Text style={styles.title}>Datos Registrados</Text>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.botonVolver}
        >
        <Text style= {styles.textoBotonVolver}> Volver al perfil</Text>
      </TouchableOpacity>
      <FlatList
        data={datos}
        keyExtractor={(item, index) => `${item.fecha}-${index}`}
        renderItem={({ item }) => (
            <View style={styles.cardDia}>
    
              {/* FECHA */}
              <Text style={styles.fechaTexto}>
                {dayjs.utc(item.fecha).format("YYYY-MM-DD")}
              </Text>

              {/* SÍNTOMAS */}
              <Text style={styles.subtitulo}>Síntomas:</Text>
              {item.sintomas?.length > 0 ? (
                item.sintomas.map((s, index) => (
                  <Text key={`${item.fecha}-sintoma-${index}`} style={styles.sintomaTexto}>• {s}</Text>
                ))
              ) : (
                <Text style={styles.sintomaTexto}>No hay síntomas registrados</Text>
              )}

              {/* EPISODIOS */}
              <Text style={styles.subtitulo}>Episodios:</Text>

              {item.episodios?.length > 0 ? (
                item.episodios.map((e, indexE) => (
                  <View key={`${item.fecha}-episodio-${e.id}-${indexE}`} style={{ marginBottom: 5 }}>
                    <Text style={styles.episodioTitulo}>
                      • Episodio registrado
                    </Text>

                    {/* Mostrar campos dinámicamente */}
                    {Object.entries(e).map(([key, value], indexF) => {
                      if (
                        key !== "fecha" &&
                        key !== "date" &&
                        key !== "email" &&
                        key !== "id" 
                        //key !== "tipoEvento"
                      ) {
                        return (
                          <Text 
                            key={`${item.fecha}-${e.id}-${key}-${indexF}`} 
                            style={styles.episodioTexto}
                          >
                            {key}: {String(value)}
                          </Text>
                        );
                      }
                      return null;
                    })}
                  </View>
                ))
              ) : (
                <Text style={styles.episodioTexto}>No hay episodios registrados</Text>
              )}

            </View>
        )}
      />
    </View>
  );
};

export default DatosGuardados;
