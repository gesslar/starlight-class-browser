export interface Props {
  /** Method name */
  name: string;
  /** Syntax highlight type for the name (maps to cb-hl-* CSS class) */
  highlight?: string;
  /** Pre-expand this method card */
  open?: boolean;
}

declare const ClassMethod: (_props: Props) => any;
export default ClassMethod;
