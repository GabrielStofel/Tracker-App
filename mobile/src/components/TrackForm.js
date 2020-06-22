import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter name"
        />
      </Spacer>
      {recording ? (
        <Button
          title="Stop"
          buttonStyle={styles.button}
          onPress={stopRecording}
        />
      ) : (
        <Button
          title="Start Recording"
          buttonStyle={styles.button}
          onPress={startRecording}
        />
      )}
      {!recording && locations.length ? (
        <Button
          title="Save Recording"
          buttonStyle={styles.button}
          onPress={saveTrack}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 25,
    marginBottom: 15,
  },
});

export default TrackForm;
