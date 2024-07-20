import {useRef, ChangeEvent } from "react";
import {useOutletContext} from "react-router-dom";
import {Input, Text} from "@chakra-ui/react";

import {createBlobAndGetURL} from "../helpers/system.helper.ts";
import {getRandomHEX} from "../helpers/color.helper.ts";

import {SourceNode, IVisualizerOutletContext} from "../types.ts";

export default function SongVisualizer() {
  const {
    audioContext,

    visualize,
    createAnalyser,
    createSource
  } = useOutletContext<IVisualizerOutletContext>()

  const generatedColor = useRef('')
  const audioOutputRef = useRef<HTMLAudioElement | null>(null)
  const connectedSourceNode = useRef<SourceNode | null>(null)
  const connectedAudioAnalyser = useRef<AnalyserNode | null>(null)

  const selectFile = async (e: ChangeEvent) => {
    const inputField = e.target as HTMLInputElement

    const files = inputField.files

    if (!files?.length) {
      return
    }

    const firstFile = files[0]

    generatedColor.current = getRandomHEX()

    const audioArrayBuffer = await firstFile.arrayBuffer()

    const blobURL = createBlobAndGetURL(
      [ audioArrayBuffer ],
      {
        type: 'audio/mpeg'
      }
    )

    await audioContext.resume()

    if (!connectedAudioAnalyser.current) {
      connectedAudioAnalyser.current = createAnalyser(audioContext)
    }

    if (audioOutputRef.current) {
      audioOutputRef.current.src = blobURL

      if (!connectedSourceNode.current) {
        connectedSourceNode.current = createSource(
          audioOutputRef.current,
          connectedAudioAnalyser.current
        )
      }

      processDataBufferAndVisualize(connectedAudioAnalyser.current)
    }
  }

  function processDataBufferAndVisualize(audioAnalyzer: AnalyserNode) {
    const bufferLength = audioAnalyzer.frequencyBinCount
    const buffer = new Uint8Array(bufferLength)

    //current frame buffer data
    audioAnalyzer.getByteFrequencyData(buffer)

    visualize(
      buffer,
      generatedColor.current,
    )

    requestAnimationFrame(
      () => processDataBufferAndVisualize(audioAnalyzer)
    )
  }

  return (
    <div>
      <Text as='b'>
        Select a song for visualizing
      </Text>

      <Input
        type='file'
        w={400}
        onChange={selectFile}
        accept='audio/*'
      />

      <audio
        ref={audioOutputRef}
        controls
      />
    </div>
  )
}
