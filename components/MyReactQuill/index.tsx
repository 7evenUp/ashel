import { Dispatch, SetStateAction } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css'

type MyReactQuillProps = {
  editorValue: string
  setEditorValue: Dispatch<SetStateAction<string>>
}

const MyReactQuill = ({ editorValue, setEditorValue }: MyReactQuillProps) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
  <ReactQuill
    modules={modules}
    formats={formats}
    style={{
      flex: 1,
      borderLeft: '1px solid black'
    }}
    placeholder="Editor"
    theme="bubble"
    value={editorValue}
    onChange={setEditorValue}
  />
  )
}

export default MyReactQuill