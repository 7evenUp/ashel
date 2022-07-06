import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { Dispatch, LegacyRef, SetStateAction, useRef } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { storage } from "../../firebase/config"

type MyReactQuillProps = {
  editorValue: string
  setEditorValue: Dispatch<SetStateAction<string>>
}

const MyReactQuill = ({ editorValue, setEditorValue }: MyReactQuillProps) => {
  const quillRef = useRef()

  const imageHandler = () => {
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      var file: any = input && input.files ? input.files[0] : null
      // @ts-ignore
      let quillObj = quillRef.current.getEditor()
      console.log(quillObj)
      console.log(file)
      const storageRefName = `blog/${file.name}_test`

      const storageRef = ref(storage, storageRefName)
      try {
        console.log('Uploading bytes...') 
        const snapshot = await uploadBytes(storageRef, file)
        const URL = await getDownloadURL(snapshot.ref)
        console.log('Bytes downloaded...')
        const range = quillObj.getSelection()
        quillObj.editor.insertEmbed(range.index, 'image', URL)
      }
      catch (error: any) {
        console.error(error)
      }
    }
  }

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <ReactQuill
      // @ts-ignore
      ref={quillRef}
      modules={modules}
      formats={formats}
      style={{
        flex: 1,
        borderLeft: '1px solid black'
      }}
      placeholder="Editor"
      theme="snow"
      value={editorValue}
      onChange={setEditorValue}
    />
  )
}

export default MyReactQuill