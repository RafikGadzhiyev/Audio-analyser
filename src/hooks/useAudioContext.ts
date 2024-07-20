import {AudioSource, IUseAudioContextProps, SourceNode} from "../types.ts";

const globalAudioContext = new AudioContext()

const FFT_SIZE_POWER_BASE = 2
const DEFAULT_FFT_SIZE_POWER = 10

export const useAudioContext = () => {
  function createAnalyser(audioContext: AudioContext, options: Readonly<IUseAudioContextProps> = {}) {
    const {
      fftPower = DEFAULT_FFT_SIZE_POWER,
      needConnectDestination = true,
    } = options

    const audioAnalyzer = audioContext.createAnalyser()

    audioAnalyzer.fftSize = FFT_SIZE_POWER_BASE ** fftPower

    if (needConnectDestination) {
      audioAnalyzer.connect(audioContext.destination) // connecting our current device speakers
    }

    return audioAnalyzer
  }

  function createSource(audioSource: AudioSource, connectionNode: AudioNode) : SourceNode {
    const source = _getSource(audioSource)

    source.connect(connectionNode)

    return source
  }

  function _getSource(audioSource: AudioSource) : SourceNode {
    if (audioSource instanceof HTMLMediaElement) {
      return globalAudioContext.createMediaElementSource(audioSource)
    }

    if (audioSource instanceof MediaStream) {
      return globalAudioContext.createMediaStreamSource(audioSource)
    }

    if (audioSource instanceof  AudioBufferSourceNode) {
      return globalAudioContext.createBufferSource()
    }

    return globalAudioContext.createConstantSource()
  }

  return {
    audioContext: globalAudioContext,
    createAnalyser,
    createSource,
  }
}
