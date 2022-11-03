import React, { memo } from 'react'
import styles from './video_item.module.css'

const VideoItem = memo(
  ({ video, video: { snippet }, onVideoClick, display }) => {
    const displayType = display === 'list' ? styles.list : styles.grid //video가 선택되면 grid, list보여주는 화면이면 list
    console.log(video, 'video at VideoItem.jsx')
    //비디오 매번 클릭할때마다 리렌더링 되는데,리렌더링될 필요 없으므로 memo써준다
    return (
      <li
        className={`${styles.container} ${displayType}`}
        onClick={() => onVideoClick(video)}
        // 해당 비디오 클릭하면 큰화면띄우기
      >
        <div className={styles.video}>
          <img
            className={styles.thumbnail}
            src={snippet.thumbnails.medium.url}
            alt="video thumbnail"
          />
          <div className={styles.metadata}>
            <p className={styles.title}>{snippet.title}</p>
            <p className={styles.channel}>{snippet.channelTitle}</p>
          </div>
        </div>
      </li>
    )
  },
)

export default VideoItem
