export interface Props {
  /** Property name */
  name: string;
  /** Syntax highlight type (maps to cb-hl-* CSS class) */
  highlight?: string;
  /** Display label (default: "prop") */
  label?: string;
  /** Link URL — no protocol = internal */
  target?: string;
}

declare const ClassProperty: (_props: Props) => any;
export default ClassProperty;
