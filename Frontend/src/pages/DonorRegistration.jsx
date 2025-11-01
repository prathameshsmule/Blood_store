import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import logo from "../assets/images/blood donor.png";
import "../styles/DonorRegistration.css";

// Use Vite env var (fallback to production domain if not set)
const API_BASE = import.meta.env.VITE_APP_API_URL || "https://bloodbank.store/api";

// EmailJS config from env (don't hardcode keys)
const EMAILJS_USER = import.meta.env.VITE_EMAILJS_USER || "";
const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE || "";
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE || "";

const DonorRegistration = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const campIdFromUrl = query.get("campId");

  const [camps, setCamps] = useState([]);
  const [loadingCamps, setLoadingCamps] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    weight: "",
    bloodGroup: "",
    email: "",
    phone: "",
    address: "",
    camp: "",
  });
  const [calculatedAge, setCalculatedAge] = useState(null);
  const [campLocked, setCampLocked] = useState(false);
  const [campNotice, setCampNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ---- helpers ----
  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };
  const isUpcoming = (isoDateString) => {
    if (!isoDateString) return false;
    const today = startOfDay(new Date());
    const campDay = startOfDay(new Date(isoDateString));
    return campDay.getTime() >= today.getTime();
  };

  // Initialize EmailJS from env (if key available)
  useEffect(() => {
    if (EMAILJS_USER) {
      try {
        emailjs.init(EMAILJS_USER);
      } catch (err) {
        console.warn("EmailJS init failed:", err);
      }
    }
  }, []);

  // Fetch and filter camps (upcoming only)
  useEffect(() => {
    const fetchCamps = async () => {
      setLoadingCamps(true);
      setCampNotice("");
      try {
        const res = await axios.get(`${API_BASE}/camps`);
        const upcoming = (res.data || [])
          .filter((c) => isUpcoming(c?.date))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setCamps(upcoming);

        // If campId present in URL, lock only if it's in upcoming list
        if (campIdFromUrl) {
          const selected = upcoming.find((c) => c._id === campIdFromUrl);
          if (selected) {
            setFormData((prev) => ({ ...prev, camp: selected._id }));
            setCampLocked(true);
            setCampNotice("");
          } else {
            // camp present but not upcoming / not found
            setCampNotice(
              "The camp link you followed is no longer available or already completed. Please pick another upcoming camp."
            );
            setCampLocked(false);
            // optionally set camp to campIdFromUrl so backend can check — commented out to avoid invalid submissions
            // setFormData(prev => ({ ...prev, camp: campIdFromUrl }));
          }
        }
      } catch (err) {
        console.error("Error fetching camps:", err);
        setCamps([]);
        setCampNotice("Unable to load camps right now. Please try later.");
      } finally {
        setLoadingCamps(false);
      }
    };
    fetchCamps();
  }, [campIdFromUrl]);

  const calculateAge = (dobValue) => {
    if (!dobValue) return null;
    const birthDate = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "dob") {
      setCalculatedAge(calculateAge(value));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("कृपया नाव भरा.");
      return false;
    }
    const age = calculateAge(formData.dob);
    if (!age || age < 18) {
      alert("Minimum age 18 required.");
      return false;
    }
    const weight = parseInt(formData.weight, 10);
    if (Number.isNaN(weight) || weight < 50) {
      alert("Minimum weight 50kg required.");
      return false;
    }
    if (!formData.bloodGroup) {
      alert("कृपया रक्तगट निवडा.");
      return false;
    }
    if (!formData.phone || formData.phone.trim().length < 6) {
      alert("कृपया वैध फोन नंबर द्या.");
      return false;
    }
    if (!formData.camp) {
      alert("कृपया कॅम्प निवडा.");
      return false;
    }
    return true;
  };

  const sendEmail = async (donorData, ageToSend) => {
    // Only try sending if EmailJS configured
    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE) {
      console.info("EmailJS not fully configured — skipping email send.");
      return;
    }
    try {
      const campName = camps.find((c) => c._id === donorData.camp)?.name || "Selected Camp";
      const templateParams = {
        to_email: donorData.email,
        donor_name: donorData.name,
        donor_age: ageToSend,
        donor_weight: donorData.weight,
        donor_blood_group: donorData.bloodGroup,
        donor_phone: donorData.phone,
        donor_address: donorData.address,
        donor_camp: campName,
        registration_date: new Date().toLocaleDateString(),
      };
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      // don't block registration if email fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // final age calc (avoid trusting client-side modified calculatedAge)
    const finalAge = calculateAge(formData.dob);
    if (!finalAge || finalAge < 18) {
      alert("Minimum age 18 required.");
      return;
    }

    // ensure selected camp still exists in upcoming list
    const stillUpcoming = camps.some((c) => c._id === formData.camp);
    if (!stillUpcoming) {
      alert("Selected camp is no longer available.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        age: finalAge,
        weight: Number(formData.weight),
        dob: new Date(formData.dob).toISOString(),
      };

      await axios.post(`${API_BASE}/donors`, payload);

      // fire-and-forget email (doesn't block UX)
      sendEmail(formData, finalAge);

      alert("🎉 Registration successful! Check your email for confirmation (if provided).");

      // Reset form but keep locked camp if user visited via camp link
      setFormData((prev) => ({
        name: "",
        dob: "",
        weight: "",
        bloodGroup: "",
        email: "",
        phone: "",
        address: "",
        camp: campLocked ? prev.camp : "",
      }));
      setCalculatedAge(null);
    } catch (err) {
      console.error("Error submitting donor:", err);
      const msg = err?.response?.data?.message || "Error submitting form. कृपया नंतर पुन्हा प्रयत्न करा.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="donor-registration-container">
      <div className="background-animation" />
      <div className="registration-card">
        <div className="card-header">
          <div className="logo-container">
            <img src={logo} alt="Donor Logo" className="logo" />
          </div>
          <h2 className="title">Donor Registration</h2>
          <p className="subtitle">Join our life-saving community</p>

          {campNotice && (
            <div className="notice warning" style={{ marginTop: 8 }}>
              {campNotice} Please choose an upcoming camp below.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <input className="form-input" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

          <label>Date of Birth</label>
          <input className="form-input" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          {calculatedAge !== null && <p className="age-preview">Age: {calculatedAge} years</p>}

          <input className="form-input" name="weight" type="number" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required min="0" />

          <select className="form-select" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Don't Know"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <input className="form-input" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />

          <input className="form-input" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

          <textarea className="form-textarea" name="address" placeholder="Address" value={formData.address} onChange={handleChange} rows="3" required />

          <label>Choose an upcoming camp</label>
          <select className="form-select" name="camp" value={formData.camp} onChange={handleChange} required disabled={campLocked || loadingCamps}>
            {loadingCamps ? (
              <option value="" disabled>
                Loading camps...
              </option>
            ) : camps.length === 0 ? (
              <option value="" disabled>
                No upcoming camps available
              </option>
            ) : (
              <>
                {!campLocked && <option value="">Select Camp</option>}
                {camps.map((c) => (
                  <option key={c._1d || c._id} value={c._id}>
                    {c.name} — {c.date ? new Date(c.date).toLocaleDateString() : "TBA"}
                  </option>
                ))}
              </>
            )}
          </select>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Registering..." : "Register as Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorRegistration;
