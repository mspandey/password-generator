import React from "react";
import { styles } from "../styles";

const strengthLabel = (score) => {
    if (score <= 1) return { label: "Fragile", color: "#e8789a", width: "20%" };
    if (score === 2) return { label: "Weak", color: "#f0a0b8", width: "40%" };
    if (score === 3) return { label: "Moderate", color: "#f06090", width: "60%" };
    if (score === 4) return { label: "Strong", color: "#e83070", width: "80%" };
    return { label: "Fortress", color: "#ff1a6e", width: "100%" };
};

export default function StrengthMeter({ options, length }) {
    let score = Object.values(options).filter(Boolean).length;

    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;

    score = Math.min(score, 5);
    const strength = strengthLabel(score);

    return (
        <div style={styles.strengthRow}>
            <span style={styles.strengthLabelLeft}>Strength</span>
            <div style={styles.strengthBar}>
                <div
                    style={{
                        ...styles.strengthFill,
                        width: strength.width,
                        background: `linear-gradient(90deg, #ffb3cc, ${strength.color})`,
                        boxShadow: `0 0 12px ${strength.color}99`,
                    }}
                />
            </div>
            <span style={{ ...styles.strengthLabelRight, color: strength.color }}>
                {strength.label}
            </span>
        </div>
    );
}
