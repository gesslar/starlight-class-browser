export interface Props {
  /** Modifier type (e.g. "public", "private", "static", "nomask", "abstract") */
  type: string;
}

declare const ClassModifier: (_props: Props) => any;
export default ClassModifier;
