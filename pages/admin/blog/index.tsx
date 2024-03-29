import { FormEvent, useRef, useState } from "react"
import dynamic from "next/dynamic"
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  updateDoc
} from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../../firebase/config'
import { deleteBlogDoc } from "../../../firebase/useBlog"
import Button from "../../../components/Button"
import TextInput from "../../../components/Input/TextInput"
import KeyWordsForm from "../../../components/KeyWordsForm"
const MyReactQuill = dynamic(
  () => import('../../../components/MyReactQuill'),
  { ssr: false }
)


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

  const onEditClickHandler = (doc: QueryDocumentSnapshot<DocumentData>) => {
    setEditingPostId(doc.id)
    setIsPostEditing(true)
    setKeyWords(doc.data().keyWords)
    // @ts-ignore
    formRef.current.postTitle.value = doc.data().title
    // @ts-ignore
    formRef.current.description.value = doc.data().description
    setEditorValue(doc.data().htmlData)
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
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
  }

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
          onSubmit={onSubmitHandler}>
          <TextInput
            name="postTitle"
            typeInput="text"
            required />
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
              onChange={(e) => setDesc(e.currentTarget.value)}
              name="description"
              required
              minLength={45}
              maxLength={170} />
          </div>

          <Button title={isPostEditing ? "Изменить пост" : "Создать пост"} />
        </form>
        <MyReactQuill
          editorValue={editorValue}
          setEditorValue={setEditorValue}
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
              <div key={doc.id}>
                <span>{JSON.stringify(doc.data())},{' '}</span>
                <button
                  onClick={() => onEditClickHandler(doc)}
                  style={{
                    maxWidth: 70,
                    padding: 8,
                    backgroundColor: 'orange'
                  }}>Edit</button>
                <button
                  onClick={() => deleteBlogDoc(doc.id)}
                  style={{
                    maxWidth: 70,
                    padding: 8,
                    backgroundColor: 'lightcoral'
                  }}>Delete</button>
              </div>
            ))}
          </div>
        )}
    </main>
  )
}

export default AdminBlog