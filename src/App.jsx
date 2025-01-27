import React, { useState, useEffect } from "react";
import "./App.css";


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    gender: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    mobile: "",
    company: "",
    course: [],
    hobbies: [],
    comments: "",
  });

  const [months] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [lastClickedRadio, setLastClickedRadio] = useState(null);

  useEffect(() => {
    setDays([...Array(31).keys()].map((i) => i + 1));
    const currentYear = new Date().getFullYear();
    setYears([...Array(currentYear - 1899).keys()].map((i) => currentYear - i));
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
  
    if (id === "mobile") {
      const cleanedValue = value.replace(/\D/g, ""); 
      const formattedValue = cleanedValue
        .replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3") 
        .substr(0, 12); 
      setFormData((prev) => ({ ...prev, mobile: formattedValue }));
    } else if (["firstName", "middleName", "lastName"].includes(id)) {
      const formattedValue = value.replace(/[^a-zA-Z\s]/g, ""); 
      const capitalizedValue = formattedValue
        .split(" ") 
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
        .join(" ");
      setFormData((prev) => ({ ...prev, [id]: capitalizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };
  
  
  
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setLastClickedRadio(lastClickedRadio === value ? null : value);
    setFormData({
      ...formData,
      gender: lastClickedRadio === value ? "" : value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        hobbies: prev.hobbies.filter((hobby) => hobby !== value),
      }));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        hobbies: ["reading", "traveling", "music", "cooking", "other"],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        hobbies: [],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "birthMonth",
      "birthDay",
      "birthYear",
      "gender",
      "streetAddress",
      "city",
      "state",
      "postalCode",
      "email",
      "mobile",
      "course",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    localStorage.setItem("formData", JSON.stringify(formData));
    alert("Form data saved successfully!");
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <h3>Personal Information</h3>
        <div className="row">
        <div className="form-group">
  <label htmlFor="firstName">First Name</label>
  <input
    type="text"
    id="firstName"
    placeholder="Enter first name"
    value={formData.firstName}
    onChange={handleInputChange}
  />
</div>

<div className="form-group">
  <label htmlFor="middleName">Middle Name</label>
  <input
    type="text"
    id="middleName"
    placeholder="Enter middle name"
    value={formData.middleName}
    onChange={handleInputChange}
  />
</div>

<div className="form-group">
  <label htmlFor="lastName">Last Name</label>
  <input
    type="text"
    id="lastName"
    placeholder="Enter last name"
    value={formData.lastName}
    onChange={handleInputChange}
  />
</div>

        </div>
        <br />

        <h3>Birth Date</h3>
        <div className="row">
          <div className="form-group">
            <label htmlFor="birthMonth">Month</label>
            <select
              id="birthMonth"
              value={formData.birthMonth}
              onChange={handleInputChange}
              required
            >
              <option value="">Please Select</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="birthDay">Day</label>
            <select
              id="birthDay"
              value={formData.birthDay}
              onChange={handleInputChange}
              required
            >
              <option value="">Please Select</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="birthYear">Year</label>
            <select
              id="birthYear"
              value={formData.birthYear}
              onChange={handleInputChange}
              required
            >
              <option value="">Please Select</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />

        <h3>Gender</h3>
        <div className="form-group">
          <div className=" homosapiens">
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={formData.gender === "male"}
                onChange={handleRadioChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={formData.gender === "female"}
                onChange={handleRadioChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="other"
                name="gender"
                checked={formData.gender === "other"}
                onChange={handleRadioChange}
              />
              Other
            </label>
          </div>
        </div>
        <h3>Address</h3>
        <div className="form-group">
          <label htmlFor="streetAddress">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            placeholder="Enter street address"
            value={formData.streetAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress2">Street Address Line 2</label>
          <input
            type="text"
            id="streetAddress2"
            placeholder="Enter street address line 2"
            value={formData.streetAddress2}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State / Province</label>
            <input
              type="text"
              id="state"
              placeholder="Enter state/province"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="postalCode">Postal / Zip Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal/zip code"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <h3>Contact Information</h3>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group ">
          <label htmlFor="mobile">Mobile Number</label>
          <div className="mobile-number-container">
            <select
              id="country-code"
              value={formData.countryCode}
              onChange={handleInputChange}
            >
              <option value="+91">+91 (India)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+61">+61 (Australia)</option>
            </select>

            <input
              type="tel"
              id="mobile"
              placeholder="000-000-0000"
              maxLength="12"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              inputMode="numeric"
            />
          </div>
        </div>

        <h3>Additional Information</h3>
        <div className="row">
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="course">Courses Interested In</label>
            <select
              id="course"
              value={formData.course}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  course: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              multiple
              required
            >
              <option value="react">React</option>
              <option value="javascript">JavaScript</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="nodejs">Node.js</option>
            </select>
          </div>
        </div>
        <br />

        <div className="form-group">
          <label>Hobbies</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="reading"
                checked={formData.hobbies.includes("reading")}
                onChange={handleCheckboxChange}
              />
              Reading
            </label>
            <label>
              <input
                type="checkbox"
                value="traveling"
                checked={formData.hobbies.includes("traveling")}
                onChange={handleCheckboxChange}
              />
              Traveling
            </label>
            <label>
              <input
                type="checkbox"
                value="music"
                checked={formData.hobbies.includes("music")}
                onChange={handleCheckboxChange}
              />
              Music
            </label>
            <label>
              <input
                type="checkbox"
                value="cooking"
                checked={formData.hobbies.includes("cooking")}
                onChange={handleCheckboxChange}
              />
              Cooking
            </label>
            <label>
              <input
                type="checkbox"
                value="other"
                checked={formData.hobbies.includes("other")}
                onChange={handleCheckboxChange}
              />
              Other
            </label>
            <label>
              <input type="checkbox" onChange={handleSelectAll} />
              Select All
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            placeholder="Write your comments here..."
            value={formData.comments}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
