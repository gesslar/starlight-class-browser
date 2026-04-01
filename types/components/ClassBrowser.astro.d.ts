export interface Props {
  /** Language for syntax context (e.g. "lpc", "typescript", "lua") */
  language?: string;
  /** Class/module/object name */
  name: string;
  /** Source file path */
  source?: string;
  /** Type badge: object, module, class, interface */
  type?: string;
  /** Link URL — no protocol = internal */
  target?: string;
}

declare const ClassBrowser: (_props: Props) => any;
export default ClassBrowser;
