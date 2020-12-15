export interface IScreenProps {
  setHudVisible?(visible: boolean): void;
  showAlert?(mess: string): void;
}

export interface IBaseProps {
  navigation?: any;
  screenProps?: IScreenProps;
  route?: any;
}

export interface storeAuthen {
  listRepo?: Array<any>;
  totalRepo?: number;
  isLoading: boolean;
  listStar?: Array<any>;
}
