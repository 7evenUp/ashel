import { useRef, useState } from "react"
import Button from "../../../components/Button"
import TextInput from "../../../components/Input/TextInput"
import KeyWordsForm from "../../../components/KeyWordsForm"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from '../../../firebase/config'

import { useCollection } from 'react-firebase-hooks/firestore';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css'
import { deleteBlogDoc } from "../../../firebase/useBlog"


const AdminBlog = () => {
  const formRef = useRef()
  const [keyWords, setKeyWords] = useState<Array<string>>([])
  const [isPostEditing, setIsPostEditing] = useState(false)
  const [editingPostId, setEditingPostId] = useState('')
  const [editorValue, setEditorValue] = useState('')
  const [desc, setDesc] = useState("")
  const [value, loading, error] = useCollection(collection(db, 'blog'), {
    snapshotListenOptions: { includeMetadataChanges: true}
  })

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      padding: 32
    }}>
      <KeyWordsForm keyWords={keyWords} setKeyWords={setKeyWords}/>
      <div style={{
        display: 'flex',
        gap: 32
      }}>
        <form
          // @ts-ignore
          ref={formRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 300
          }}
          onSubmit={async (e) => {
            e.preventDefault()
            const resultObject = {
              keyWords,
              title: e.currentTarget.postTitle.value,
              description: e.currentTarget.description.value,
              date: new Date(Date.now()),
              htmlData: editorValue
            }

            if (isPostEditing) {
              const result = await updateDoc(doc(db, 'blog', editingPostId), resultObject)
              setIsPostEditing(false)
            } else {
              const result = await addDoc(collection(db, 'blog'), resultObject)
            }

            setKeyWords([])
          }}>
          <TextInput
            name="postTitle"
            typeInput="text"
            required
            />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            <label htmlFor="description">Description {desc.length}/170</label>
            <textarea
              id="description"
              style={{
                resize: 'none',
                padding: 8,
                fontSize: 16,
                borderRadius: 5,
                height: 150
              }}
              onChange={(e) => {
                setDesc(e.currentTarget.value)
              }}
              name="description"
              required
              minLength={45}
              maxLength={170} />
          </div>

          <Button title={isPostEditing ? "Изменить пост" : "Создать пост"} />
        </form>
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
      </div>

      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            Collection:{' '}
            {value.docs.map((doc) => (
              <>
                <span key={doc.id}>
                  {JSON.stringify(doc.data())},{' '}
                </span>
                <button
                  onClick={() => {
                    setEditingPostId(doc.id)
                    setIsPostEditing(true)
                    setKeyWords(doc.data().keyWords)
                    // @ts-ignore
                    formRef.current.postTitle.value = doc.data().title
                    // @ts-ignore
                    formRef.current.description.value = doc.data().description
                    setEditorValue(doc.data().htmlData)
                  }}
                  style={{
                    maxWidth: 70,
                    padding: 8,
                    backgroundColor: 'orange'
                  }}
                >Edit</button>
                <button
                  onClick={() => {
                    deleteBlogDoc(doc.id)
                  }}
                  style={{
                    maxWidth: 70,
                    padding: 8,
                    backgroundColor: 'lightcoral'
                  }}
                >Delete</button>
              </>
            ))}
          </div>
        )}

    </main>
  )
}

export default AdminBlog