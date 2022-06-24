import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { storage, db } from './config'

export type GalleryDocType = {
  docId: string
  title: string
  imgSrc: string
  date: string
  storageRefName: string
}

export const addDocument = async (blob: Blob, title: string) => {
  const date = new Date(Date.now())
  const storageRefName = `images/${title}_${date.toLocaleTimeString()}`

  const storageRef = ref(storage, storageRefName)

  try {
    const snapshot = await uploadBytes(storageRef, blob)
    const URL = await getDownloadURL(snapshot.ref)
    const result = await addDoc(collection(db, 'gallery'), {
      title: title,
      imgSrc: URL,
      date: date,
      storageRefName
    })

    return {
      resultId: result.id,
      error: ''
    }
  }
  catch (error: any) {
    return {
      resultId: '',
      error: error.message
    }
  }
}

export const getGalleryDocs = async () => {
  const querySnapshot = await getDocs(collection(db, 'gallery'))
  let data: Array<GalleryDocType> = []
  querySnapshot.forEach(doc => {
    const docData = doc.data()
    data.push({
      docId: doc.id,
      title: docData.title,
      imgSrc: docData.imgSrc,
      date: new Date(docData.date.seconds * 1000).toLocaleDateString(),
      storageRefName: docData.storageRefName
    })
  })

  return data
}

export const deleteGalleryDoc = async (docId: string, fileName: string) => {
  try {
    await deleteDoc(doc(db, "gallery", docId))
    console.log("Doc deleted")
    const desertRef = ref(storage, fileName)
    await deleteObject(desertRef)
    console.log('DELETED')
  } catch (err) {
    console.error(err)
  }
}