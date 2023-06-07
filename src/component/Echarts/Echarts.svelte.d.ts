/* eslint-disable @typescript-eslint/ban-types */
import { SvelteComponentTyped } from "svelte";

declare const __propDef: {
    props: {
        [x: string]: any;
        /** Apply arbitrary clases to the entire `#page` region.*/
        width?: string | undefined;
        height?: string | undefined;
        option?: any | undefined;
        onClick?: (item: any) => any | undefined;
    };
    events: {
        rollbackPath: CustomEvent<any>
    };
    slots: {}
};
export type EchartsProps = typeof __propDef.props;
export type EchartsEvents = typeof __propDef.events;
export type EchartsSlots = typeof __propDef.slots;
export default class Echarts extends SvelteComponentTyped<EchartsProps, EchartsEvents, EchartsSlots> {
}
export { TreeNode };
