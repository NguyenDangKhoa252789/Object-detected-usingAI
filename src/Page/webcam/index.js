import React, { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const TeachableMachineWebcam = () => {
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [labelContainer, setLabelContainer] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const URL = "https://teachablemachine.withgoogle.com/models/dpZNGiQFF/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      // Load the model and metadata
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      if (isMounted) {
        setModel(loadedModel);
        setMaxPredictions(loadedModel.getTotalClasses());

        // Setup webcam
        const flip = true; // Whether to flip the webcam
        const webcamInstance = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcamInstance.setup(); // Request access to the webcam
        await webcamInstance.play();
        setWebcam(webcamInstance);

        // Append webcam canvas to DOM
        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.appendChild(webcamInstance.canvas);

        // Setup label container
        const newLabelContainer = document.createElement("div");
        newLabelContainer.id = "label-container";
        setLabelContainer(newLabelContainer);
        webcamContainer.appendChild(newLabelContainer);
      }
    }

    init();

    // Cleanup function
    return () => {
      isMounted = false;
      if (webcam) {
        webcam.stop();
      }
    };
  }, []);

  const predict = async () => {
    if (model && webcam) {
      const predictions = await model.predictTopK(webcam.canvas, 1);
      if (labelContainer) {
        labelContainer.innerText = predictions[0].className;
      }
    }
  };

  useEffect(() => {
    let animationFrame;
    const loop = async () => {
      if (webcam) {
        webcam.update(); // Update the webcam frame
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
    </div>
  );
};

export default TeachableMachineWebcam;
