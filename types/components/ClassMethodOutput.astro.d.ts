export interface Props {
  /** Return type */
  type: string;
  /** Syntax highlight type for the type (maps to cb-hl-* CSS class) */
  highlight?: string;
  /** Hint text shown below the row (e.g. source file path) */
  hint?: string;
  /** Link URL — no protocol = internal */
  target?: string;
}

declare const ClassMethodOutput: (_props: Props) => any;
export default ClassMethodOutput;
