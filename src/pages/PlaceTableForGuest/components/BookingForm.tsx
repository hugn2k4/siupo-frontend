import React, { useState, useEffect } from "react";
import { bookingApi } from "../../../api/bookingApi";
import type { CartItem } from "../../../types/responses/product.response";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NoteIcon from "@mui/icons-material/Note";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface BookingFormProps {
  preOrderItems?: CartItem[];
}

const FORM_STORAGE_KEY = "bookingFormData";

const BookingForm: React.FC<BookingFormProps> = ({ preOrderItems = [] }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to get saved form data from localStorage
  const getSavedFormData = () => {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
    return {
      fullname: "",
      phoneNumber: "",
      email: "",
      memberInt: "2",
      startedAt: "",
      note: "",
      agreePolicy: false,
    };
  };

  const [formData, setFormData] = useState(getSavedFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData]);

  // Check login status
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(!!(token && user));
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, [token, user]);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDateTime = (datetime: string) => {
    const selectedTime = new Date(datetime);
    const now = new Date();

    if (selectedTime <= now) {
      return "Booking time must be in the future";
    }

    const hour = selectedTime.getHours();

    if (hour < 8 || hour >= 22) {
      return "Booking time must be within operating hours (8:00 AM - 10:00 PM)";
    }

    const minimumTime = new Date(now.getTime() + 60 * 60 * 1000);
    if (selectedTime < minimumTime) {
      return "Please book at least 1 hour in advance";
    }

    return null;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = "Full name must be at least 2 characters";
    } else if (formData.fullname.trim().length > 100) {
      newErrors.fullname = "Full name cannot exceed 100 characters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format (e.g., 0901234567)";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const memberCount = parseInt(formData.memberInt);
    if (!memberCount || memberCount < 1) {
      newErrors.memberInt = "Number of guests must be greater than 0";
    } else if (memberCount > 50) {
      newErrors.memberInt = "Number of guests cannot exceed 50 people";
    }

    if (!formData.startedAt) {
      newErrors.startedAt = "Please select booking time";
    } else {
      const dateTimeError = validateDateTime(formData.startedAt);
      if (dateTimeError) {
        newErrors.startedAt = dateTimeError;
      }
    }

    if (formData.note.length > 500) {
      newErrors.note = "Note cannot exceed 500 characters";
    }

    if (!formData.agreePolicy) {
      newErrors.agreePolicy = "Please agree to the booking policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr.submit;
      return newErr;
    });

    try {
      const requestData = {
        fullname: formData.fullname.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim() || null,
        memberInt: parseInt(formData.memberInt),
        startedAt: new Date(formData.startedAt).toISOString(),
        note: formData.note.trim() || null,
        preOrderItems:
          preOrderItems.length > 0
            ? preOrderItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                note: item.note || null,
                price: item.price,
              }))
            : null,
      };

      let result;

      if (isLoggedIn) {
        result = await bookingApi.placeTableForCustomer(requestData);
      } else {
        result = await bookingApi.placeTableForGuest(requestData);
      }

      if (result?.success) {
        setSubmitSuccess(true);
        // Clear saved form data after successful submission
        localStorage.removeItem(FORM_STORAGE_KEY);
        setFormData({
          fullname: "",
          phoneNumber: "",
          email: "",
          memberInt: "2",
          startedAt: "",
          note: "",
          agreePolicy: false,
        });
        setErrors({});
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setErrors({
          submit: result?.message || "Unable to submit request, please try again later",
        });
      }
    } catch (error: unknown) {
      console.error("Error submitting booking:", error);

      let errorMessage = "Unable to submit request, please try again later";

      if (error && typeof error === "object") {
        if ("response" in error && error.response && typeof error.response === "object") {
          const response = error.response as { data?: { message?: string } };
          if (response.data?.message) {
            errorMessage = response.data.message;
          }
        } else if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message;
        }
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  {isLoggedIn ? "Booking confirmed successfully!" : "Booking request submitted successfully!"}
                </h3>
                <p className="text-green-700">
                  {isLoggedIn
                    ? "Your booking has been confirmed. You can view it in My Bookings."
                    : "The restaurant manager will contact you to confirm booking details as soon as possible."}
                  {preOrderItems.length > 0 && (
                    <span className="block mt-1 font-semibold">
                      Your selected dishes will be prepared when you arrive.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Booking Information</h2>
        <p className="text-center text-gray-600 mb-8">
          Please fill in complete information to make a reservation
          {isLoggedIn && <span className="block text-amber-600 font-semibold mt-1">✓ Logged in - Direct booking</span>}
        </p>

        <div className="space-y-4">
          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
              <PersonIcon className="mr-3 text-gray-500" />
              <input
                type="text"
                value={formData.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
                className="w-full outline-none text-gray-700"
              />
            </div>
            {errors.fullname && <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <PhoneIcon className="mr-3 text-gray-500" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <EmailIcon className="mr-3 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          {/* Member Count & DateTime */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <GroupIcon className="mr-3 text-gray-500" />
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="2"
                  value={formData.memberInt}
                  onChange={(e) => handleChange("memberInt", e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.memberInt && <p className="mt-1 text-sm text-red-600">{errors.memberInt}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Booking Time <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <AccessTimeIcon className="mr-3 text-gray-500" />
                <input
                  type="datetime-local"
                  min={getMinDateTime()}
                  value={formData.startedAt}
                  onChange={(e) => handleChange("startedAt", e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.startedAt && <p className="mt-1 text-sm text-red-600">{errors.startedAt}</p>}
              <p className="mt-1 text-xs text-gray-500">Operating hours: 8:00 AM - 10:00 PM</p>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Note</label>
            <div className="flex items-start border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
              <NoteIcon className="mr-3 text-gray-500 mt-1" />
              <textarea
                placeholder="Special requests (if any)..."
                value={formData.note}
                onChange={(e) => handleChange("note", e.target.value)}
                rows={4}
                maxLength={500}
                className="w-full outline-none text-gray-700 resize-none"
              />
            </div>
            <div className="flex justify-between mt-1">
              <div>{errors.note && <p className="text-sm text-red-600">{errors.note}</p>}</div>
              <p className="text-xs text-gray-500">{formData.note.length}/500</p>
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="policy"
                checked={formData.agreePolicy}
                onChange={(e) => handleChange("agreePolicy", e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded mt-1"
              />
              <label htmlFor="policy" className="ml-2 text-gray-700">
                I agree to the booking policy <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.agreePolicy && <p className="mt-1 ml-6 text-sm text-red-600">{errors.agreePolicy}</p>}
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full font-semibold py-3 transition ${
              isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            {isSubmitting ? "Submitting request..." : "Confirm Booking"}
          </button>

          {/* Help Text */}
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 text-center">
              <strong>Note:</strong>
              {isLoggedIn
                ? " Your booking will be confirmed immediately. You can manage it in My Bookings section."
                : " After submitting your request, the restaurant manager will contact you to confirm booking details as soon as possible."}
              {preOrderItems.length > 0 && (
                <span className="block mt-2 font-semibold">
                  Your selected dishes ({preOrderItems.reduce((sum, item) => sum + item.quantity, 0)} items) will be
                  prepared when you arrive at the restaurant.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
