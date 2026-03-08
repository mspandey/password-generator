import React from "react";
import { styles } from "../styles";

export default function OptionsGrid({ options, toggleOption }) {
    return (
        <div style={styles.section}>
            <span style={styles.sectionTitle}>Character Types</span>
            <div style={styles.optionsGrid}>
                {Object.entries(options).map(([key, val]) => (
                    <button
                        key={key}
                        onClick={() => toggleOption(key)}
                        style={{ ...styles.optionBtn, ...(val ? styles.optionBtnActive : {}) }}
                        className="option-btn"
                    >
                        <span style={{ ...styles.optionIcon, color: val ? "#ff4d8f" : "#c08098" }}>
                            {key === "uppercase" ? "ABC" : key === "lowercase" ? "abc" : key === "numbers" ? "123" : "#$!"}
                        </span>
                        <span style={styles.optionLabel}>{key}</span>
                        {val && <div style={styles.optionDot} />}
                    </button>
                ))}
            </div>
        </div>
    );
}
