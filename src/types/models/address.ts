export type Address = {
  id: number;
  receiverName: string;
  receiverPhone: string;
  address: string;
  ward: string; // phường
  district: string; // quận
  province: string; // thành phố
  isDefault?: boolean;
};
