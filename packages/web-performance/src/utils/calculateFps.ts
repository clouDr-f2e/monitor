/*
 *  Record 5 FPS and take the average (frame/second)
 * */
const calculateFps = (): number => {
  let frame = 0
  let lastFrameTime = 0
  let fpsQueue = []
  let timerId = null

  const calculate = () => {
    let now = +new Date()

    frame = frame + 1

    if (now > 1000 + lastFrameTime) {
      let fps = Math.round(frame / ((now - lastFrameTime) / 1000))
      fpsQueue.push(fps)
      frame = 0
      lastFrameTime = 0

      if (fpsQueue.length > 5) {
        cancelAnimationFrame(timerId)
        return (
          fpsQueue.reduce((sum, fps) => {
            sum = sum + fps
            return sum
          }, 0) / fpsQueue.length
        )
      } else {
        timerId = requestAnimationFrame(calculate)
      }
    }
  }

  return calculate()
}

export default calculateFps
