import { db } from './config'
import { collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore"

export type BlogDocType = {
  docId: string
  title: string
  description: string
  date: string
  keyWords: string[]
  htmlData: string
}

export const getBlogDoc = async (docId: string) => {
  const docRef = doc(db, 'blog', docId)
  const docSnapshot = await getDoc(docRef)

  if (docSnapshot.exists()) {
    const data: BlogDocType = {
      docId,
      title: docSnapshot.data().title,
      description: docSnapshot.data().description,
      date: new Date(docSnapshot.data().date.seconds * 1000).toLocaleDateString(),
      keyWords: docSnapshot.data().keyWords,
      htmlData: docSnapshot.data().htmlData
    }
    return data
  }
}

export const deleteBlogDoc = async (docId: string) => {
  try {
    await deleteDoc(doc(db, "blog", docId))
  } catch (err) {
    console.error(err)
  }
}