import { ChangeEventHandler } from 'react'
import styles from './toggle-switch.module.css'

export function ToggleSwitch(props: ToggleSwitchProps) {

    const { checked, title, onChange } = props

    return (
        <div className={styles.root} >
            <label className={styles.switch}>
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span className={styles.slider}></span>
            </label>
            <h3>{title}</h3>
        </div>
    )

}

export type ToggleSwitchProps = {
    checked: boolean,
    title?: string,
    onChange?: ChangeEventHandler<HTMLElement>
}