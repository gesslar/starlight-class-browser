export interface Props {
  /** Type string to display */
  type: string;
  /** Syntax highlight type (maps to cb-hl-* CSS class) */
  highlight?: string;
}

declare const ClassPropertyType: (_props: Props) => any;
export default ClassPropertyType;
