import {Outlet} from "react-router-dom";
import {useEffect, useRef} from "react";
import {useAudioContext} from "../hooks/useAudioContext.ts";
import {IVisualizerOutletContext} from "../types.ts";

const styles = {
  visualizerContainer: {
    display: 'flex',
    'flex-direction': 'column',
    gap: '20px',
  },
  canvas: {
    width: '1000px',
    height: '1000px',
    marginInline: 'auto',
    border: '1px solid #cdcdcd',
    borderRadius: '10px',
    flex: 1,
  }
}

const CANVAS_CONFIG = {
  WIDTH: 3000,
  HEIGHT: 300,
}

const BAR_CONFIG = {
  MIN_HEIGHT: 10,
}

export default function Visualizer() {
  const {
    audioContext,

    createSource,
    createAnalyser
  } = useAudioContext()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)

  function visualize(
    audioFrameDataBuffer: Uint8Array,
    visualizerColor: string = 'white',
  ) {
    canvasContext.current?.clearRect(0, 0, CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT)

    const BAR_WIDTH = CANVAS_CONFIG.WIDTH / audioFrameDataBuffer.length

    for (let i = 0; i < audioFrameDataBuffer.length; ++i) {
      // If we do not have canvas context then we do not need to "visualize" audio
      if (!canvasContext.current) {
        return;
      }

      const barHeight = audioFrameDataBuffer[i]
        || BAR_CONFIG.MIN_HEIGHT

      const x = i * BAR_WIDTH;
      const y = CANVAS_CONFIG.HEIGHT - barHeight

      const canvasGradient = canvasContext.current.createLinearGradient(x, y, x + BAR_WIDTH, y + audioFrameDataBuffer[i])

      canvasGradient.addColorStop(
        1,
        'transparent',
      )

      canvasGradient.addColorStop(
        0,
        visualizerColor
      )

      canvasContext.current.fillStyle = canvasGradient

      canvasContext.current?.beginPath()
      canvasContext.current?.roundRect(
        x, y, BAR_WIDTH, barHeight, [10, 10, 0, 0]
      )
      canvasContext.current?.fill()
      canvasContext.current.closePath()
    }
  }


  useEffect(
    () => {
      if (
        canvasRef.current
        && !canvasContext.current
      ) {
        canvasContext.current = canvasRef.current.getContext('2d')
      }
    },
    [canvasRef.current]
  )

  return (
    <div style={styles.visualizerContainer}>
      <Outlet
        context={
        {
          audioContext,

          visualize,
          createAnalyser,
          createSource,
        } satisfies IVisualizerOutletContext}
      />

      <canvas
        ref={canvasRef}
        width={CANVAS_CONFIG.WIDTH}
        height={CANVAS_CONFIG.HEIGHT}
        style={styles.canvas}
      >
        Your browser does not support canvas
      </canvas>
    </div>
  )
}
