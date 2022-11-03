import React, { useEffect, useState, useCallback } from 'react'
import styles from './app.module.css'
import VideoList from './components/video_list/video_list'
import SearchHeader from './components/search_header/search_header'
import VideoDetail from './components/video_detail/video_detail'

function App({ youtube }) {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)

  //앱이라는 컴포넌트는 function컴포넌트이기 때문에 관련된 state나 prop이 바뀌면
  //우리가 여기 정의한 멤버 변수(selectVideo, search)가 다시 만들어지죠
  //그말은 여기 콜백함수들이 다시 새롭게 만들어진다는거에요
  //즉 state가 바뀔때마다

  //여기 search(const search = (query) => {...) 라는 것은
  //새로운 함수를 가리키게 됩니다
  //그리고 이 서치는 SearchHeader 에 전달이 되기때문에
  //새로운 프롭이 전달되는거랑 동일합니다
  //그래서 우리가 memo를 썼음에도 불구하고 계속적으로 렌더가 발생하는거에요

  const selectVideo = (video) => {
    setSelectedVideo(video)

    // 비디오 하나 클릭해서 비디오에 대한 화면이 들어올때 찍힘.
    console.log(video, 'video at app.jsx')
  }

  const search = useCallback((query) => {
    setSelectedVideo(null)
    //videos가 받아졌다면 videos 큰화면 페이지에서 만약 검색창에 bts쳐서 다시 list항목으로 가고싶을경우
    //위와 같이 초기화 시키면된다
    youtube
      .search(query) //
      .then((videos) => {
        setVideos(videos)
      })
  }, [])

  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos))
  }, [youtube])

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            {/* 상세 비디오 큰화면 */}
            <VideoDetail video={selectedVideo} />
          </div>
        )}

        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? 'list' : 'grid'}
          />
        </div>
      </section>
    </div>
  )
}

export default App
