"use client";

import React, { useState } from "react";
import { Edit2, Trash2, Plus, MapPin } from "lucide-react";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export default function BillingAddress() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      street: "4140 Parker Rd.",
      city: "Allentown",
      state: "New Mexico",
      zip: "31134",
      country: "United States",
      isDefault: true,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id" | "isDefault">>({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new address
  const handleAdd = () => {
    if (!formData.street || !formData.city || !formData.zip) return;

    const newAddr: Address = {
      id: Date.now().toString(),
      ...formData,
      isDefault: addresses.length === 0,
    };

    setAddresses((prev) => [...prev, newAddr]);
    resetForm();
  };

  // Update address
  const handleUpdate = () => {
    if (!editingId || !formData.street || !formData.city || !formData.zip) return;

    setAddresses((prev) => prev.map((addr) => (addr.id === editingId ? { ...addr, ...formData } : addr)));
    resetForm();
  };

  // Delete address
  const handleDelete = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  // Set default
  const setDefault = (id: string) => {
    setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: addr.id === id })));
  };

  // Start editing
  const startEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>
          Billing Addresses
        </h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: "#FF9F0D" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#eb8d00")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#FF9F0D")}
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-4 rounded-lg border transition-all"
            style={{
              borderColor: addr.isDefault ? "#FF9F0D" : "#e5e7eb",
              backgroundColor: addr.isDefault ? "#fff9f3" : "#ffffff",
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={16} style={{ color: "#6b7280" }} />
                  <p className="font-medium text-sm" style={{ color: "#1f2937" }}>
                    {addr.street}, {addr.city}
                  </p>
                </div>
                <p className="text-sm ml-6" style={{ color: "#4b5563" }}>
                  {addr.state}, {addr.zip}, {addr.country}
                </p>
                {addr.isDefault && (
                  <span
                    className="inline-block ml-6 mt-1 px-2 py-0.5 text-xs font-medium rounded-full"
                    style={{ color: "#FF9F0D", backgroundColor: "#fed7aa" }}
                  >
                    Default
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="text-xs font-medium"
                    style={{ color: "#FF9F0D" }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => startEdit(addr)}
                  className="p-1"
                  style={{ color: "#6b7280" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF9F0D")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-1"
                  style={{ color: "#6b7280" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF9F0D")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Edit Form (inline) */}
            {editingId === addr.id && (
              <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  style={{ borderColor: "#d1d5db", color: "#374151" }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="px-3 py-2 border rounded-md text-sm"
                    style={{ borderColor: "#d1d5db", color: "#374151" }}
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="px-3 py-2 border rounded-md text-sm"
                    style={{ borderColor: "#d1d5db", color: "#374151" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="px-3 py-2 border rounded-md text-sm"
                    style={{ borderColor: "#d1d5db", color: "#374151" }}
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-md text-sm"
                    style={{ borderColor: "#d1d5db", color: "#374151" }}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 text-sm font-medium text-white rounded-full"
                    style={{
                      backgroundColor: "#FF9F0D",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#db8300")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
                  >
                    Save
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Address Form */}
        {isAdding && (
          <div className="p-4 rounded-lg space-y-3" style={{ border: "2px dashed #d1d5db" }}>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full px-3 py-2 border rounded-md text-sm"
              style={{ borderColor: "#d1d5db", color: "#374151" }}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="px-3 py-2 border rounded-md text-sm"
                style={{ borderColor: "#d1d5db", color: "#374151" }}
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="px-3 py-2 border rounded-md text-sm"
                style={{ borderColor: "#d1d5db", color: "#374151" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Zip Code"
                className="px-3 py-2 border rounded-md text-sm"
                style={{ borderColor: "#d1d5db", color: "#374151" }}
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md text-sm"
                style={{ borderColor: "#d1d5db", color: "#374151" }}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm font-medium text-white rounded-full"
                style={{ backgroundColor: "#FF9F0D" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#db8300")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF9F0D")}
              >
                Add Address
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium rounded-full"
                style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {addresses.length === 0 && !isAdding && (
          <p className="text-center py-8" style={{ color: "#6b7280" }}>
            No billing addresses yet.
          </p>
        )}
      </div>
    </div>
  );
}
