import styles from './search_header.module.css'
import React, { memo, useRef } from 'react'

//memo를 썼음에도 불구하고 이렇게 아이템을 클릭하면 헤더가 업뎃되는걸 볼수있는데
//메모를 쓴다는것은 전달되는 프롭이 변경되지 않으면 리렌더링이 되지 않고,
//프롭이 바뀌면 다시 렌더링이 되는 그런 아이죠
//그 말은 onSearch가 계속 새로운것으로 업뎃되면 우리 SearchHeader에 렌더가 계속 발생할 수 있다는 말

//결국 메모를써도 prop이 계속 바뀌면 리렌더발생
//그래서 이것을 방지하고자 쓰는게 useCallback
const SearchHeader = memo(({ onSearch }) => {
  const inputRef = useRef()
  const handleSearch = () => {
    const value = inputRef.current.value
    onSearch(value)
  }
  const onClick = () => {
    handleSearch()
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  console.log('Header!!!')
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Youtube</h1>
      </div>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        placeholder="Search..."
        onKeyPress={onKeyPress}
      />
      <button className={styles.button} type="submit" onClick={onClick}>
        <img
          className={styles.buttonImg}
          src="/images/search.png"
          alt="search"
        />
      </button>
    </header>
  )
})

export default SearchHeader
