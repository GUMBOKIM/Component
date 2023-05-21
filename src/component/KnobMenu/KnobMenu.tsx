import * as S from "./KnobMenu.style";
import {useEffect, useRef} from "react";
import {calculateDegree, Location} from "./KnobMenu.util";

const KnobMenu = () => {
    const circleRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const circle = circleRef.current;
        if (circle) {
            const {x: refX, y: refY,  width} = circle.getBoundingClientRect();
            const r = width / 2;
            const circleCenter: Location = {x: refX + r, y: refY + r};

            const distanceCenterFromItem = r / 2;

            const childCount = circle.childElementCount;
            const childSize = {width: circle.children[0].clientWidth, height: circle.children[0].clientHeight}
            // ITEM 정렬
            for (let i = 0; i < childCount; i++) {
                const item = circle.children[i] as HTMLLIElement;
                const x = r - Math.cos(i / childCount * Math.PI * 2) * distanceCenterFromItem;
                const y = r + Math.sin(i / childCount * Math.PI * 2) * distanceCenterFromItem;
                item.style.top = (x - childSize.width / 2) + "px";
                item.style.left = (y - childSize.height / 2) + "px";
                item.style.transform = `rotate(${i / childCount * 360}deg)`
            }

            // 회전 이벤트
            let circleRotatedDegree = 0;
            let startRad = 0;

            const mouseMoveEvent = (e: MouseEvent) => {
                const nowDegree = calculateDegree(circleCenter, {x: e.clientX, y: e.clientY});
                const moveDegree = nowDegree - startRad;
                circle.style.transform = `rotate(${circleRotatedDegree + moveDegree}deg)`

                e.stopPropagation();
            }
            circle.addEventListener('mousedown', (e) => {
                startRad = calculateDegree(circleCenter, {x: e.clientX, y: e.clientY});

                circle.addEventListener('mousemove', mouseMoveEvent)
            });

            circle.addEventListener('mouseup', (e) => {
                const nowDegree = calculateDegree(circleCenter, {x: e.clientX, y: e.clientY});
                const moveRad = nowDegree - startRad;
                circleRotatedDegree = circleRotatedDegree + moveRad;
                circle.removeEventListener('mousemove', mouseMoveEvent)
            })

        }
    }, []);

    return (
        <S.Container>
            <S.Circle ref={circleRef}>
                <>
                    {[1, 2, 3, 4, 5, 6].map(item =>
                        <S.Item key={item}>
                            <button onClick={() => alert(`item${item} click!!`)}>
                                Item{item}
                            </button>
                        </S.Item>
                    )}
                </>
            </S.Circle>
            <S.VerticalLine/>
            <S.HorizonLine/>
            <S.ItemLine/>
        </S.Container>
    )
}

export default KnobMenu;