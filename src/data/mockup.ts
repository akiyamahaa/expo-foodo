import { collection, doc, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDb, firebaseStorage } from "../firebase";
import { IRestaurant } from "../type/restaurant";
import { ECategory, EDistrict } from "./utils";

export const restaurantSample: IRestaurant[] = [
  {
    name: "Xofa Café & Bistro",
    category: [ECategory.Cafe, ECategory.Ruou, ECategory.TrangMieng],
    address: "539 Lĩnh Nam, P.Lĩnh Nam, Q.Hoàng Mai, Hà Nội",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPEA7Ew-JLQ_ASek_bHkDrd3AqC4DJd85nL_yt1=w408-h270-k-no",
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
    district: EDistrict.HoangMai,
  },
  {
    name: "Bún Riêu Bề Bề",
    category: [ECategory.BuaTrua, ECategory.Bun, ECategory.BuaSang],
    address: "9 P. Tuệ Tĩnh, Bùi Thị Xuân, Hai Bà Trưng, Hà Nội, Việt Nam",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipNnKc-1jNcCez47lAciOuz44fhXyvwVcLl-_68J=w426-h240-k-no",
    lat: 21.01813,
    lng: 105.849925,
    price: {
      min: 40000,
      max: 120000,
    },
    time: {
      open: "08:30",
      close: "22:00",
    },
    district: EDistrict.HaiBaTrung,
  },
  {
    name: "Quán Chân Gà Nướng Mỹ Miều",
    category: [ECategory.BuaTrua, ECategory.AnVat, ECategory.BuaToi],
    address:
      "Ngõ 65 P.Phạm Ngọc Thạch, Khu tập thể Kim Liên, Đống Đa, Hà Nội, Việt Nam",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPlgtU_Pl8L3SbLAho9vBtw1Ium4fjz021yElau=w426-h240-k-no",
    lat: 21.008477,
    lng: 105.835036,
    price: {
      min: 30000,
      max: 1300000,
    },
    time: {
      open: "07:00",
      close: "22:00",
    },
    district: EDistrict.DongDa,
  },
  {
    name: "Huyền nem rán Hàng Bè",
    category: [ECategory.NemRan, ECategory.AnVat],
    address: "21 P. Hàng Bè, Hàng Bạc, Hoàn Kiếm, Hà Nội, Việt Nam",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipM5NTxAi-4Y5J1aCmQ5gFV8uwFGnY2jSZ4IB6pt=w408-h544-k-no",
    lat: 21.03303,
    lng: 105.853804,
    price: {
      min: 30000,
      max: 80000,
    },
    time: {
      open: "07:00",
      close: "22:00",
    },
    district: EDistrict.HoanKiem,
  },
  {
    name: "Quán xiên cổng Trường Đại học Lao động - Xã hội",
    category: [ECategory.Xien, ECategory.AnVat],
    address: "43 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội, Việt Nam",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/3/2/29590441733938884408413354922482124157373697n-16776598333052015332142-1677727316865-16777273239791962720762.jpg",
    lat: 21.012269,
    lng: 105.802312,
    price: {
      min: 10000,
      max: 50000,
    },
    time: {
      open: "07:00",
      close: "19:00",
    },
    district: EDistrict.CauGiay,
  },
  {
    name: "Chè Trang",
    category: [ECategory.Che, ECategory.TrangMieng],
    address:
      "Ngõ 235 P. Trần Quốc Hoàn, Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMtvlGSnIgkLXij3otnyh1i4beh2PjmsJsUsyE8=w408-h342-k-no",
    lat: 21.041663,
    lng: 105.782307,
    price: {
      min: 20000,
      max: 50000,
    },
    time: {
      open: "09:30",
      close: "22:00",
    },
    district: EDistrict.CauGiay,
  },
  {
    name: "Bánh Mỳ Nướng Lạng Sơn",
    category: [ECategory.BanhMi, ECategory.BuaTrua, ECategory.BuaToi],
    address: "201 P. Trần Quốc Hoàn, Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipNBzSPjSetch5fkC77YH_kPfOv5i5y2SUaQGtpV=w408-h408-k-no",
    lat: 21.041663,
    lng: 105.782307,
    price: {
      min: 35000,
      max: 60000,
    },
    time: {
      open: "07:00",
      close: "22:00",
    },
    district: EDistrict.CauGiay,
  },

  {
    name: "Nem nướng Nha Trang chị Quỳnh",
    category: [ECategory.NemCuon, ECategory.BuaTrua, ECategory.BuaToi],
    address: "201 P. Trần Quốc Hoàn, Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam",
    image: "  ",
    lat: 21.042113,
    lng: 105.784811,
    price: {
      min: 35000,
      max: 50000,
    },
    time: {
      open: "09:30",
      close: "22:00",
    },
    district: EDistrict.CauGiay,
  },
];

export const uploadImage = async (uri: string) => {
  // It won't upload image if image is not change
  console.log("eror here");

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
  const resUpload = restaurantSample.map(async (restaurant, index) => {
    const ResDocRef = doc(
      firebaseDb,
      "restaurants",
      `${index}
    `
    );
    const { avatarUrl } = await uploadImage(restaurant.image!);
    await setDoc(ResDocRef, {
      ...restaurant,
      id: ResDocRef.id,
      views: 0,
      image: avatarUrl,
    });
  });
  console.log("here");
};
