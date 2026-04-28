"use client";
import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "@/services/userService";
import "@/styles/dashboard.css";

const RULES = [
  { id: "len",     label: "At least 8 characters",    test: (v)      => v.length >= 8 },
  { id: "upper",   label: "One uppercase letter",      test: (v)      => /[A-Z]/.test(v) },
  { id: "lower",   label: "One lowercase letter",      test: (v)      => /[a-z]/.test(v) },
  { id: "num",     label: "One number",                test: (v)      => /[0-9]/.test(v) },
  { id: "special", label: "One special character",     test: (v)      => /[^A-Za-z0-9]/.test(v) },
  { id: "diff",    label: "Different from current",    test: (v, old) => v.length > 0 && v !== old },
];

function getStrength(score) {
  if (score <= 2) return { label: "Weak",   color: "#E24B4A", width: `${Math.round((score/6)*100)}%` };
  if (score <= 4) return { label: "Fair",   color: "#BA7517", width: `${Math.round((score/6)*100)}%` };
  if (score === 5) return { label: "Good",  color: "#3B6D11", width: "83%" };
  return              { label: "Strong",    color: "#166534", width: "100%" };
}

export default function SettingsPage() {
  const [user, setUser]               = useState(null);
  const [name, setName]               = useState("");
  const [oldPw, setOldPw]             = useState("");
  const [newPw, setNewPw]             = useState("");
  const [confirmPw, setConfirmPw]     = useState("");
  const [loading, setLoading]         = useState(false);
  const [banner, setBanner]           = useState(null); // { type, msg }
  const [nameErr, setNameErr]         = useState("");
  const [oldPwErr, setOldPwErr]       = useState("");

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data); setName(data.name);
    } catch {
      notify("error", "Failed to load profile.");
    }
  };

  const notify = (type, msg) => {
    setBanner({ type, msg });
    setTimeout(() => setBanner(null), 3500);
  };

  const ruleResults = RULES.map(r => ({ ...r, pass: r.test(newPw, oldPw) }));
  const score = ruleResults.filter(r => r.pass).length;
  const strength = newPw ? getStrength(score) : null;
  const pwValid = score === RULES.length;
  const confirmMatch = confirmPw && confirmPw === newPw;

  const handleUpdate = async () => {
    if (!name.trim()) { setNameErr("Name cannot be empty."); return; }
    setNameErr(""); setLoading(true);
    try {
      await updateProfile({ name: name.trim() });
      notify("success", "Profile updated successfully.");
    } catch (err) {
      notify("error", err.response?.data?.message || "Update failed.");
    } finally { setLoading(false); }
  };

  const handlePasswordChange = async () => {
    if (!oldPw) { setOldPwErr("Current password is required."); return; }
    if (!pwValid) { notify("error", "Password does not meet all requirements."); return; }
    if (!confirmMatch) { notify("error", "Passwords do not match."); return; }
    setOldPwErr(""); setLoading(true);
    try {
      await changePassword({ oldPassword: oldPw, newPassword: newPw });
      notify("success", "Password updated successfully.");
      setOldPw(""); setNewPw(""); setConfirmPw("");
    } catch (err) {
      notify("error", err.response?.data?.message || "Password change failed.");
    } finally { setLoading(false); }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="tool-page">
      <h1>Settings</h1>
      <p className="subtitle">Manage your account details and security</p>

      {banner && <div className={`banner ${banner.type}`}>{banner.msg}</div>}

      <div className="review-card">
        <div className="card-header">
          <div className="avatar">{name.slice(0,2).toUpperCase()}</div>
          <div>
            <p>{name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <p className="section-title">Profile</p>
        <div className="field">
          <label>Display name</label>
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setNameErr(""); }}
            disabled={loading}
          />
          {nameErr && <p className="field-msg err">{nameErr}</p>}
        </div>
        <div className="actions">
          <button className="btn primary" onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="card">
        <p className="section-title">Change password</p>

        <div className="field">
          <label>Current password</label>
          <input
            type="password"
            value={oldPw}
            placeholder="Enter current password"
            onChange={e => { setOldPw(e.target.value); setOldPwErr(""); }}
            disabled={loading}
          />
          {oldPwErr && <p className="field-msg err">{oldPwErr}</p>}
        </div>

        <div className="field">
          <label>New password</label>
          <input
            type="password"
            value={newPw}
            placeholder="Enter new password"
            onChange={e => setNewPw(e.target.value)}
            disabled={loading}
          />
          {strength && (
            <>
              <div className="strength-bar">
                <div style={{ width: strength.width, background: strength.color }} />
              </div>
              <p className="strength-label">{strength.label}</p>
            </>
          )}
          <div className="pw-rules">
            {ruleResults.map(r => (
              <div key={r.id} className={`rule ${newPw ? (r.pass ? "pass" : "fail") : ""}`}>
                <div className="rule-dot" />
                {r.label}
              </div>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Confirm new password</label>
          <input
            type="password"
            value={confirmPw}
            placeholder="Repeat new password"
            onChange={e => setConfirmPw(e.target.value)}
            className={confirmPw ? (confirmMatch ? "ok-input" : "err-input") : ""}
            disabled={loading}
          />
          {confirmPw && (
            <p className={`field-msg ${confirmMatch ? "ok" : "err"}`}>
              {confirmMatch ? "Passwords match." : "Passwords do not match."}
            </p>
          )}
        </div>

        <div className="actions">
          <button className="btn" onClick={() => { setOldPw(""); setNewPw(""); setConfirmPw(""); }}>
            Cancel
          </button>
          <button className="btn primary" onClick={handlePasswordChange} disabled={loading}>
            {loading ? "Saving..." : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
}