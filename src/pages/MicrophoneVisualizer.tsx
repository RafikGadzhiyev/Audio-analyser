import {useEffect} from 'react';
import {Text} from "@chakra-ui/react";
import {useOutletContext} from "react-router-dom";
import { IVisualizerOutletContext } from "../types.ts";

export default function MicrophoneVisualizer() {
  const {
    audioContext,

    visualize,
    createAnalyser,
    createSource
  } = useOutletContext<IVisualizerOutletContext>()

  async function runVoiceStreamAnalyzer() {
    const mediaStream = await navigator.mediaDevices.getUserMedia(
      {
        audio: true
      }
    )

    await audioContext.resume()

    const audioAnalyzer = createAnalyser(
      audioContext,
      {
        fftPower: 6,
        needConnectDestination: false,
      }
    )

    createSource(mediaStream, audioAnalyzer)

    processAndVisualize(audioAnalyzer)
  }


  useEffect(
    () => {
      runVoiceStreamAnalyzer()
        .catch(console.error)
    },
    []
  )

  function processAndVisualize(audioAnalyzer: AnalyserNode) {
    const bufferLength = audioAnalyzer.frequencyBinCount
    const bufferArray = new Uint8Array(bufferLength)

    audioAnalyzer.getByteFrequencyData(bufferArray)

    visualize(
      bufferArray,
      'white'
    )

    requestAnimationFrame(
      () => processAndVisualize(audioAnalyzer)
    )
  }

  return (
    <div>
      <Text as='b'>
        Give access to your microphone
      </Text>
    </div>
  )
}
