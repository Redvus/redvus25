import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function TestAnim({
    delayed = 0
}) {
    const containerRef = useRef(null);
    const [animation, setAnimation] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useGSAP(() => {
        const delay = Number(delayed);
        const tl = gsap.timeline({
            paused: false, // Начинаем в paused режиме
            delay: delay,
            onComplete: () => setIsPlaying(false),
            onReverseComplete: () => setIsPlaying(false)
        });

        // Сложная последовательность
        tl.from("#header", {
            duration: 1,
            y: -100,
            opacity: 0,
            ease: "back.out(1.7)"
        })
        .from("#content", {
            duration: 0.8,
            x: -200,
            opacity: 0,
            stagger: 0.2 // Анимация для каждого child элемента
        }, "-=0.5") // Начинаем раньше окончания предыдущей
        .from("#sidebar", {
            duration: 0.8,
            x: 200,
            opacity: 0
        }, "-=0.8") // Сильное перекрытие
        .from("#footer", {
            duration: 0.6,
            y: 100,
            opacity: 0,
            ease: "bounce.out"
        });

        setAnimation(tl);

    }, { scope: containerRef });

    const playAnimation = () => {
        animation.play();
        setIsPlaying(true);
    };

    const pauseAnimation = () => {
        animation.pause();
        setIsPlaying(false);
    };

    const restartAnimation = () => {
        animation.restart();
        setIsPlaying(true);
    };

    const reverseAnimation = () => {
        animation.reverse();
        setIsPlaying(true);
    };

    return (
        <div>
            <div ref={containerRef}>
                <header id="header" className="section">
                    <h1>Шапка сайта</h1>
                </header>

                <main className="main-content">
                    <div id="content" className="content">
                        <div className="item">Контент 1</div>
                        <div className="item">Контент 2</div>
                        <div className="item">Контент 3</div>
                    </div>

                    <aside id="sidebar" className="sidebar">
                        Боковая панель
                    </aside>
                </main>

                <footer id="footer" className="section">
                    Футер
                </footer>
            </div>

            <div className="controls">
                <button onClick={playAnimation} disabled={isPlaying}>
                    Воспроизвести
                </button>
                <button onClick={pauseAnimation} disabled={!isPlaying}>
                    Пауза
                </button>
                <button onClick={restartAnimation}>
                    Перезапустить
                </button>
                <button onClick={reverseAnimation}>
                    Обратно
                </button>
            </div>
        </div>
    );
}