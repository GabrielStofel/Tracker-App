import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import { navigate } from "../navigationRef";

// Remember: The goal of a reusable Hook (created by ourselves) is to expose
// reusable functionality to other components in the application
// This Hook in particular, makes it possible for any component to save a new track
export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset,
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);

    reset();
    navigate("TrackList");
  };

  return [saveTrack];
};
