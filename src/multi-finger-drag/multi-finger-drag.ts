declare type quadrantPlane = 0 | 1 | 2 | 3 | 4;

export interface IPoint {
    x: number;
    y: number
}

export class MultiFingerDrag {
    public static RANGE_ERROR = 0.03;

    public static isActive(prev1: IPoint, current1: IPoint, prev2: IPoint, current2: IPoint) {
        const { getDiff, getPossibleQuadrantPlanes } = MultiFingerDrag;

        const delta1 = getDiff(prev1, current1);
        const delta2 = getDiff(prev2, current2);

        // tslint:disable-next-line:no-console
        console.log({ delta1, delta2 });

        const quadrantPlanes1 = getPossibleQuadrantPlanes(delta1);
        const quadrantPlanes2 = getPossibleQuadrantPlanes(delta2);

        // TS doesn't understand that this is an array
        // @ts-ignore
        return quadrantPlanes1.some(plane => quadrantPlanes2.includes(plane));
    }

    public static getCenter(pointA: IPoint, pointB: IPoint): IPoint {
        const { getDiff } = MultiFingerDrag;

        let { x, y } = getDiff(pointA, pointB);

        x = Math.abs(x);
        y = Math.abs(y);

        return { x, y };
    }

    public static getDiff(pointA: IPoint, pointB: IPoint): IPoint {
        const { x: xa, y: ya } = pointA;
        const { x: xb, y: yb } = pointB;

        const x = xb - xa;
        const y = yb - ya;

        return { x, y };
    }

    private static getPossibleQuadrantPlanes(point: IPoint): quadrantPlane[] {
        const { getPossiblePointsWithError, getQuadrantPlane } = MultiFingerDrag;

        const possiblePoints = getPossiblePointsWithError(point);
        return possiblePoints.map(getQuadrantPlane);
    }

    private static getPossiblePointsWithError(point: IPoint): IPoint[] {
        const { RANGE_ERROR } = MultiFingerDrag;

        return [
            { x: point.x, y: point.y },
            { x: point.x + RANGE_ERROR, y: point.y },
            { x: point.x - RANGE_ERROR, y: point.y },
            { x: point.x, y: point.y + RANGE_ERROR },
            { x: point.x, y: point.y - RANGE_ERROR },
            { x: point.x + RANGE_ERROR, y: point.y + RANGE_ERROR },
            { x: point.x - RANGE_ERROR, y: point.y - RANGE_ERROR },
            { x: point.x - RANGE_ERROR, y: point.y + RANGE_ERROR },
            { x: point.x + RANGE_ERROR, y: point.y - RANGE_ERROR }
        ];
    }

    private static getQuadrantPlane(point: IPoint): quadrantPlane {
        const { isPositive, isNegativeOrNull } = MultiFingerDrag;

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

    private static isNegativeOrNull(n: number): boolean {
        return n <= 0;
    }

    private static isPositive(n: number): boolean {
        return 0 < n;
    }
}
