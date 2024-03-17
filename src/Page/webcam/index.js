import React, { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const TeachableMachineWebcam = () => {
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [labelContainer, setLabelContainer] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization state

  const CONFIDENCE_THRESHOLD = 0.7; // Adjust this value as needed

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const URL = "https://teachablemachine.withgoogle.com/models/dpZNGiQFF/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      const loadedModel = await tmImage.load(modelURL, metadataURL);
      if (isMounted) {
        setModel(loadedModel);
        setMaxPredictions(loadedModel.getTotalClasses());

        const flip = true;
        const webcamInstance = new tmImage.Webcam(200, 200, flip);
        await webcamInstance.setup();
        await webcamInstance.play();
        setWebcam(webcamInstance);

        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.appendChild(webcamInstance.canvas);

        const newLabelContainer = document.createElement("div");
        newLabelContainer.id = "label-container";
        setLabelContainer(newLabelContainer);
        webcamContainer.appendChild(newLabelContainer);

        setIsInitialized(true); // Mark initialization as done
      }
    }

    if (isInitialized) {
      init();
    }

    return () => {
      isMounted = false;
      if (webcam) {
        webcam.stop();
      }
    };
  }, [isInitialized]); // Run useEffect whenever isInitialized changes

  const handleInitialize = () => {
    setIsInitialized(true); // Trigger initialization when button is clicked
  };

  const predict = async () => {
    if (model && webcam) {
      const predictions = await model.predictTopK(webcam.canvas, 1);
      if (labelContainer) {
        if (predictions[0].probability >= CONFIDENCE_THRESHOLD) {
          labelContainer.innerText = predictions[0].className;
        } else {
          labelContainer.innerText = "Unknown";
        }
      }
    }
  };

  useEffect(() => {
    let animationFrame;
    const loop = async () => {
      if (webcam) {
        webcam.update();
        await predict();
        animationFrame = requestAnimationFrame(loop);
      }
    };

    if (model && webcam) {
      animationFrame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [model, webcam]);

  return (
    <div>
      <div>Teachable Machine Image Model</div>
      <div id="webcam-container"></div>
      {!isInitialized && <button onClick={handleInitialize}>Initialize</button>}
    </div>
  );
};

export default TeachableMachineWebcam;
