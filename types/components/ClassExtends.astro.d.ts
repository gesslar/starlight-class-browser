export interface Props {
  /** Parent class/interface name */
  name: string;
  /** Source file path */
  source?: string;
  /** Syntax highlight type (maps to cb-hl-* CSS class) */
  highlight?: string;
  /** Display label (default: "extends") */
  label?: string;
  /** Link URL — no protocol = internal */
  target?: string;
}

declare const ClassExtends: (_props: Props) => any;
export default ClassExtends;
