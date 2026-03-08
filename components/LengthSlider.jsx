import React from "react";
import { styles } from "../styles";

export default function LengthSlider({ length, setLength, minLength = 6 }) {
    return (
        <div style={styles.section}>
            <div style={styles.sectionHeader}>
                <span style={styles.sectionTitle}>Length</span>
                <span style={styles.sectionValue}>{length} chars</span>
            </div>
            <input
                type="range"
                min={minLength}
                max={48}
                value={length}
                onChange={(e) => setLength(+e.target.value)}
                style={styles.slider}
                className="slider"
            />
        </div>
    );
}
