export interface Location {
    x: number;
    y: number;
}

export const calculateDegree = (start: Location, end: Location) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const degree = Math.round(Math.atan2(dy, dx) * 180 / Math.PI)
    return (degree >= 0 ? degree : degree + 360);
}