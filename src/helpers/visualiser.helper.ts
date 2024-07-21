export function processDataBuffer(audioAnalyzer: AnalyserNode) {
  const bufferLength = audioAnalyzer.frequencyBinCount
  const buffer = new Uint8Array(bufferLength)

  //current frame buffer data
  audioAnalyzer.getByteFrequencyData(buffer)


  return buffer
}
