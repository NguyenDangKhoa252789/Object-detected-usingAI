import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

const TeachableMachineImageModel = () => {
  const [model, setModel] = useState(null);
  const [labelContainer, setLabelContainer] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);

  useEffect(() => {
    async function init() {
      const URL = "https://teachablemachine.withgoogle.com/models/dpZNGiQFF/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setMaxPredictions(loadedModel.getTotalClasses());

      const container = document.getElementById("label-container");
      setLabelContainer(container);
      for (let i = 0; i < maxPredictions; i++) {
        container.appendChild(document.createElement("div"));
      }
    }

    init();
  }, []);

  const predict = async () => {
    const image = document.getElementById("imagePreview");
    if (!model) return;

    const predictions = await model.predictTopK(image, maxPredictions);

    let hasUnknown = false;
    for (let i = 0; i < maxPredictions; i++) {
      if (predictions[i].probability >= 0.8) {
        labelContainer.innerText = predictions[i].className;
        return;
      } else if (predictions[i].probability < 0.8 && !hasUnknown) {
        labelContainer.innerText = "Unknown";
        hasUnknown = true;
      }
    }
  };

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = e.target.result;
        imagePreview.style.display = "none";
        imagePreview.onload = () => {
          imagePreview.style.display = "block";
          predict();
        };
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div>
      <img id="imagePreview" style={{ height: "300px" }} alt="Preview" />
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={(e) => readURL(e.target)}
      />
      <div>this is: </div>
      <div id="label-container"></div>
    </div>
  );
};

export default TeachableMachineImageModel;
