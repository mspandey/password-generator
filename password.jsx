import { useState, useCallback } from "react";
import { styles, css } from "./styles";
import { CHAR_SETS, generateSecureRandomPassword, generateSecureRandomString } from "./utils";

import PasswordDisplay from "./components/PasswordDisplay";
import StrengthMeter from "./components/StrengthMeter";
import OptionsGrid from "./components/OptionsGrid";
import LengthSlider from "./components/LengthSlider";
import KeywordInput from "./components/KeywordInput";

export default function PasswordGenerator() {
    const [keyword, setKeyword] = useState("");
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false,
    });
    const [password, setPassword] = useState("Click Generate to Begin");
    const [copied, setCopied] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const generate = useCallback(() => {
        const charset = Object.entries(options)
            .filter(([, v]) => v)
            .map(([k]) => CHAR_SETS[k])
            .join("");
        if (!charset && !keyword) return;

        setGenerating(true);
        setRevealed(false);
        setCopied(false);

        let frame = 0;
        const total = 14;

        // Ensure final length is at least the length of keyword
        const finalLength = Math.max(length, keyword.length);
        if (length < finalLength) {
            setLength(finalLength);
        }

        // Animate scrambled characters, then show the secure password
        const interval = setInterval(() => {
            frame++;

            if (frame >= total) {
                clearInterval(interval);
                // Set final secure password
                setPassword(generateSecureRandomPassword(finalLength, charset, keyword, options));
                setGenerating(false);
                setRevealed(true);
            } else {
                // Show scrambled characters during animation
                // We use keyword as part of the charset if general charset is empty, just for animation
                const animationCharset = charset || keyword || "abcdefghijklmnopqrstuvwxyz";
                setPassword(generateSecureRandomString(finalLength, animationCharset));
            }
        }, 40);
    }, [length, options, keyword]);

    const copy = () => {
        if (password === "Click Generate to Begin") return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleOption = (key) => {
        const next = { ...options, [key]: !options[key] };
        if (Object.values(next).every((v) => !v)) return;
        setOptions(next);
    };

    return (
        <div style={styles.page}>
            <style>{css}</style>

            {/* Floating blobs */}
            <div style={styles.blob1} />
            <div style={styles.blob2} />
            <div style={styles.blob3} />

            <div style={styles.card}>
                {/* Shimmer line top */}
                <div style={styles.shimmerLine} />

                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.lockRing}>
                        <span style={styles.lockEmoji}>🛡️</span>
                    </div>
                    <h1 style={styles.title}>CipherForge</h1>
                    <p style={styles.subtitle}>Forging unbreakable keys for your digital life.</p>
                </div>

                {/* Password Display */}
                <PasswordDisplay
                    password={password}
                    copied={copied}
                    generating={generating}
                    length={length}
                    copy={copy}
                />

                {/* Strength Meter */}
                <StrengthMeter options={options} length={length} />

                {/* Keyword Input */}
                <KeywordInput keyword={keyword} setKeyword={setKeyword} />

                {/* Length Slider */}
                <LengthSlider length={length} setLength={setLength} minLength={Math.max(6, keyword.length)} />

                {/* Character Types Options */}
                <OptionsGrid options={options} toggleOption={toggleOption} />

                {/* Generate Button */}
                <button onClick={generate} style={styles.generateBtn} className="gen-btn">
                    <span style={{ position: "relative", zIndex: 1 }}>
                        {generating ? "Weaving your password..." : "✦ Generate Password ✦"}
                    </span>
                </button>

                <p style={styles.footer}>🔒 Generated locally — private, safe, and yours alone.</p>
            </div>
        </div>
    );
}