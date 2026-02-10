declare module "react-input-mask" {
  import { Component } from "react";

  export interface InputMaskProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
  }

  export default class InputMask extends Component<InputMaskProps> {}
}
