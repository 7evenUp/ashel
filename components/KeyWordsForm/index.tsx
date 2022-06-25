import { Dispatch, SetStateAction } from "react"
import TextInput from "../Input/TextInput"

type KeyWordsForm = {
  keyWords: string[]
  setKeyWords: Dispatch<SetStateAction<string[]>>
}

const KeyWordsForm = ({keyWords, setKeyWords}: KeyWordsForm) => {
  return (
    <>
      <form
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          maxWidth: 300
        }}
        onSubmit={(e) => {
          e.preventDefault()

          setKeyWords([...keyWords, e.currentTarget.key_word.value])

          e.currentTarget.key_word.value = ''
        }}>
        <TextInput
          name="key_word"
          typeInput="text"
          />

        <button style={{
          backgroundColor: 'white',
          borderRadius: '100%',
          fontSize: 28,
          width: 40,
          height: 40,
          cursor: 'pointer',
        }}>+</button>
      </form>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        maxWidth: 300
      }}>
        {keyWords.map((el, index) => (
          <span
            key={index}
            style={{
              padding: 8,
              fontSize: 16,
              borderRadius: 5,
              backgroundColor: 'lightgreen'
            }}
            onClick={() => {
              setKeyWords([...keyWords.filter((_, i) => index !== i)])
            }}>
            {el}
          </span>
        ))}
      </div>
    </>
  )
}

export default KeyWordsForm