import * as S from "./KnobMenu.style";
import {useEffect, useRef} from "react";

const KnobMenu = () => {
    const circleRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const circle = circleRef.current;
        if (circle) {
            const childCount = circle.childElementCount;
            const r = circle.clientWidth / 2;
            const distanceCenterFromItem = r / 2;
            const childSize = {width: circle.children[0].clientWidth, height: circle.children[0].clientHeight}

            // ITEM 정렬
            for (let i = 0; i < childCount; i++) {
                const item = circle.children[i] as HTMLLIElement;
                const x = r - Math.cos(i / childCount * Math.PI * 2) * distanceCenterFromItem;
                const y = r + Math.sin(i / childCount * Math.PI * 2) * distanceCenterFromItem;
                item.style.top = (x - childSize.width / 2) + "px";
                item.style.left = (y - childSize.height / 2) + "px";
                item.style.transform = `rotate(${i / childCount * Math.PI * 2}rad)`
            }

            // 회전 이벤트
            const circleRotateRad = 0;
            const dragStartLocation = {x: 0, y: 0};

            const mouseMoveEvent = (e: MouseEvent) => {
                e.stopPropagation();
                console.log(e, e.x, e.y);
            }
            circle.addEventListener('mousedown', (e) => {
                const {x, y} = e;
                dragStartLocation.x = x;
                dragStartLocation.y = y;
                circle.addEventListener('mousemove', mouseMoveEvent)
            });

            circle.addEventListener('mouseup', (e) => {
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