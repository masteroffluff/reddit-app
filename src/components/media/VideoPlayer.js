import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const VideoPlayer = ({ key, options }) => {
  const container = useRef()
  const player = useRef()
    


  useEffect(() => {
    player.current = videojs(container.current, options)
    return () => {
      player.current.dispose()
    }
  }, [key,options])

  return (
    <div data-vjs-player key={key}>
      <video ref={container} />
    </div>
  )
}

export default VideoPlayer