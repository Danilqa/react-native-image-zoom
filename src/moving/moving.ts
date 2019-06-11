declare type quadrantPlane = 0 | 1 | 2 | 3 | 4;

export interface IPoint {
    x: number;
    y: number
}

export class Moving {
    public static RANGE_ERROR = 0.03;

    public static isTrue(prev1: IPoint, current1: IPoint, prev2: IPoint, current2: IPoint) {
        const delta1 = Moving.diff(prev1, current1);
        const delta2 = Moving.diff(prev2, current2);

        const quadrantPlanes1 = Moving.getPossibleQuadrantPlanes(delta1);
        const quadrantPlanes2 = Moving.getPossibleQuadrantPlanes(delta2);

        // @ts-ignore
        return quadrantPlanes1.some(plane => quadrantPlanes2.includes(plane));
    }

    public static getPossibleQuadrantPlanes(point: IPoint): quadrantPlane[] {
        const {getPossiblePointsWithError, getQuadrantPlane} = Moving;
        const possiblePoints = getPossiblePointsWithError(point);
        return possiblePoints.map(getQuadrantPlane);
    }

    public static getPossiblePointsWithError(point: IPoint): IPoint[] {
        const {RANGE_ERROR} = Moving;

        return [
            {x: point.x, y: point.y},
            {x: point.x + RANGE_ERROR, y: point.y},
            {x: point.x - RANGE_ERROR, y: point.y},
            {x: point.x, y: point.y + RANGE_ERROR},
            {x: point.x, y: point.y - RANGE_ERROR},
            {x: point.x + RANGE_ERROR, y: point.y + RANGE_ERROR},
            {x: point.x - RANGE_ERROR, y: point.y - RANGE_ERROR},
            {x: point.x - RANGE_ERROR, y: point.y + RANGE_ERROR},
            {x: point.x + RANGE_ERROR, y: point.y - RANGE_ERROR}
        ]
    }

    public static getQuadrantPlane(point: IPoint): quadrantPlane {
        const {isPositive, isNegativeOrNull} = Moving;

        if (isPositive(point.x) && isPositive(point.y)) {
            return 2;
        } else if (isPositive(point.x) && isNegativeOrNull(point.y)) {
            return 4;
        } else if (isNegativeOrNull(point.x) && isNegativeOrNull(point.y)) {
            return 3;
        } else if (isNegativeOrNull(point.x) && isPositive(point.y)) {
            return 1;
        } else {
            return 0;
        }
    }

    public static diff(pointA: IPoint, pointB: IPoint): IPoint {
        const {x: xa, y: ya} = pointA;
        const {x: xb, y: yb} = pointB;

        const x = xb - xa;
        const y = yb - ya;

        return {x, y}
    }

    public static isNegativeOrNull(n: number): boolean {
        return n <= 0;
    }

    public static isPositive(n: number): boolean {
        return 0 < n;
    }
}
