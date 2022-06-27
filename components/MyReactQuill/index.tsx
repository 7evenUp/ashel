import { Dispatch, SetStateAction } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css'

type MyReactQuillProps = {
  modules: {
    toolbar: (string[] | {
      header: (number | boolean)[];
    }[] | ({
      list: string;
    } | {
      indent: string;
    })[])[]
  }
  formats: string[] | undefined
  editorValue: string
  setEditorValue: Dispatch<SetStateAction<string>>
}

const MyReactQuill = ({modules, formats, editorValue, setEditorValue}: MyReactQuillProps) => {
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