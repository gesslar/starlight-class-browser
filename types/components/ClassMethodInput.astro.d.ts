export interface Props {
  /** Parameter name */
  name: string;
  /** Type annotation */
  type?: string;
  /** Syntax highlight type for the name (maps to cb-hl-* CSS class) */
  highlight?: string;
  /** Syntax highlight type for the type annotation */
  typeHighlight?: string;
  /** Hint text shown below the row (e.g. source file path) */
  hint?: string;
  /** Link URL — no protocol = internal */
  target?: string;
}

declare const ClassMethodInput: (_props: Props) => any;
export default ClassMethodInput;
