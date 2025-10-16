import React, { useState } from "react";

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    memberInt: "2",
    startedAt: "",
    note: "",
    agreePolicy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation functions
  const validatePhone = (phone: string) => {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDateTime = (datetime: string) => {
    const selectedTime = new Date(datetime);
    const now = new Date();
    const hour = selectedTime.getHours();

    if (selectedTime <= now) {
      return "Thời gian đặt bàn phải là thời điểm trong tương lai";
    }

    if (hour < 8 || hour >= 22) {
      return "Thời gian đặt bàn phải trong khung giờ hoạt động (8:00 - 22:00)";
    }

    // Check if at least 1 hour in advance
    const minimumTime = new Date(now.getTime() + 60 * 60 * 1000);
    if (selectedTime < minimumTime) {
      return "Vui lòng đặt bàn trước ít nhất 1 giờ";
    }

    return null;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Fullname validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Họ tên không được để trống";
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = "Họ tên phải từ 2 ký tự trở lên";
    } else if (formData.fullname.trim().length > 100) {
      newErrors.fullname = "Họ tên không được vượt quá 100 ký tự";
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không đúng định dạng (VD: 0901234567)";
    }

    // Email validation (optional)
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    // Member count validation
    const memberCount = parseInt(formData.memberInt);
    if (!memberCount || memberCount < 1) {
      newErrors.memberInt = "Số lượng khách phải lớn hơn 0";
    } else if (memberCount > 50) {
      newErrors.memberInt = "Số lượng khách không được vượt quá 50 người";
    }

    // DateTime validation
    if (!formData.startedAt) {
      newErrors.startedAt = "Vui lòng chọn thời gian đặt bàn";
    } else {
      const dateTimeError = validateDateTime(formData.startedAt);
      if (dateTimeError) {
        newErrors.startedAt = dateTimeError;
      }
    }

    // Note validation
    if (formData.note.length > 500) {
      newErrors.note = "Ghi chú không được vượt quá 500 ký tự";
    }

    // Policy agreement
    if (!formData.agreePolicy) {
      newErrors.agreePolicy = "Vui lòng đồng ý với chính sách đặt bàn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
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
    // Clear previous submit error
    if (errors.submit) {
      const newErrors = { ...errors };
      delete newErrors.submit;
      setErrors(newErrors);
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        fullname: formData.fullname.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim() || null,
        memberInt: parseInt(formData.memberInt),
        startedAt: new Date(formData.startedAt).toISOString(),
        note: formData.note.trim() || null,
      };

      const response = await fetch("/api/place-table-for-guest/place-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        // Reset form
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

        // Show success message for 5 seconds then hide
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setErrors({
          submit: result.message || "Không thể gửi yêu cầu, vui lòng thử lại sau",
        });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setErrors({ submit: "Không thể gửi yêu cầu, vui lòng thử lại sau" });
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
              <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-green-800 mb-1">Yêu cầu đặt bàn đã được gửi thành công!</h3>
                <p className="text-green-700">
                  Quản lý nhà hàng sẽ liên hệ lại với bạn để xác nhận chi tiết đặt bàn trong thời gian sớm nhất.
                </p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Thông tin đặt bàn</h2>
        <p className="text-center text-gray-600 mb-8">Vui lòng điền đầy đủ thông tin để đặt bàn</p>

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
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
              <span className="mr-3 text-gray-500">👤</span>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
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
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <span className="mr-3 text-gray-500">📞</span>
                <input
                  type="tel"
                  placeholder="0901234567"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <span className="mr-3 text-gray-500">✉️</span>
                <input
                  type="email"
                  placeholder="example@email.com"
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
                Số lượng khách <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <span className="mr-3 text-gray-500">👥</span>
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
                Thời gian đặt bàn <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                <span className="mr-3 text-gray-500">🕐</span>
                <input
                  type="datetime-local"
                  min={getMinDateTime()}
                  value={formData.startedAt}
                  onChange={(e) => handleChange("startedAt", e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
              {errors.startedAt && <p className="mt-1 text-sm text-red-600">{errors.startedAt}</p>}
              <p className="mt-1 text-xs text-gray-500">Giờ hoạt động: 8:00 - 22:00</p>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ghi chú</label>
            <div className="flex items-start border border-gray-300 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
              <span className="mr-3 text-gray-500 mt-1">📝</span>
              <textarea
                placeholder="Yêu cầu đặc biệt (nếu có)..."
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
                Tôi đồng ý với chính sách đặt bàn <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.agreePolicy && <p className="mt-1 ml-6 text-sm text-red-600">{errors.agreePolicy}</p>}
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full font-semibold py-3 rounded-md transition ${
              isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            {isSubmitting ? "Đang gửi yêu cầu..." : "Xác nhận đặt bàn"}
          </button>

          {/* Help Text */}
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 text-center">
              <strong>Lưu ý:</strong> Sau khi gửi yêu cầu, quản lý nhà hàng sẽ liên hệ lại với bạn để xác nhận thông tin
              đặt bàn trong thời gian sớm nhất.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
