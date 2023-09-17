import { useEffect, useRef, useState, ReactNode } from "react";
import styles from './time-piece-canvas.module.css'


export function TimePieceCanvas(props: TimePieceCanvasProps) {
    const { mode, size, ss, mm, hh, tick, children } = props

    const canvasRef = useRef(null);

    const timePieceSize = size * .38;
    const centerX = size / 2
    const centerY = size / 2

    useEffect(() => {
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const render = () => {
            drawTimePiece(ctx);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

    }, [tick, ss]);

    const drawTimePiece = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, size, size);
        let hex = '#032B52';

        // mode is a prop passed into component - clock or stopwatch
        if (mode == 'stopwatch') {
            hex = '#E65A31';
        }

        // timepiece face
        ctx.fillStyle = '#EBD8AB'
        ctx.beginPath();
        ctx.arc(centerX, centerY, timePieceSize * .65, 0, Math.PI * 2)
        ctx.fill();

        //boder ring
        ctx.strokeStyle = hex;
        ctx.lineWidth = timePieceSize * .07;
        ctx.beginPath();
        ctx.arc(centerX, centerY, timePieceSize * .7, 0, Math.PI * 2);
        ctx.stroke();

        drawTicMarks(ctx)
        drawNumbers(ctx, mode)

        let minutesElapsed = 0
        if (mode == 'clock') {
            drawArm(ctx, hh / 12, 8, (timePieceSize / 2) * 0.575, '#032B52'); // Hour
            drawArm(ctx, mm / 60, 4, (timePieceSize / 2) * 0.75, '#032B52'); // Minute
            drawArm(ctx, ss / 60, 2, (timePieceSize / 2) * 0.9, '#E65A31'); // Second
        } else {
            minutesElapsed = tick / 60;
            drawArm(ctx, minutesElapsed / 60, 4, (timePieceSize / 2) * 0.75, '#032B52'); // Minute
            drawArm(ctx, tick / 60, 2, (timePieceSize / 2) * 0.9, '#E65A31'); // Second
        }

        // center pin
        ctx.fillStyle = hex
        ctx.beginPath();
        ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
        ctx.fill();

    }

    const drawTicMarks = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = '#032B52';

        ctx.lineWidth = 2;
        ctx.translate(centerX, centerY);
        for (let i = 1; i <= 60; i++) {
            ctx.beginPath();
            // based off math from after https://www.w3schools.com/graphics/canvas_clock_numbers.asp
            ctx.rotate(Math.PI / 30);
            ctx.moveTo(timePieceSize * .525, 0);

            if (i % 5 === 0) {
                ctx.lineTo(timePieceSize * .4, 0);
            } else {
                ctx.lineTo(timePieceSize * .475, 0);
            }
            ctx.stroke();
        }
        ctx.translate(-centerX, -centerY);
    }

    const drawNumbers = (ctx: CanvasRenderingContext2D, mode: string) => {
        // defaults set for clock mode
        let spacedNums = 12;
        let degree = 6;
        let fontPercent = 0.05;

        if (mode == 'stopwatch') {
            spacedNums = 60;
            degree = 30;
            fontPercent = 0.0275;
        }

        // modeled after https://www.w3schools.com/graphics/canvas_clock_numbers.asp
        ctx.translate(centerX, centerY);
        // font scales in relationship to size prop
        ctx.font = centerY * fontPercent + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = '#032B52';


        for (let num = 1; num <= spacedNums; num++) {
            let ang = num * Math.PI / degree;
            ctx.rotate(ang);
            ctx.translate(0, -centerY * 0.45);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, centerY * 0.45);
            ctx.rotate(-ang);
        }
        ctx.translate(-centerX, -centerY);
    }

    function drawArm(ctx: CanvasRenderingContext2D, progress: number, armThickness: number, armLength: number, armColor: string) {
        // concept and code pulled from https://www.kirupa.com/html5/create_an_analog_clock_using_the_canvas.htm
        const TAU = 2 * Math.PI;
        var armRadians = (TAU * progress) - (TAU / 4);

        var targetX = centerX + Math.cos(armRadians) * armLength;
        var targetY = centerY + Math.sin(armRadians) * armLength;

        ctx.lineCap = "round";
        ctx.lineWidth = armThickness;
        ctx.strokeStyle = armColor; // RED

        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Start at the center
        ctx.lineTo(targetX, targetY); // Draw a line outwards
        ctx.stroke();
    }

    return (<>
        <div className={styles.root}>
            <canvas ref={canvasRef} height={size} width={size} className={styles.canvas}>
            </canvas>
            <div className={styles.controlsWrapper}>
                <h3 className={styles.title}>{mode}</h3>
                {mode == 'stopwatch' && (children)}
            </div>
        </div>
    </>
    )
}

export type TimePieceCanvasProps = {
    mode: string,
    ss: number,
    mm: number,
    hh: number,
    tick: number,
    size: number,
    children: ReactNode
}