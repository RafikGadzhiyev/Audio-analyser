export interface IUseAudioContextProps {
  fftPower?: number
  needConnectDestination?: boolean
}

export interface IVisualizerOutletContext {
  audioContext: AudioContext

  visualize: (audioFrameDataBuffer: Uint8Array, color: string) => void
  createAnalyser: (audioContext: AudioContext, options?: Readonly<IUseAudioContextProps>) => AnalyserNode
  createSource: (audioSource: AudioSource, connectionNode: AudioNode) => SourceNode
}

export type AudioSource = HTMLMediaElement
  | MediaStream
  | AudioBufferSourceNode
  | ConstantSourceNode

export type SourceNode = MediaElementAudioSourceNode
  | MediaStreamAudioSourceNode
  | ConstantSourceNode
  | AudioBufferSourceNode
