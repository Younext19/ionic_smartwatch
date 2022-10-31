import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Network } from "@capacitor/network";
import { useEffect, useState } from "react";
import { Plugins } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const Home: React.FC = () => {
  const [Demarrer, setDemarrer] = useState("demarrer");

  // _________________ QST 7 _________________________
  useEffect(() => {
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
      setwifiConnected(status.connected.toString());
    };
    logCurrentNetworkStatus();
  });
  const [wifiConnected, setwifiConnected] = useState("false");

  // __________________ Problème Bluetooth, Si sa fonctionnait on pouvait faire ceci_________________________
  const { BluetoothSerial } = Plugins;

  // ___________________ QST 10 ___________________
  const writeSecretFile = async (contenu: string) => {
    await Filesystem.writeFile({
      path: "secrets/text.txt",
      data: contenu,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };

  //_________________ QST 8 ___________________________
  // BluetoothSerial
  //   // Ajouter l'adresse mac de la montre
  //   .connect({
  //     address: "00:11:22:33:44:55",
  //   })
  //   .then(() => {
  //     console.log("Successfully connected");
  //     //____________________ QST 9 _______________________
  //     BluetoothSerial.read({
  //       address: "00:11:22:33:44:55",
  //     })
  //     // PROBLEME LÀ
  //       .then((result: BluetoothDataResult) => {
  //         // LIRE LES DONNÉES SI SA FONCTIONNE ON LES ECRITS AVEC LA FONCTION QU'ON A
  //         writeSecretFile(result.data)
  //       })
  //       .catch(() => {
  //         console.log("Error reading data from device");
  //       });
  //   })
  //   .catch(() => {
  //     console.log("Error connecting...");
  //   });

  

  //_____________________ QST 11 ___________________
  // function notify() {
  //   BluetoothSerial.enableNotifications({
  //     address: "00:11:22:33:44:55",
  //     delimiter: "\n",
  //   })
  //     .then((result: BluetoothEnableNotificationsResult) => {
  //       event = BluetoothSerial.addListener(
  //         result.eventName,
  //         (data: BluetoothDataResult) => {
  //           console.log(data.data);
  //         }
  //       );
  //     })
  //     .catch(() => {
  //       console.log("Error enabling listener for device");
  //     });
  // }

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText>Connected : {wifiConnected}</IonText>
        <br />

        <IonButton
          onClick={() => {
            writeSecretFile("exemple");
          }}
        >
          Sauvegarder les données sur le teléphone
        </IonButton>
        <br />
        <IonButton
          onClick={() => {
            if (Demarrer == "demarrer") {
              setDemarrer("stop");
            } else {
              setDemarrer("demarrer");
            }
          }}
        >
          {Demarrer}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
