import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDb, firebaseStorage } from "../firebase";
import { IRestaurantMockup } from "../type/restaurant";
import { ECategory, EDistrict } from "./utils";
import { collection, doc, setDoc } from "firebase/firestore";

export const restaurantSample: IRestaurantMockup[] = [
  {
    name: "Xofa Café & Bistro",
    category: [ECategory.Cafe, ECategory.Ruou, ECategory.TrangMieng],
    address: "539 Lĩnh Nam, P. Lĩnh Nam, Q. Hoàng Mai, Hà Nội",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
    lat: 21.0170096,
    lng: 105.8079757,
    price: { min: 30000, max: 90000 },
    time: { open: "09:30", close: "21:00" },
    district: EDistrict.HoangMai, // ✅ dùng enum
    menu: [
      {
        name: "Cà phê sữa đá",
        basePrice: 35000,
        category: "Đồ uống",
        photo: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
      },
      {
        name: "Bánh tiramisu",
        basePrice: 65000,
        category: "Tráng miệng",
        photo: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642",
      },
      {
        name: "Trà đào cam sả",
        basePrice: 45000,
        category: "Đồ uống",
        photo: "https://images.unsplash.com/photo-1541976076758-347942db1970",
      },
    ],
  },
  {
    name: "Bún Riêu Bề Bề",
    category: [ECategory.BuaTrua, ECategory.Bun, ECategory.BuaSang],
    address: "9 P. Tuệ Tĩnh, Bùi Thị Xuân, Hai Bà Trưng, Hà Nội",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    lat: 21.01813,
    lng: 105.849925,
    price: { min: 40000, max: 120000 },
    time: { open: "08:30", close: "22:00" },
    district: EDistrict.HaiBaTrung, // ✅ dùng enum
    menu: [
      {
        name: "Bún riêu bề bề đặc biệt",
        basePrice: 85000,
        category: "Món chính",
        photo: "https://images.unsplash.com/photo-1544025162-d76694265947",
      },
      {
        name: "Quẩy nóng",
        basePrice: 15000,
        category: "Khai vị",
        photo: "https://images.unsplash.com/photo-1543339308-43f5b64cfb2b",
      },
      {
        name: "Trà đá",
        basePrice: 3000,
        category: "Đồ uống",
        photo: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
      },
    ],
  },
];

export async function uploadImageToFolder(uri: string, folderPath: string) {
  // 1) Tải blob bằng fetch + timeout (tránh treo -> crash)
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 20000); // 20s
  let resp: Response;
  try {
    resp = await fetch(uri, { signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
  if (!resp.ok)
    throw new Error(`Download failed: ${resp.status} ${resp.statusText}`);
  const blob: Blob = await resp.blob();

  // 2) Đặt tên file trong folder = rid
  const ext = (blob.type?.split("/")?.[1] || "jpg").split(";")[0] || "jpg";
  const filename = `${uuid.v4()}.${ext}`;
  const fullPath = folderPath
    ? `${folderPath.replace(/^\/+|\/+$/g, "")}/${filename}`
    : filename;

  // 3) Upload
  const fileRef = ref(firebaseStorage, fullPath);
  await uploadBytes(fileRef, blob, { contentType: blob.type || "image/jpeg" });

  const url = await getDownloadURL(fileRef);
  return url;
}

const tinyDelay = (ms = 250) => new Promise((res) => setTimeout(res, ms));

export const seedRestaurantsWithMenus = async () => {
  for (const restaurant of restaurantSample) {
    try {
      // 1) tạo doc id
      const ResDocRef = doc(collection(firebaseDb, "restaurants-2")); // bạn đang dùng restaurants-2
      const rid = ResDocRef.id;

      // 2) upload cover (menu photo giữ nguyên URL)
      let coverUrl = restaurant.image;

      // 3) embed menu giữ nguyên ảnh gốc (không upload)
      const menuEmbedded = (restaurant.menu ?? []).map((item, index) => ({
        id: item.id ?? String(index),
        ...item,
      }));

      const restaurantData: IRestaurantMockup = {
        ...restaurant,
        id: rid,
        image: coverUrl,
        menu: menuEmbedded,
      };

      await setDoc(ResDocRef, restaurantData);
      console.log(`Seeded: ${restaurant.name} (${rid})`);

      // 4) Nghỉ 250ms giảm áp lực bộ nhớ/network trước khi sang quán kế tiếp
      await tinyDelay(250);
    } catch (err) {
      // Quan trọng: catch ở mức từng nhà hàng để không “nổ vòng lặp”
      console.error(`[seed] failed on ${restaurant.name}`, err);
      // tiếp tục sang item tiếp theo
    }
  }
  console.log("[seed] DONE (embedded menu, cover uploaded).");
};
