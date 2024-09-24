import { IControl, Map } from 'mapbox-gl';

declare class MapboxDirections implements IControl {
    constructor(options?: MapboxDirectionsOptions);
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
    // Add any additional methods and properties if needed
}

declare global {
    interface Window {
        MapboxDirections: typeof MapboxDirections;
    }
}
