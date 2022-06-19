import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { storage, db } from './config'

export const addDocument = async (blob: Blob, title: string) => {
  const date = new Date(Date.now())

  const storageRef = ref(storage, `${title}_${date.toLocaleTimeString()}`)

  try {
    const snapshot = await uploadBytes(storageRef, blob)
    const URL = await getDownloadURL(snapshot.ref)
    const result = await addDoc(collection(db, 'gallery'), {
      title: title,
      imgSrc: URL,
      date: date
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

export type GalleryDocType = {
  title: string
  imgSrc: string
  date: string
}

export const getGalleryDocs = async () => {
  const querySnapshot = await getDocs(collection(db, 'gallery'))
  let data: Array<GalleryDocType> = []
  querySnapshot.forEach(doc => {
    const docData = doc.data()
    console.log(docData)
    data.push({
      title: docData.title,
      imgSrc: docData.imgSrc,
      date: new Date(docData.date.seconds * 1000).toLocaleDateString()
    })
  })

  return data
}