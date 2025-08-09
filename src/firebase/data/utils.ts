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
export const DistrictName = (districtId?: string) => {
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

export enum ECategory {
  Cafe = "0",
  AnVat = "1",
  TraChanh = "2",
  BanhTrang = "3",
}

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
export const selectCategory = [
  {
    label: "Cafe",
    value: ECategory.Cafe,
  },
  {
    label: "Ăn Vặt",
    value: ECategory.AnVat,
  },
  {
    label: "Trà Chanh",
    value: ECategory.TraChanh,
  },
  {
    label: "Bánh Tráng",
    value: ECategory.BanhTrang,
  },
];
