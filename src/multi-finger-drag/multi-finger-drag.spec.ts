import { IPoint, MultiFingerDrag } from './multi-finger-drag';

describe('MultiFingerDrag', () => {
    // We need to write specification about inner methods
    // @ts-ignore
    const { isActive, getQuadrantPlane, getDiff } = MultiFingerDrag;

    it('should return diff of two points', () => {
        const pointA = { x: 10, y: -5 } as IPoint;
        const pointB = { x: 11, y: -7 } as IPoint;

        const actual = getDiff(pointA, pointB);

        expect(actual).toEqual({ x: 1, y: -2 });
    });

    it('should return true if vectors are align', () => {
        const startPointOfFirstFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfFirstFinger = { x: 2, y: 3 } as IPoint;
        const startPointOfSecondFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfSecondFinger = { x: -2, y: 3 } as IPoint;

        const actual = isActive(
            startPointOfFirstFinger,
            startPointOfSecondFinger,
            endPointOfFirstFinger,
            endPointOfSecondFinger
        );

        expect(actual).toBeTruthy();
    });

    it('should return false if vectors are in the horizontal opposite directions', () => {
        const startPointOfFirstFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfFirstFinger = { x: 10, y: 0 } as IPoint;
        const startPointOfSecondFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfSecondFinger = { x: -10, y: 0 } as IPoint;

        const actual = isActive(
            startPointOfFirstFinger,
            endPointOfFirstFinger,
            startPointOfSecondFinger,
            endPointOfSecondFinger
        );

        expect(actual).toBeFalsy();
    });

    it('should return false if vectors are in the vertical opposite directions', () => {
        const startPointOfFirstFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfFirstFinger = { x: 0, y: 7 } as IPoint;
        const startPointOfSecondFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfSecondFinger = { x: 0, y: -5 } as IPoint;

        const actual = isActive(
            startPointOfFirstFinger,
            endPointOfFirstFinger,
            startPointOfSecondFinger,
            endPointOfSecondFinger
        );

        expect(actual).toBeFalsy();
    });

    it('should return false in cross opposite directions', () => {
        const startPointOfFirstFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfFirstFinger = { x: 3, y: 7 } as IPoint;
        const startPointOfSecondFinger = { x: 0, y: 0 } as IPoint;
        const endPointOfSecondFinger = { x: -4, y: -5 } as IPoint;

        const actual = isActive(
            startPointOfFirstFinger,
            endPointOfFirstFinger,
            startPointOfSecondFinger,
            endPointOfSecondFinger
        );

        expect(actual).toBeFalsy();
    });

    it('should return first quadrant plane', () => {
        const pointA = { x: 0, y: 0 } as IPoint;
        const pointB = { x: 2, y: 2 } as IPoint;
        const diffPoint = getDiff(pointA, pointB);

        const actual = getQuadrantPlane(diffPoint);

        expect(actual).toEqual(2);
    });

    it('should return second quadrant plane', () => {
        const pointA = { x: 0, y: 0 } as IPoint;
        const pointB = { x: -2, y: 2 } as IPoint;
        const diffPoint = getDiff(pointA, pointB);

        const actual = getQuadrantPlane(diffPoint);

        expect(actual).toEqual(1);
    });

    it('should return third quadrant plane', () => {
        const pointA = { x: 0, y: 0 } as IPoint;
        const pointB = { x: -2, y: -2 } as IPoint;
        const diffPoint = getDiff(pointA, pointB);

        const actual = getQuadrantPlane(diffPoint);

        expect(actual).toEqual(3);
    });

    it('should return fourth quadrant plane', () => {
        const pointA = { x: 0, y: 0 } as IPoint;
        const pointB = { x: 2, y: -2 } as IPoint;
        const diffPoint = getDiff(pointA, pointB);

        const actual = getQuadrantPlane(diffPoint);

        expect(actual).toEqual(4);
    });
});
