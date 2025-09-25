import { Dimensions } from "react-native";

export enum EDistrict {
  BaDinh = "0",
  CauGiay = "1",
  HoanKiem = "2",
  DongDa = "3",
  HaiBaTrung = "4",
  HoangMai = "5",
  LongBien = "6",
  TayHo = "7",
}
export const DistrictName = (districtId: string) => {
  switch (districtId) {
    case "0":
      return "Quận Ba Đình";
    case "1":
      return "Quận Cầu giấy";
    case "2":
      return "Quận Hoàn kiếm";
    case "3":
      return "Quận Đống Đa";
    case "4":
      return "Quận Hai Bà Trưng";
    case "5":
      return "Quận Hoàng Mai";
    case "6":
      return "Quận Long Biên";
    case "7":
      return "Quận Tây Hồ";
    default:
      return "Không xác định";
  }
};
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const selectDistrict = [
  {
    label: "Quận Ba Đình",
    value: EDistrict.BaDinh,
  },
  {
    label: "Quận Cầu giấy",
    value: EDistrict.CauGiay,
  },
  {
    label: "Quận Hoàn kiếm",
    value: EDistrict.HoanKiem,
  },
  {
    label: "Quận Đống Đa",
    value: EDistrict.DongDa,
  },
  {
    label: "Quận Hai Bà Trưng",
    value: EDistrict.HaiBaTrung,
  },
  {
    label: "Quận Hoàng Mai",
    value: EDistrict.HoangMai,
  },
  {
    label: "Quận Long Biên",
    value: EDistrict.LongBien,
  },
  {
    label: "Quận Tây Hồ",
    value: EDistrict.TayHo,
  },
];

export enum ECategory {
  BuaSang = "0",
  BuaTrua = "1",
  BuaToi = "2",
  Cafe = "3",
  AnVat = "4",
  Tra = "5",
  BanhTrang = "6",
  Ruou = "7",
  NemRan = "8",
  Bun = "9",
  Xien = "10",
  Che = "11",
  TrangMieng = "12",
  BanhMi = "13",
  NemCuon = "14",
  Com = "15",
}

export const selectCategory = [
  {
    label: "Bữa Sáng",
    value: ECategory.BuaSang,
  },
  {
    label: "Bánh Trưa",
    value: ECategory.BuaTrua,
  },
  {
    label: "Bữa Tối",
    value: ECategory.BuaToi,
  },
  {
    label: "Tráng miệng",
    value: ECategory.TrangMieng,
  },
  {
    label: "Cơm",
    value: ECategory.Com,
  },
  {
    label: "Cafe",
    value: ECategory.Cafe,
  },
  {
    label: "Bánh Mì",
    value: ECategory.BanhMi,
  },
  {
    label: "Ăn Vặt",
    value: ECategory.AnVat,
  },
  {
    label: "Trà",
    value: ECategory.Tra,
  },
  {
    label: "Bánh Tráng",
    value: ECategory.BanhTrang,
  },
  {
    label: "Bún",
    value: ECategory.Bun,
  },
  {
    label: "Chè",
    value: ECategory.Che,
  },
  {
    label: "Nem Cuốn",
    value: ECategory.NemCuon,
  },
  {
    label: "Nem Rán",
    value: ECategory.NemRan,
  },
  {
    label: "Rượu",
    value: ECategory.Ruou,
  },
  {
    label: "Xiên",
    value: ECategory.Xien,
  },
];
