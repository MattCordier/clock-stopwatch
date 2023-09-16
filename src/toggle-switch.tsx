import { ChangeEventHandler } from 'react'
import styles from './toggle-switch.module.css'

export function ToggleSwitch(props: ToggleSwitchProps) {

    const { checked, title, onChange } = props

    return (
        <>
            <div className={styles.root} >
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.toggleWrapper}>
                    <img src='/icon-clock-48.png' className={styles.icon} />
                    <label className={styles.switch}>
                        <input type="checkbox" checked={checked} onChange={onChange} />
                        <span className={styles.slider}></span>
                    </label>
                    <img src='/icon-stopwatch-48.png' className={styles.icon} />
                </div>
            </div>
        </>
    )

}

export type ToggleSwitchProps = {
    checked: boolean,
    title?: string,
    onChange?: ChangeEventHandler<HTMLElement>
}