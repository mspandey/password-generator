import React from "react";
import { styles } from "../styles";

export default function PasswordDisplay({ password, copied, generating, length, copy }) {
    const isDefault = password === "Click Generate to Begin";

    return (
        <div style={styles.passwordBox} onClick={copy} className="pw-box">
            <div style={styles.pwInner}>
                <span
                    style={{
                        ...styles.passwordText,
                        letterSpacing: isDefault ? "0.05em" : "0.18em",
                        opacity: isDefault ? 0.3 : 1,
                        filter: generating ? "blur(5px)" : "none",
                        fontFamily: isDefault ? "'Georgia', serif" : "monospace",
                        fontSize: isDefault ? "0.85rem" : length > 22 ? "0.78rem" : "0.98rem",
                        transition: "all 0.3s ease",
                    }}
                >
                    {password}
                </span>
            </div>
            <div style={styles.copyHint} className="copy-hint">
                {copied ? "✓ Copied to clipboard!" : "✦ Click to copy ✦"}
            </div>
        </div>
    );
}
