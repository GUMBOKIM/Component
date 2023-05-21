import * as S from "./KnobMenu.style";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {calculateDegree, Location} from "./KnobMenu.util";

const KnobMenu = () => {
    const [isActive, setIsActive] = useState(true);

    const circleRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (isActive) {
            const circle = circleRef.current;
            if (circle) {
                const {x: refX, y: refY, width} = circle.getBoundingClientRect();
                const r = width / 2;
                const circleCenter: Location = {x: refX + r, y: refY + r};

                const distanceCenterFromItem = 2 * r / 3;

                const childCount = circle.childElementCount;
                const childSize = {width: circle.children[0].clientWidth, height: circle.children[0].clientHeight}
                // ITEM 정렬
                for (let i = 0; i < childCount; i++) {
                    const item = circle.children[i] as HTMLLIElement;
                    const x = r - Math.cos(-Math.PI / 2 - i / childCount * Math.PI * 2) * distanceCenterFromItem;
                    const y = r + Math.sin(-Math.PI / 2 - i / childCount * Math.PI * 2) * distanceCenterFromItem;
                    item.style.transform = `translate(${x - childSize.width / 2}px, ${y - childSize.height / 2}px) rotate(${i / childCount * 360}deg)`
                }

                // 회전 이벤트
                let circleRotatedDegree = 0;
                let startRad = 0;

                const mouseMoveEvent = (e: MouseEvent) => {
                    const nowDegree = calculateDegree(circleCenter, {x: e.clientX, y: e.clientY});
                    const moveDegree = nowDegree - startRad;
                    circle.style.rotate = `${circleRotatedDegree + moveDegree}deg`

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

                circle.addEventListener('mouseleave', (e) => {
                    const nowDegree = calculateDegree(circleCenter, {x: e.clientX, y: e.clientY});
                    const moveRad = nowDegree - startRad;
                    circleRotatedDegree = circleRotatedDegree + moveRad;
                    circle.removeEventListener('mousemove', mouseMoveEvent)
                })

            }
        }
    }, [isActive]);

    return (
        <S.Container>
            <S.Circle isActive={isActive} ref={circleRef}>
                <>
                    {[1, 2, 3, 4, 5, 6].map(item =>
                        <S.Item key={item}>
                            <S.Button onClick={() => alert(`item${item} click!!`)}>
                                Item{item}
                            </S.Button>
                        </S.Item>
                    )}
                </>
            </S.Circle>
            <S.InnerCircle onClick={() => setIsActive(prev => !prev)}>
                {isActive ? 'CLOSE' : 'OPEN'}
            </S.InnerCircle>
        </S.Container>
    )
}

export default KnobMenu;