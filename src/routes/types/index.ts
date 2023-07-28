import { IData } from "store/contact/contactSlice";

export type RoutesParam = {
    Home: undefined;
    Detail: {
        type: 'add' | 'update' | 'read',
        data: IData;
    };
  };