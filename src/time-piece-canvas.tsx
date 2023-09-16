import { useEffect, useRef, ReactNode } from "react";
import styles from './time-piece-canvas.module.css'


export function TimePieceCanvas(props: TimePieceCanvasProps) {
    const { mode, ss, mm, hh, tick, size, children } = props

    const canvasRef = useRef(null);
    const drawBorderRing = (ctx: CanvasRenderingContext2D, hex: string, timePieceSize: number, centerX: number, centerY: number) => {
        //boder ring
        ctx.strokeStyle = hex;
        ctx.lineWidth = timePieceSize * .07;
        ctx.beginPath();
        ctx.arc(centerX, centerY, timePieceSize * .7, 0, Math.PI * 2);
        ctx.stroke();
    }

    const drawCenterPin = (ctx: CanvasRenderingContext2D, hex: string, centerX: number, centerY: number) => {
        ctx.fillStyle = hex
        ctx.beginPath();
        ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
        ctx.fill();
    }

    const drawTicMarks = (ctx: CanvasRenderingContext2D, hex: string, centerX: number, centerY: number, timePieceSize: number) => {
        ctx.strokeStyle = hex
        ctx.lineWidth = 3;
        ctx.translate(centerX, centerY);
        for (let i = 1; i <= 12; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(timePieceSize * .525, 0);
            ctx.lineTo(timePieceSize * .475, 0);
            ctx.stroke();
        }
        ctx.translate(-centerX, -centerY);
    }

    const drawNumbers = (ctx: CanvasRenderingContext2D, hex: string, fontSize: number, ticNum: number, degree: number, centerX: number, centerY: number) => {
        // modeled after https://www.w3schools.com/graphics/canvas_clock_numbers.asp
        ctx.translate(centerX, centerY);
        ctx.font = centerY * fontSize + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = hex;
        for (let num = 1; num <= ticNum; num++) {
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

    const drawTimePiece = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size: number) => {
        const timePieceSize = size * .38;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.save()

        // timepiece face
        ctx.fillStyle = '#EBD8AB'
        ctx.beginPath();
        ctx.arc(centerX, centerY, timePieceSize * .65, 0, Math.PI * 2)
        ctx.fill();

        // tic marks
        drawTicMarks(ctx, '#032B52', centerX, centerY, timePieceSize)

        // mode is a prop passed into component - clock or stopwatch
        if (mode == 'clock') {
            // clock
            drawBorderRing(ctx, '#032B52', timePieceSize, centerX, centerY)
            drawCenterPin(ctx, '#032B52', centerX, centerY)
            drawNumbers(ctx, '#032B52', 0.05, 12, 6, centerX, centerY)
        } else {
            //stopwatch 
            drawBorderRing(ctx, '#E65A31', timePieceSize, centerX, centerY)
            drawCenterPin(ctx, '#E65A31', centerX, centerY)
            drawNumbers(ctx, '#032B52', 0.0275, 60, 30, centerX, centerY)
        }
    }

    useEffect(() => {
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, size, size);
        drawTimePiece(canvas, ctx, size);

    }, [mode]);

    return (<>
        <h3>{mode}</h3>

        {(mode == 'stopwatch' ? (
            <>{children}</>
        ) : (
            <h3>Clock {hh} : {mm} : {ss} </h3>
        )
        )}

        <canvas ref={canvasRef} height={size} width={size} className={styles.canvas}></canvas>
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