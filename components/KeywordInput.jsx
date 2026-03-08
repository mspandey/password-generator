import React from "react";
import { styles } from "../styles";

export default function KeywordInput({ keyword, setKeyword }) {
    return (
        <div style={styles.section}>
            <div style={styles.sectionHeader}>
                <span style={styles.sectionTitle}>Custom Keyword (Optional)</span>
                <span style={styles.sectionValue}>{keyword.length} chars</span>
            </div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. cat"
                style={styles.keywordInput}
            />
        </div>
    );
}
