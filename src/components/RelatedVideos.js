import React from 'react'
import VideoItem from './VideoItem'

const RelatedVideos = ({ relatedVideos }) => {
  return (
    <div className="related-videos">
      {relatedVideos ?
        relatedVideos.map(video => {
          const { 
            title, 
            channelTitle,
            thumbnails, 
            publishedAt,
          } = video.snippet;
          
          return (
            <VideoItem
              className="video-item--related"
              id={video.id.videoId}
              title={title}
              channelTitle={channelTitle}
              thumbnails={thumbnails}
              publishedAt={publishedAt}
              key={video.id.videoId}
            />
          )
        })
        : null
      }
    </div>
  )
}

export default RelatedVideos
