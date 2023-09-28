import { collection, doc, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDb, firebaseStorage } from "../firebase";
import { IRestaurant } from "../type/restaurant";

const restaurantSample: IRestaurant[] = [
  {
    name: "Cà phê Ngon",
    category: ["Cafe", "Dessert"],
    address: "539 Lĩnh Nam, P.Lĩnh Nam, Q.Hoàng Mai, Hà Nội",
    image:
      "https://reviewvilla.vn/wp-content/uploads/2022/07/quan-cafe-dep-o-sai-gon-6-1024x768.jpg",
    lat: 21.0170096,
    lng: 105.8079757,
    price: {
      min: 30000,
      max: 90000,
    },
    time: {
      open: "09:30",
      close: "21:00",
    },
  },
  {
    name: "Bún Riêu Bề Bề",
    category: ["Breakfirst", "Dessert"],
    address: "539 Lĩnh Nam, P.Lĩnh Nam, Q.Hoàng Mai, Hà Nội",
    image:
      "https://reviewvilla.vn/wp-content/uploads/2022/07/quan-cafe-dep-o-sai-gon-6-1024x768.jpg",
    lat: 21.01751,
    lng: 105.8178184,
    price: {
      min: 50000,
      max: 150000,
    },
    time: {
      open: "08:30",
      close: "19:00",
    },
  },
];

export const uploadImage = async (uri: string) => {
  // It won't upload image if image is not change
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const avatarName = uuid.v4() as string;
  const fileRef = ref(firebaseStorage, avatarName);
  await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  const avatarUrl = await getDownloadURL(fileRef);
  return { avatarName, avatarUrl };
};

export const createRes = async () => {
  const resUpload = restaurantSample.map(async (restaurant) => {
    const ResDocRef = doc(collection(firebaseDb, "restaurants"));
    const { avatarUrl } = await uploadImage(restaurant.image!);
    await setDoc(ResDocRef, {
      ...restaurant,
      id: ResDocRef.id,
      views: 0,
      image: avatarUrl,
    });
  });
  await Promise.all(resUpload);
};
